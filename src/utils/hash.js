// Utilisez l'API SubtleCrypto pour les opérations de hashage
export const hashPassword = async (password) => {
	// Encodez le mot de passe en tant qu'Uint8Array
	const encoder = new TextEncoder();
	const data = encoder.encode(password);

	// Hash le mot de passe
	const hashBuffer = await crypto.subtle.digest('SHA-256', data);

	// Convertissez le résultat en chaîne hexadécimale
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

	return hashHex;
};
