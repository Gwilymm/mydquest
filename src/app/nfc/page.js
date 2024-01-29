"use client";
import React, { useEffect, useState } from 'react';

export default function NfcReaderPage() {
	const [ nfcMessage, setNfcMessage ] = useState('');
	const [ isNfcSupported, setIsNfcSupported ] = useState(false);

	useEffect(() => {
		if ('NDEFReader' in window) {
			setIsNfcSupported(true);
		}
	}, []);

	const startNfcScan = async () => {
		if ('NDEFReader' in window) {
			try {
				const reader = new NDEFReader();
				await reader.scan();
				reader.onreading = event => {
					const decoder = new TextDecoder();
					for (const record of event.message.records) {
						if (record.recordType === "text") {
							const text = decoder.decode(record.data);
							setNfcMessage(text);
						}
					}
				};
			} catch (error) {
				console.error(`Error: ${error}`);
			}
		} else {
			console.log("Web NFC is not available. Use this app on an NFC-enabled Android device with Chrome.");
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
			<h1 className="mb-4 text-2xl font-semibold text-gray-800">NFC Reader</h1>
			{isNfcSupported ? (
				<>
					<button onClick={startNfcScan} className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
						Start NFC Scan
					</button>
					{nfcMessage && (
						<div className="mt-8 p-4 max-w-md w-full bg-white rounded-lg shadow-md">
							<h2 className="text-lg font-semibold text-gray-900">NFC Data:</h2>
							<p className="text-gray-600 mt-2">{nfcMessage}</p>
						</div>
					)}
				</>
			) : (
				<p className="text-red-500">NFC is not supported on this device.</p>
			)}
		</div>
	);
}
