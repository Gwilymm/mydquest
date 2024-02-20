// components/EnigmaDetail.jsx
import React from 'react';

const EnigmaDetail = ({ enigma }) => {
  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">{enigma.title}</h2>
      <p className="text-gray-700 mb-2">{enigma.description}</p>
      <p className="text-gray-700 mb-2">Hints: {enigma.hints}</p>
      <p className="text-gray-700 mb-2">Solution: {enigma.solution}</p>
    </div>
  );
};

export default EnigmaDetail;
