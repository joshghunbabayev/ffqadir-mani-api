import Pubg from "../models/pubg.js";
import Tiktok from "../models/tiktok.js";
import Fan from "../models/fan.js";

// ---------------- PUBG ----------------
async function getPubgData(req, res) {
    try {
        const data = await Pubg.getAll();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function createPubgData(req, res) {
    try {
        await Pubg.create(req.body);
        res.status(201).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deletePubgData(req, res) {
    try {
        await Pubg.delete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(404).send();
    }
}

// ---------------- TIKTOK ----------------
async function getTiktokData(req, res) {
    try {
        const data = await Tiktok.getAll();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function createTiktokData(req, res) {
    try {
        await Tiktok.create(req.body);
        res.status(201).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteTiktokData(req, res) {
    try {
        await Tiktok.delete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(404).send();
    }
}

// ---------------- FAN ----------------
async function getFanData(req, res) {
    try {
        const data = await Fan.getAll();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function createFanData(req, res) {
    try {
        await Fan.create(req.body);
        res.status(201).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteFanData(req, res) {
    try {
        await Fan.delete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(404).send();
    }
}

export {
    getPubgData,
    createPubgData,
    deletePubgData,
    getTiktokData,
    createTiktokData,
    deleteTiktokData,
    getFanData,
    createFanData,
    deleteFanData,
};
