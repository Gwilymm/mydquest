import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const EnigmaModal = ({ enigma, open, onClose }) => {
  const [showSpoiler, setShowSpoiler] = useState(false); // State to toggle spoiler visibility
  const [userAnswer, setUserAnswer] = useState(''); // State for the user's answer
  const [isCorrect, setIsCorrect] = useState(null); // State to store if the answer is correct
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSpoiler = () => {
    setShowSpoiler(!showSpoiler);
  };

  const handleAnswerChange = (event) => {
    setUserAnswer(event.target.value);
    setIsCorrect(null); // Reset correctness state when answer changes
  };

	const handleCloseModal = () => {
  		setIsModalOpen(false);
	};
  const verifyAnswer = async () => {
	try {
	  // Préparation du corps de la requête
	  const requestBody = {
	    enigmaId: enigma.id, // Assurez-vous que enigma contient un champ 'id'
	    userAnswer: userAnswer,
	  };
   
	  // Envoyer la réponse de l'utilisateur à l'API pour vérification via une méthode POST
	  const response = await fetch('/api/enigmas/user-answer-verification', {
	    method: 'POST', // Utiliser POST pour envoyer des données dans le corps de la requête
	    headers: {
		 'Content-Type': 'application/json',
		 // Ajoutez ici d'autres en-têtes si nécessaire, par exemple des tokens d'authentification
	    },
	    body: JSON.stringify(requestBody),
	  });
   
	  if (!response.ok) {
	    throw new Error('Network response was not ok');
	  }
   
	  const result = await response.json();
   
	  // Utiliser le résultat de l'API pour définir si la réponse est correcte
	  setIsCorrect(result.message === "Correct answer!");
	} catch (error) {
	  console.error('Error verifying answer:', error);
	  setIsCorrect(false); // Optionnel, considérer comme incorrect en cas d'erreur
	}
   };
   
   

  return (
	<Dialog open={open} onClose={onClose}>
	  <DialogTitle>Enigma Details</DialogTitle>
	  <DialogContent>
	    <div>
		 <strong>Title:</strong> {enigma.title}
	    </div>
	    <div>
		 <strong>Description:</strong> {enigma.description}
	    </div>
	    <div>
		 <strong>Hints:</strong> {enigma.hints}
	    </div>
	    <TextField
		 margin="dense"
		 label="Your Answer"
		 type="text"
		 fullWidth
		 variant="outlined"
		 value={userAnswer}
		 onChange={handleAnswerChange}
		 helperText={isCorrect === false ? "Incorrect answer, try again!" : ""}
		 error={isCorrect === false}
	    />
	  </DialogContent>
	  <DialogActions>
	    <Button onClick={verifyAnswer} color="primary">
		 Verify Answer
	    </Button>
	    <Button onClick={handleCloseModal} color="primary">
		 Close
	    </Button>
	  </DialogActions>
	  {isCorrect && (
	    <DialogContent>
		 <div style={{ color: 'green' }}>Congratulations! Your answer is correct.</div>
	    </DialogContent>
	  )}
	</Dialog>
   );
 };
 
 export default EnigmaModal;