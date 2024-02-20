// components/EnigmaDelete.jsx
import React from 'react';

const EnigmaDelete = ({ onDelete }) => {
  return (
    <div className="max-w-lg mx-auto">
      <p className="text-gray-700 mb-4">Are you sure you want to delete this enigma?</p>
      <button onClick={onDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
    </div>
  );
};

export default EnigmaDelete;
