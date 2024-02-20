// components/EditEnigmaModal.jsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const EditEnigmaModal = ({ enigma, open, handleClose, handleSave }) => {
  const [editedEnigma, setEditedEnigma] = useState(enigma);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedEnigma({ ...editedEnigma, [name]: value });
  };

  const saveChanges = () => {
	// Call the handleSave function with the edited enigma as an argument

  };

  return (
    <Dialog open={open} onClose={handleClose}>
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
        {/* Include other fields such as description, hints, etc. */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
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
