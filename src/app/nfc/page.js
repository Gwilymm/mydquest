// app/nfc-reader/page.js
"use client";

import React, { useState, useEffect } from 'react';

export default function NfcReaderPage() {
	const [ nfcMessage, setNfcMessage ] = useState('');

	useEffect(() => {
		if ('NDEFReader' in window) {
			const reader = new NDEFReader();
			reader.scan().then(() => {
				console.log("NFC reader started successfully");
				reader.onreading = event => {
					const decoder = new TextDecoder();
					for (const record of event.message.records) {
						console.log("Record type: " + record.recordType);
						console.log("MIME type: " + record.mediaType);
						console.log("Record id: " + record.id);
						switch (record.recordType) {
							case "text":
								const textDecoder = new TextDecoder(record.encoding);
								setNfcMessage(textDecoder.decode(record.data));
								break;
							// Handle other record types as necessary
						}
					}
				};
			}).catch(error => {
				console.error("Error: " + error);
			});
		} else {
			console.log("Web NFC is not available. Use this app on an NFC-enabled Android device with Chrome.");
		}
	}, []);

	return (
		<div className="p-4">
			<h1 className="text-xl font-semibold">NFC Reader</h1>
			{nfcMessage && (
				<div className="mt-4 p-4 bg-gray-100 rounded">
					<h2 className="text-lg font-semibold">NFC Data:</h2>
					<p>{nfcMessage}</p>
				</div>
			)}
		</div>
	);
}
