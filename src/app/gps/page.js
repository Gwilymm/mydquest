"use client";
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export default function GeolocationPage() {
	const [ location, setLocation ] = useState({
		latitude: null,
		longitude: null,
		altitude: null,
	});
	const [ error, setError ] = useState(null);

	const customIcon = new L.Icon({
		iconUrl: '/assets/image/logo/mydquest_new_logo_72x72.png', // Make sure to provide the correct path to your marker image
		iconSize: [ 25, 25 ], // Size of the icon
		iconAnchor: [ 12, 41 ], // Point of the icon which will correspond to marker's location
		popupAnchor: [ 1, -34 ], // Point from which the popup should open relative to the iconAnchor
	});


	useEffect(() => {
		if (typeof window !== 'undefined') {
			// Your browser-specific code here
		}
		if (!navigator.geolocation) {
			setError('Geolocation is not supported by your browser');
			return;
		}

		navigator.geolocation.getCurrentPosition((position) => {
			setLocation({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				altitude: position.coords.altitude,
			});
		}, () => {
			setError('Unable to retrieve your location');
		});
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
			<h1 className="text-xl font-semibold">My Geolocation</h1>
			{location.altitude !== null && <><br />Altitude: {location.altitude} meters</>}
			{error ? (
				<p className="text-red-500">{error}</p>
			) : location.latitude && location.longitude ? (
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
