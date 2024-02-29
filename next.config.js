const withPWA = require("@ducanh2912/next-pwa").default({
	dest: "public",
	cacheOnFrontEndNav: true,
	aggressiveFrontEndNavCaching: true,
	reloadOnOnline: true,
	swcMinify: true,
	workboxOptions: {
		disableDevLogs: true,
	},

	secret: 'your-long-randomly-generated-secret-string-here',
});

const nextConfig = {
	// Vos autres options de configuration Next.js ici
};

module.exports = withPWA(nextConfig);
