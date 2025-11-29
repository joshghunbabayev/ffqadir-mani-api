import Invoice from "../models/invoice.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import path from "path";
import compressUntilUnderNMB from "../utils/compressUntilUnderNMB.js"; // sənin kompress funksiyan

async function getAllInvoices(req, res) {
    try {           "/ff-main/invoice?status=active"
        const status = req.query.status; // active, archived, deleted
        const invoices = await Invoice.getAll(status);
        res.status(200).json(invoices);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

async function createInvoice(req, res) {
    try {
        const { title, price, count, description, pubgId } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "Photo is required" });
        }

        // Compress the photo
        const compressedPath = path.join("tmp", `compressed-${req.file.filename}`);
        await compressUntilUnderNMB(req.file.path, compressedPath, 3);

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(compressedPath, {
            folder: "pubg",
            use_filename: true
        });

        // Convert to Base64
        const fileBuffer = await fs.readFile(compressedPath);
        const photoBase64 = fileBuffer.toString("base64");

        // Remove temp files
        await fs.unlink(req.file.path);
        await fs.unlink(compressedPath);

        // Insert into DB (paid and status default values are used)
        await Invoice.create({
            title,
            price,
            count,
            description,
            pubgId,
            photoUrl: result.secure_url,
            photoPublicId: result.public_id,
            photoBase64
        });

        res.status(201).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

async function paidInvoice(req, res) {
    try {
        await Invoice.update(req.params.id, {
            paid: 1,
            status: "archived"
        });
        res.status(200).json({});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

// DELETE softDeleteArchivedInvoices
async function softDeleteArchivedInvoices(req, res) {
    try {
        // Yalnız archived statuslu invoice-ları gətir
        const invoices = await Invoice.getAll("archived");
        for (const invoice of invoices) {
            if (invoice.photoPublicId) {
                await cloudinary.uploader.destroy(invoice.photoPublicId);
            }
            // Soft delete
            await Invoice.update(invoice.id, { status: "deleted" });
        }
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

async function hardDeleteAllDeletedInvoices(req, res) {
    try {
        const invoices = await Invoice.getAll("deleted");
        for (const invoice of invoices) {
            await Invoice.delete(invoice.id);
        }
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

export {
    getAllInvoices,
    createInvoice,
    paidInvoice,
    softDeleteArchivedInvoices,
    hardDeleteAllDeletedInvoices
};
