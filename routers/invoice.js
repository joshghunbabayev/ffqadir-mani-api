import express from "express";
import Photo from "../utils/photo.js";
import {
    getAllInvoices,
    createInvoice,
    paidInvoice,
    softDeleteArchivedInvoices,
    hardDeleteAllDeletedInvoices
} from "../controllers/invoice.js";

const router = express.Router();

router.get("/", getAllInvoices);
router.post("/new", Photo.single("photo"), createInvoice);
router.put("/one/:id/pay", paidInvoice);
router.delete("/all/soft", softDeleteArchivedInvoices);
router.delete("/all/hard", hardDeleteAllDeletedInvoices);

export default router;