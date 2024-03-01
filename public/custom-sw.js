const CACHE_NAME = 'v1';
const urlsToCache = [
	'/',
	'/index.html',
	'/styles/main.css',
	'/script/main.js',
	// Ajoutez d'autres ressources et routes nécessaires
];

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache => {
				console.log('Opened cache');
				return cache.addAll(urlsToCache);
			})
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request)
			.then(response => {
				// La ressource est en cache
				if (response) {
					return response;
				}
				// Si la ressource n'est pas en cache, faites une requête réseau
				return fetch(event.request).then(response => {
					// Vérifiez si nous avons reçu une réponse valide
					if (!response || response.status !== 200 || response.type !== 'basic') {
						return response;
					}

					// IMPORTANT: Clone la réponse. Une réponse est un flux et
					// parce qu'on veut que le navigateur consomme la réponse,
					// ainsi que le cache consommant la réponse, nous devons
					// cloner la réponse.
					var responseToCache = response.clone();

					caches.open(CACHE_NAME)
						.then(cache => {
							cache.put(event.request, responseToCache);
						});

					return response;
				});
			})
	);
});
