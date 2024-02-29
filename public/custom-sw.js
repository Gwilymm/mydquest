self.addEventListener('install', (event) => {
	// Pré-caching des ressources statiques
	event.waitUntil(
		caches.open('static-v1').then((cache) => cache.addAll([
			// Ajoutez d'autres ressources statiques ici
			'/src/app/tools',
			'/src/app/user',
		]))
	);
});

self.addEventListener('fetch', (event) => {
	// Exemple de stratégie de cache d'abord pour les ressources statiques
	if (event.request.url.includes('/static/')) {
		event.respondWith(
			caches.match(event.request).then((response) => {
				return response || fetch(event.request);
			})
		);
	}

	// Stratégie réseau d'abord pour les réponses d'API
	if (event.request.url.includes('/api/')) {
		event.respondWith(
			fetch(event.request).catch(() => {
				return caches.match(event.request);
			})
		);
	}
});
