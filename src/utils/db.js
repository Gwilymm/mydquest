import Dexie from 'dexie';

// Create a new Dexie database
const db = new Dexie('EnigmaDatabase');

// Define the database schema
db.version(1).stores({
	enigmas: '++id, title, description, hints, solution, qrCode',
});

export default db;

export const addEnigma = async (enigma) => {
	return await db.enigmas.add(enigma);
};

export const getAllEnigmas = async () => {
	return await db.enigmas.toArray();
};

export const updateEnigma = async (id, enigma) => {
	return await db.enigmas.update(id, enigma);
};

export const deleteEnigma = async (id) => {
	return await db.enigmas.delete(id);
};

export const synchronizeEnigmas = async () => {
	if (navigator.onLine) {
		const enigmas = await getAllEnigmas();
		// Replace '/api/enigmas/sync' with your actual API endpoint
		await axios.post('/api/enigmas/sync', { enigmas });
	}
};
