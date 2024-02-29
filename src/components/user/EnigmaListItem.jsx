import React, { useState } from 'react';
import { Typography, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockIcon from '@mui/icons-material/Lock'; // Icône pour les énigmes verrouillées
import EnigmaModal from '@/components/user/EnigmaModal'; // Assurez-vous que le chemin d'import est correct
import axios from 'axios';
import db from '@/utils/db'; // Vérifiez le chemin d'accès à votre base de données
import handle from '@/pages/api/enigmas';

// Fonction pour obtenir une URL d'image aléatoire de Unsplash
const getRandomImageUrl = (seed, width, height) => `https://source.unsplash.com/${width}x${height}?sig=${seed}`;

const EnigmaListItem = ({ enigma, onDelete, isAccessible }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false); // Pour l'animation de secousse

  const handleOpenModal = () => {
    if (isAccessible) {
      setIsModalOpen(true);
    } else {
      // Fait gigoter l'élément si l'énigme est verrouillée
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 820); // Réinitialise l'état après l'animation
    }
  };
  const handleCloseModal = () => setIsModalOpen(false);


  return (
    <div
      className={`my-4 transition-transform duration-200 hover:scale-105 ${isShaking ? 'animate-shake' : ''}`}
      onClick={!isAccessible ? handleOpenModal : undefined}
    >
      <div className={`overflow-hidden rounded-lg shadow-lg relative ${!isAccessible ? 'opacity-50' : ''}`}>
        {!isAccessible && (
          <div className="absolute inset-0 bg-black opacity-50 z-10 flex justify-center items-center">
            <Typography variant="h6" className="text-white font-bold line-through">
              Verrouillée
            </Typography>
          </div>
        )}
        <img
          className="w-full h-32 sm:h-48 object-cover"
          src={getRandomImageUrl(enigma.id, 400, 300)}
          alt={enigma.title}
        />
        <div className="p-4 bg-white">
          <Typography variant="h5" className="mb-2 text-xl font-bold tracking-tight text-gray-900">
            {enigma.title}
          </Typography>
          <div className="flex justify-end space-x-2">
            {isAccessible ? (
              <Tooltip title="Voir l'énigme">
                <IconButton onClick={handleOpenModal}>
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Énigme verrouillée">
                <IconButton disabled>
                  <LockIcon />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
      <EnigmaModal
        enigma={enigma}
        open={isModalOpen}
        onClose={handleCloseModal}
       
      />
    </div>
  );
};

export default EnigmaListItem;
