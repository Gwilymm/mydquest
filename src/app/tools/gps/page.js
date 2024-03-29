/**
 * La fonction `GeolocationPage` récupère la géolocalisation de l'utilisateur et l'affiche sur une
 * carte Leaflet avec une icône personnalisée.
 * @returns Le composant GeolocationPage est renvoyé. Ce composant affiche une carte avec le marqueur
 * de localisation actuel de l'utilisateur à l'aide des bibliothèques Leaflet et React Leaflet. Il
 * comprend également des fonctionnalités permettant de gérer la récupération de géolocalisation, la
 * gestion des erreurs et le chargement dynamique des composants Leaflet.
 * 
 * Generated on 02/29/2024 Gwilymm
 */
"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Dynamically import Leaflet components with SSR disabled
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

export default function GeolocationPage() {
	const [ location, setLocation ] = useState({
		latitude: null,
		longitude: null,
		altitude: null,
	});
	const [ error, setError ] = useState(null);
	const [ customIcon, setCustomIcon ] = useState(null);

	useEffect(() => {
		if (!navigator.geolocation) {
			setError('Geolocation is not supported by your browser');
			return;
		}

		navigator.geolocation.getCurrentPosition((position) => {
			setLocation({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
		}, () => {
			setError('Unable to retrieve your location');
		});

		// Dynamically import Leaflet to use the Icon
		import('leaflet').then(L => {
			const icon = new L.Icon({
				iconUrl: '/assets/image/logo/mydquest_new_logo_72x72.png',
				iconSize: [ 25, 25 ],
				iconAnchor: [ 12, 41 ],
				popupAnchor: [ 1, -34 ],
			});
			setCustomIcon(icon);
		});
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
			<h1 className="text-xl font-semibold">My Geolocation</h1>
			{error ? (
				<p className="text-red-500">{error}</p>
			) : location.latitude && location.longitude && customIcon ? (
				<MapContainer center={[ location.latitude, location.longitude ]} zoom={13} style={{ height: '400px', width: '100%' }}>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					<Marker position={[ location.latitude, location.longitude ]} icon={customIcon}>
						<Popup>You are here! Altitude: {location.altitude ? `${location.altitude} meters` : 'Not Available'}</Popup>
					</Marker>
				</MapContainer>
			) : (
				<p>Fetching location...</p>
			)}
		</div>
	);
}
