import express from 'express';
import { Entry } from '../models/entry.model.js';

const router = express.Router();

router.get("/filter/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      startDate,
      endDate,
      mood,
      favorite,
      tagId,
      deleted,
      page = 1,
      limit = 9,
    } = req.query;
    const filter = { user_id: userId };
    if (startDate) {
      filter.date = { $gte: new Date(startDate) };
    }
    if (endDate) {
      filter.date = { ...filter.date, $lt: new Date(endDate) };
    }
    if (mood) {
      filter.mood = mood;
    }
    if (favorite) {
      filter.favorite = favorite === "true";
    }
    if (deleted) {
      filter.deleted = deleted === "true"; // include deleted if selected
    } else {
      filter.deleted = false; // else exclude deleted by default
    }
    if (tagId) {
      filter.tags = { $in: [tagId] };
    }
    
    const options = {
      skip: (page - 1) * limit,
      limit: parseInt(limit, 10),
      sort: { date: -1 },
    };
    const entries = await Entry
      .find(filter)
      .populate('tags')
      .setOptions(options)
      .exec();
    const totalEntries = await Entry.countDocuments(filter);
    res.json({
      entries,
      totalEntries,
      totalPages: Math.ceil(totalEntries / limit),
      currentPage: parseInt(page, 10),
    });
  } catch (err) {
    console.error("Error fetching filtered entries:", err);
    res.status(400).json({ error: "Failed to fetch filtered entries" });
  }
});

// Get an entry by entryId
// GET /entries/:entryId
router.get('/:entryId', async (req, res) => {
    try {
        const entry = await Entry
          .findById(req.params.entryId)
          .populate('tags')
          .exec();
        res.json(entry);
    } catch (err) {
        console.error(`Error fetching entry ${req.params.entryId}:`, err);
        res.status(400).json({ error: 'Failed to fetch entry' });
    }
});

// Create a new entry
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
        console.error(`Error deleting entry ${req.params.entryId}:`, err);
        res.status(400).json({ error: 'Failed to delete entry' });
    }
});

export default router;