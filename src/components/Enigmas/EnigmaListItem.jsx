import React, { useState } from 'react';
import { Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditEnigmaModal from './EditEnigmaModal'; // Import the modal component


// Adjust the getRandomImageUrl function to receive width and height parameters
const getRandomImageUrl = (seed, width, height) => `https://source.unsplash.com/${width}x${height}?sig=${seed}`;

const EnigmaListItem = ({ enigma, onDelete }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);
	const handleSaveEnigma = (updatedEnigma) => {
	  // TODO: Implement the save logic, such as making an API request
	  console.log('Enigma updated:', updatedEnigma);
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
        onClose={handleCloseModal}
        onSave={handleSaveEnigma}
      />
    </div>
  );
};

export default EnigmaListItem;
