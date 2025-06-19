import express from 'express';
import { Entry } from '../models/entry.model.js';

const router = express.Router();

// Get an entry by entryId
// GET /entries/entryId
router.get('/:entryId', async (req, res) => {
    try {
        const entry = await Entry.findById(req.params.entryId)
        res.json(entry);
    } catch (err) {
        console.error(`Error fetching entry ${entryId}:`, err);
        res.status(400).json({ error: 'Failed to fetch entry' });
    }
});

// Get all entries
// GET /entries
router.get('/', async (req, res) => {
    try {
        const entries = await Entry.find();
        res.json(entries);
    } catch (err) {
        console.error("Error fetching all entries:", err);
        res.status(400).json({ error: 'Failed to fetch all entries' });
    }
});

// Add a new entry
// POST /entries
router.post('/', async (req, res) => {
    try {
        const newEntry = new Entry(req.body);
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (err) {
        console.error("Error adding entry:", err);
        res.status(400).json({ error: 'Failed to add entry' });
    }
});

// Edit an existing entry by ID
// PUT /entries/:entryId
router.put('/:entryId', async (req, res) => {
    try {
        const updatedEntry = await Entry.findByIdAndUpdate(
            req.params.entryId,
            req.body,
            { new: true }
        );

        if (!updatedEntry) {
            return res.status(404).json({ error: 'Entry not found' });
        }

        res.json(updatedEntry);
    } catch (err) {
        console.error("Error updating entry:", err);
        res.status(400).json({ error: 'Failed to update entry' });
    }
});

// Delete an entry by ID
// DELETE /entries/:entryId
router.delete('/:entryId', async (req, res) => {
    try {
        const entry = await Entry.findByIdAndDelete(req.params.entryId);
        res.json(entry);
    } catch (err) {
        console.error(`Error deleting entry ${entry._id}:`, err);
        res.status(400).json({ error: 'Failed to update entry' });
    }
});

export default router;