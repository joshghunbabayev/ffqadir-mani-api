import Wolt from "../models/wolt.js";
import Cafe from "../models/cafe.js";

// ---------------- Wolt ----------------
async function getWoltData(req, res) {
    try {
        const data = await Wolt.getAll();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function createWoltData(req, res) {
    try {
        await Wolt.create(req.body);
        res.status(201).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteWoltData(req, res) {
    try {
        await Wolt.delete(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        res.status(404).send();
    }
}

// ---------------- Cafe ----------------
async function getCafeData(req, res) {
    try {
        const data = await Cafe.getAll();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function createCafeData(req, res) {
    try {
        await Cafe.create(req.body);
        res.status(201).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteCafeData(req, res) {
    try {
        await Cafe.delete(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        res.status(404).send();
    }
}

export {
    getWoltData,
    createWoltData,
    deleteWoltData,
    getCafeData,
    createCafeData,
    deleteCafeData
};
