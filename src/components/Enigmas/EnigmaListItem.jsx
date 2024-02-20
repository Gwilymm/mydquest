import React, { useState } from 'react';
import { Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditEnigmaModal from './EditEnigmaModal';
import db from './db'


// Adjust the getRandomImageUrl function to receive width and height parameters
const getRandomImageUrl = (seed, width, height) => `https://source.unsplash.com/${width}x${height}?sig=${seed}`;

const EnigmaListItem = ({ enigma, onDelete }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);
	const handleSaveEnigma = async (updatedEnigma) => {
		if (navigator.onLine) {
		  try {
		    // Attempt to save to backend
		    await axios.put(`/api/enigmas/${updatedEnigma.id}`, updatedEnigma);
		    console.log('Enigma updated in backend:', updatedEnigma);
		  } catch (error) {
		    console.error('Failed to update enigma in backend:', error);
		    // Optionally, save to IndexedDB if backend update fails
		  }
		} else {
		  // Save to IndexedDB for offline
		  try {
		    await db.enigmas.put(updatedEnigma);
		    console.log('Enigma saved locally:', updatedEnigma);
		  } catch (error) {
		    console.error('Failed to save enigma locally:', error);
		  }
		}
		handleCloseModal();
	};
	
  return (
    // Use Tailwind CSS for styling and animations
    <div className="my-4 transition-transform duration-200 hover:scale-105">
      <div className="overflow-hidden rounded-lg shadow-lg">
        <img
          className="w-full h-32 sm:h-48 object-cover" // Tailwind classes to control the size and cover behavior of the image
          src={getRandomImageUrl(enigma.id, 400, 300)} // Adjust dimensions as needed
          alt={enigma.title}
        />
        <div className="p-4 bg-white">
          <Typography variant="h5" className="mb-2 text-xl font-bold tracking-tight text-gray-900">
            {enigma.title}
          </Typography>
          <div className="flex justify-end space-x-2">
		  <IconButton aria-label="edit" size="large" color="primary" onClick={handleOpenModal}>
        		<EditIcon fontSize="inherit" />
      	  </IconButton>
            <IconButton aria-label="delete" size="large" color="secondary" onClick={() => onDelete(enigma.id)}>
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
      </div>
	 <EditEnigmaModal
        enigma={enigma}
        open={isModalOpen}
        handleCloseModal={handleCloseModal}
        onSave={handleSaveEnigma}
      />
    </div>
  );
};

export default EnigmaListItem;
