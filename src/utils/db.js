// db.js
const DB_NAME = 'myDatabase';
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
const STORE_NAME = 'myObjectStore';

let db;

async function openDb() {
	console.log("openDb ...");
	const request = indexedDB.open(DB_NAME, DB_VERSION);

	request.onupgradeneeded = (e) => {
		db = e.target.result;
		console.log("creating store");
		if (!db.objectStoreNames.contains(STORE_NAME)) {
			db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
		}
	};

	request.onsuccess = (e) => {
		db = e.target.result;
		console.log("openDb DONE");
	};

	request.onerror = (e) => {
		console.error("openDb:", e.target.errorCode);
	};
}

async function addObject(storeName, object) {
	console.log("addObject:", object);
	const tx = db.transaction(storeName, 'readwrite');
	const store = tx.objectStore(storeName);
	const request = store.add(object);

	request.onsuccess = (e) => {
		console.log('Object added:', e.target.result);
	};

	request.onerror = (e) => {
		console.error('addObject error', e.target.errorCode);
	};
}

// Ensure to call this method when your application starts
openDb();

export { addObject };
