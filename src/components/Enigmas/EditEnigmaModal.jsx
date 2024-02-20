import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import axios from 'axios';
import handle from '@/pages/api/enigmas';

const EditEnigmaModal = ({ enigma, open, handleCloseModal }) => {
  const [editedEnigma, setEditedEnigma] = useState(enigma);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedEnigma({ ...editedEnigma, [name]: value });
  };
  
  const saveChanges = async () => {
    setLoading(true);
    try {
      await axios.put('/api/enigmas/save', editedEnigma);
      handleCloseModal(); // Close the modal after successful update
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseModal}>
      <DialogTitle>Edit Enigma</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="title"
          label="Title"
          type="text"
          fullWidth
          variant="outlined"
          value={editedEnigma.title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="outlined"
          value={editedEnigma.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="hints"
          label="Hints"
          type="text"
          fullWidth
          variant="outlined"
          value={editedEnigma.hints}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="solution"
          label="Solution"
          type="text"
          fullWidth
          variant="outlined"
          value={editedEnigma.solution}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="qrCode"
          label="QR Code"
          type="text"
          fullWidth
          variant="outlined"
          value={editedEnigma.qrCode}
          onChange={handleChange}
        />
	   
        {/* Include other fields such as description, hints, etc. */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={saveChanges} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEnigmaModal;
