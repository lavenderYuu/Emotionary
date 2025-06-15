import express from 'express';
import { Entry } from '../models/entry.model.js';

const router = express.Router();

router.get('/', async (req, res) => { // test to get all
    try {
        const entries = await Entry.find();
        res.json(entries);
    } catch (err) {
        console.error("Error fetching all entries:", err);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;