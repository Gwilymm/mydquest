import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EnigmaListItem from './EnigmaListItem'; // Adjust the import path as necessary

const EnigmaList = () => {
  const [enigmas, setEnigmas] = useState([]);

  useEffect(() => {
    const fetchEnigmas = async () => {
      try {
        const { data } = await axios.get('/api/enigmas');
        setEnigmas(data);
      } catch (error) {
        console.error('Failed to fetch enigmas:', error);
        // Optionally, handle the error in the UI
      }
    };

    fetchEnigmas();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/enigmas/${id}`);
      setEnigmas(enigmas.filter(enigma => enigma.id !== id)); // Update state to reflect deletion
    } catch (error) {
      console.error('Failed to delete enigma:', error);
      // Optionally, handle the error in the UI
    }
  };

  return (
    // Adjusted class for responsive multi-column layout
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {enigmas.map(enigma => (
        <EnigmaListItem key={enigma.id} enigma={enigma} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default EnigmaList;
