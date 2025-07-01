import express, { request } from 'express';
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

// Create a new tag for a specific user
// POST /tags
router.post('/', async (request, response) => {
  try {
    const { name, user_id, colour } = request.body;
    
    if (!name || !user_id || !colour) {
      return response.status(404).json({ message: 'Missing required field(s) for tag creation'});
    }

    const newTag = new Tag({ name, user_id, colour });
    await newTag.save();
    response.status(201).json(newTag);
  } catch (error) {
    console.error('Error creating tag for the given user: ', error);
    response.status(500).json({ message: error });
  }
});

// Modify an existing tag
// PUT /tags/:tagId
router.put('/:tagId', async (req, res) => {
  try {
    const updatedTag = await Tag.findByIdAndUpdate(
      req.params.tagId,
      req.body,
      { new: true}
    );

    if (!updatedTag) {
      return res.status(404).json({error: 'tag not found'});
    }

    res.json(updatedTag);
  } catch (error) {
    console.error('error updating tag: ', error);
    res.status(500).json({message: error});
  }
});

// Delete a tag by ID
// DELETE /tags/:tagId
router.delete('/:tagId', async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.tagId);
    res.json(tag);
  } catch (error) {
    console.error('error deleting tag: ', error);
    res.status(500).json({message: error});
  }
});

export default router;