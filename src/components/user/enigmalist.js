// Importez React et les hooks nécessaires
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EnigmaListItem from '@/components/user/EnigmaListItem'; // Ajustez le chemin d'importation selon votre structure

const EnigmaList = () => {
	const [ enigmas, setEnigmas ] = useState([]);

	useEffect(() => {
		const fetchUserEnigmas = async () => {
			try {
				const { data } = await axios.get(`/api/enigmas/user-enigmas`);
				// Supposons que `data` est un tableau d'énigmes avec une propriété `isSolved` pour chaque énigme
				setEnigmas(data);
			} catch (error) {
				console.error('Failed to fetch user enigmas:', error);
			}
		};

		fetchUserEnigmas();
	}, []);


	return (
		<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{enigmas.map((enigma, index) => (
				<EnigmaListItem
					key={enigma.id}
					enigma={enigma}

					// Passer `isAccessible` comme prop à EnigmaListItem
					isAccessible={index === 0 || enigmas[ index - 1 ].isSolved}
				/>
			))}
		</div>
	);
};

export default EnigmaList;
