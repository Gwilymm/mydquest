import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const EnigmaModal = ({ enigma, open, onClose }) => {
	const [session, setSession] = useState(null); 
  const [showSpoiler, setShowSpoiler] = useState(false); // Pour afficher ou non le spoiler
  const [userAnswer, setUserAnswer] = useState(''); // La réponse de l'utilisateur
  const [isCorrect, setIsCorrect] = useState(null); // Pour stocker si la réponse est correcte
  
  useEffect(() => {
	// Récupérer les données de session dès le chargement du composant
	fetch('/api/session')
	  .then(res => res.json())
	  .then(data => {
	    setSession(data.session);
	  })
	  .catch(error => {
	    console.error("Failed to fetch session:", error);
	  });
   }, []);

  const toggleSpoiler = () => {
    setShowSpoiler(!showSpoiler);
  };

  const handleAnswerChange = (event) => {
    setUserAnswer(event.target.value);
    setIsCorrect(null); // Réinitialise l'état de la correction lorsque la réponse change
  };

  const verifyAnswer = async () => {
	if (!session) {
	  console.error("No session found, user must be logged in to verify an answer.");
	  return;
	}
 
	try {
	  const requestBody = {
	    enigmaId: enigma.id,
	    userAnswer: userAnswer,
	    userEmail: session.user.email // Utiliser l'ID de l'utilisateur depuis la session
	  };
	  
	  const response = await fetch('/api/enigmas/user-answer-verification', {
	    method: 'POST',
	    headers: {
		 'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(requestBody),
	  });
 
	  if (!response.ok) {
	    throw new Error('Network response was not ok');
	  }
 
	  const result = await response.json();
	  setIsCorrect(result.message === "Correct answer!");
	} catch (error) {
	  console.error('Error verifying answer:', error);
	  setIsCorrect(false);
	}
   };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enigma Details</DialogTitle>
      <DialogContent>
        <div><strong>Title:</strong> {enigma.title}</div>
        <div><strong>Description:</strong> {enigma.description}</div>
        <div><strong>Hints:</strong> {enigma.hints}</div>
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
        <Button onClick={verifyAnswer} color="primary">Verify Answer</Button>
        <Button onClick={onClose} color="primary">Close</Button> {/* Utilise onClose pour fermer le modal */}
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
