const withPWA = require("@ducanh2912/next-pwa").default({
	dest: "public",

	secret: 'your-long-randomly-generated-secret-string-here',
});

const nextConfig = {

	// Vos autres options de configuration Next.js ici
};

module.exports = withPWA(nextConfig);
