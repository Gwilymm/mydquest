// app/qrscan/page.js
"use client";

import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRScanPage = () => {
	const qrRef = useRef(null);

	useEffect(() => {
		const html5QrCode = new Html5QrcodeScanner(
			"qr-reader",
			{ fps: 10, qrbox: 250 },
      /* verbose= */ false
		);
		const onScanSuccess = (decodedText, decodedResult) => {
			console.log(`Code scanned = ${decodedText}`, decodedResult);
			// redirect to the URL
			window.location.href = decodedText;
			// Handle the scanned text as needed.
		};
		html5QrCode.render(onScanSuccess, (errorMessage) => {
			// 
			console.log(errorMessage);
		});

		return () => {
			html5QrCode.clear();
		};
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
			<div id="qr-reader" ref={qrRef} className="w-full max-w-md"></div>
		</div>
	);
};

export default QRScanPage;
