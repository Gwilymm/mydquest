const withPWA = require("@ducanh2912/next-pwa").default;

const nextConfig = {
	// Vos autres options de configuration Next.js ici
};

module.exports = withPWA({
	...nextConfig,
	pwa: {
		dest: "public",
		cacheOnFrontEndNav: true,
		aggressiveFrontEndNavCaching: true,
		reloadOnOnline: true,
		swcMinify: true,
		workboxOptions: {
			disableDevLogs: true,
		},

		// Autres options PWA que vous souhaitez configurer
	},
	secret: 'your-long-randomly-generated-secret-string-here',
});
