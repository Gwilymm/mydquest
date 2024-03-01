import Dexie from 'dexie';

// Créez une nouvelle base de données Dexie
const db = new Dexie('EnigmaDatabase');

// Définissez le schéma de la base de données
db.version(3).stores({
	enigmas: '++id, title, description, hints, solution, qrCode',
	offlineUser: '++id, &email, offlinePassword, isLoggedIn'
});

// Fonction simplifiée pour hasher le mot de passe
const hashPassword = async (password) => {
	const encoder = new TextEncoder();
	const data = encoder.encode(password);
	const hashBuffer = await crypto.subtle.digest('SHA-256', data);
	return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
};

// Fonctions pour les énigmes
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

// Fonctions pour les utilisateurs

export const addUser = async (user) => {
	if (user.password) { // Si un mot de passe est fourni, hash et stock comme offlinePassword
		user.offlinePassword = await hashPassword(user.password);
		delete user.password; // Supprime le champ de mot de passe en clair
	}
	return await db.offlineUser.add(user);
};

export const getUser = async (email) => {
	return await db.offlineUser.where(email).equals(email);
};

export const updateUserLoginStatus = async (email, isLoggedIn) => {
	const user = await getUser(email);
	if (user) {
		return await db.offlineUser.update(user.id, { isLoggedIn });
	} else {
		console.error("Utilisateur non trouvé pour mise à jour du statut de connexion.");
	}
};

export const setOfflinePassword = async (username, password) => {
	const hashedPassword = await hashPassword(password);
	const user = await getUser(username);
	if (user) {
		return await db.offlineUser.update(user.id, { offlinePassword: hashedPassword });
	}
};

export const verifyOfflinePassword = async (email, password) => {
	const user = await getUser(email);
	if (!user) return false;

	const hashedPassword = await hashPassword(password);
	return user.offlinePassword === hashedPassword;
};

// Ajouté dans votre fichier db.js ou un fichier similaire

export const enregistrerEmailDansDB = async (email) => {
	const user = await getUser(email);
	console.log('user', user);
	if (user) {
		let id = user.id;
		console.log('id', id); // Add this line
		// L'utilisateur existe déjà, mise à jour de l'utilisateur si nécessaire
		if (id) { // And this line
			await db.offlineUser.update(id, { email: email });
		} else {
			console.error('Invalid id:', id); // And this line
		}
	} else {
		console.log(email);
		// Nouvel utilisateur, ajout dans la base de données
		await db.offlineUser.add({ "email": email });
	}
};

export const addUserWithOfflinePassword = async (email, password) => {
	const hashedPassword = await hashPassword(password);
	let user = await getUser(email);
	if (user) {
		// Si l'utilisateur existe déjà, mettez à jour son mot de passe hors ligne
		await db.offlineUser.update(user.id, { offlinePassword: hashedPassword });
	} else {
		// Sinon, créez un nouvel utilisateur avec le mot de passe hors ligne
		await db.offlineUser.add({ email, offlinePassword: hashedPassword, isLoggedIn: false });
	}
};


export default db;
