import React from 'react';
import Link from 'next/link';
import { Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Adjust the getRandomImageUrl function to receive width and height parameters
const getRandomImageUrl = (seed, width, height) => `https://source.unsplash.com/${width}x${height}?sig=${seed}`;

const EnigmaListItem = ({ enigma, onDelete }) => {
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
            <Link href={`/admin/enigmas/${enigma.id}/edit`} passHref>
              <IconButton aria-label="edit" size="large" color="primary">
                <EditIcon fontSize="inherit" />
              </IconButton>
            </Link>
            <IconButton aria-label="delete" size="large" color="secondary" onClick={() => onDelete(enigma.id)}>
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnigmaListItem;
