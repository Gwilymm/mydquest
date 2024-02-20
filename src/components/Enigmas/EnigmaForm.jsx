import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, Typography } from '@mui/material';

const CreateEnigma = ({ onCreate }) => {
  const [enigmaData, setEnigmaData] = useState({
    title: '',
    description: '',
    hints: '',
    solution: '',
  });

  const handleChange = (e) => {
    setEnigmaData({ ...enigmaData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(enigmaData);
    setEnigmaData({
      title: '',
      description: '',
      hints: '',
      solution: '',
    }); // Reset the form
  };

  return (
    <Card className="my-4">
      <CardContent>
        <Typography variant="h6">Create New Enigma</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={enigmaData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={enigmaData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
          <TextField
            label="Hints"
            name="hints"
            value={enigmaData.hints}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
          <TextField
            label="Solution"
            name="solution"
            value={enigmaData.solution}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" color="primary" variant="contained" className="mt-2">
            Create Enigma
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateEnigma;
