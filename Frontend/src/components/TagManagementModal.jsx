import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, IconButton, TextField, Box, Typography, Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { tagColours } from '../assets/data/tagColours';

// export const tagColours = [
//   "#e992d5", 
//   "#b8a7ff", 
//   "#7dda92", 
//   "#c8bff7", 
//   "#ffe599",
//   "#5eaeff", 
//   "#ffbde9", 
//   "#04c589", 
//   "#f2aa3e", 
//   "#d5a6bd"
// ];

const TagManagementModal = ({ open, onClose, userId, userTags = [], onTagUpdated }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [name, setName] = useState('');
  const [editingTagId, setEditingTagId] = useState(null);
  const [editedName, setEditedName] = useState('');

  console.log('userTags: ', userTags);

  const handleCreateTag = async () => {
    if (!name.trim()) return alert('Tag name is required');
    if (userTags.length >= 10) return alert('You can only have up to 10 tags.');

    const usedColors = userTags.map(tag => tag.colour);
    const availableColor = tagColours.find(color => !usedColors.includes(color));
    if (!availableColor) return alert('No more tag colors available.');

    try {
      const response = await fetch('http://localhost:3000/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, colour: availableColor, user_id: userId }),
      });

      if (!response.ok) throw new Error('Failed to create tag');
      setName('');
      setShowCreateForm(false);
      onTagUpdated?.();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteTag = async (tagId) => {
    if (!window.confirm('Are you sure you want to delete this tag?')) return;

    try {
      const response = await fetch(`http://localhost:3000/tags/${tagId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete tag');
      onTagUpdated?.();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditTag = async (tagId) => {
    if (!editedName.trim()) return;

    try {
      const response = await fetch(`http://localhost:3000/tags/${tagId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editedName }),
      });

      if (!response.ok) throw new Error('Failed to update tag');
      setEditingTagId(null);
      setEditedName('');
      onTagUpdated?.();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancelCreate = () => {
    setName('');
    setShowCreateForm(false);
  };

  return (
    <>
    <Dialog open={open} onClose={onClose} slotProps={{ paper: { sx: { borderRadius: 4, minWidth: 400, fontFamily: 'Outfit, sans-serif' }}}}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Manage Tags
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="body2" sx={{ fontFamily: 'Outfit, sans-serif' }}>
          You currently have {userTags.length}/10 tags.
        </Typography>

        {/* Existing tag list */}
        {userTags.map(tag => (
          <Box key={tag._id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip label={tag.colour} sx={{ bgcolor: tag.colour, color: 'black' }} />

            {editingTagId === tag._id ? (
              <>
                <TextField
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  size="small"
                  sx={{ flex: 1 }}
                />
                <IconButton onClick={() => handleEditTag(tag._id)}><CheckIcon /></IconButton>
              </>
            ) : (
              <>
                <Typography sx={{ flex: 1 }}>{tag.name}</Typography>
                <IconButton onClick={() => { setEditingTagId(tag._id); setEditedName(tag.name); }}>
                  <EditIcon />
                </IconButton>
              </>
            )}

            <IconButton onClick={() => handleDeleteTag(tag._id)}><DeleteIcon /></IconButton>
          </Box>
        ))}

        {/* Create tag flow */}
        {!showCreateForm ? (
          <Button
            variant="outlined"
            onClick={() => setShowCreateForm(true)}
            disabled={userTags.length >= 10}
            sx={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Create Tag
          </Button>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
              label="Tag Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={handleCreateTag} variant="contained">Save Tag</Button>
              <Button onClick={handleCancelCreate}>Cancel</Button>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default TagManagementModal;