// components/QRCodeScanner.js
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the QrReader component to avoid SSR issues
const QrReader = dynamic(() => import('react-qr-scanner'), {
	ssr: false,
});

const QRCodeScanner = ({ onScan }) => {
	const [ error, setError ] = useState('');

	const handleScan = (data) => {
		if (data) {
			onScan(data); // Call the provided onScan function with the scanned data
		}
	};

	const handleError = (err) => {
		console.error(err);
		setError('Failed to read QR code.');
	};

	return (
		<div>
			<QrReader
				delay={300}
				style={{ width: '100%' }}
				onError={handleError}
				onScan={handleScan}
			/>
			{error && <p className="text-red-500">{error}</p>}
		</div>
	);
};

export default QRCodeScanner;
