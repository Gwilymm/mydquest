// pages/admin/enigmas/[id].jsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import EditEnigmaModal from '@/components/Enigmas/EditEnigmaModal'; // Adjust the import path as necessary

const EditEnigmaPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [enigma, setEnigma] = useState({}); // You would fetch the enigma data here based on the id
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = (editedEnigma) => {
    // Call API to save the changes
    console.log(editedEnigma);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Edit Enigma</h1>
      {/* Trigger button to open modal */}
      <button onClick={handleOpenModal}>Edit Enigma</button>

      <EditEnigmaModal
        enigma={enigma}
        open={isModalOpen}
        handleClose={handleCloseModal}
        handleSave={handleSaveChanges}
      />
    </div>
  );
};

export default EditEnigmaPage;
