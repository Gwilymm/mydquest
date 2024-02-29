// components/QrScanner.js
import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QrScanner = ({ onScan }) => {
	const qrRef = useRef(null);

	useEffect(() => {
		const html5QrCode = new Html5QrcodeScanner(
			"qr-reader",
			{ fps: 10, qrbox: 250 },
      /* verbose= */ false
		);

		const onScanSuccess = (decodedText, decodedResult) => {
			console.log(`Code scanned = ${decodedText}`, decodedResult);
			// Pass the scanned text to the parent component
			onScan(decodedText);
		};

		html5QrCode.render(onScanSuccess, (errorMessage) => {
			console.log(errorMessage);
		});

		return () => {
			html5QrCode.clear();
		};
	}, [ onScan ]);

	return (
		<div id="qr-reader" ref={qrRef} className="w-full max-w-md"></div>
	);
};

export default QrScanner;