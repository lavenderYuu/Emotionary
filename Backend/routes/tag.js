import express from 'express';
import { Tag } from '../models/tag.model.js';

const router = express.Router();

// Get all tags
// GET /tags
router.get('/', async (request, response) => {
  try {
    const tags = await Tag.find();
    response.json(tags);
  } catch (error) {
    console.error('Error fetching all tags:', error);
    response.status(500).json({ message: 'Internal server error' });
  }
});

// Get all tags for a specific user
// GET /tags/:userId
router.get('/:userId', async (request, response) => {
  try {
    const tags = await Tag.find({ user_id: request.params.userId });

    if (!tags) {
      return response.status(404).json({ message: 'Tags not found for the given user' });
    }

    response.json(tags);
  } catch (error) {
    console.error('Error fetching tags for the given user:', error);
    response.status(500).json({ message: 'Internal server error' });
  }
});

export default router;