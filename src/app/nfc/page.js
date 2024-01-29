import React, { useState } from 'react';

export default function NfcReaderPage() {
	const [ nfcMessage, setNfcMessage ] = useState('');
	const [ isNfcSupported, setIsNfcSupported ] = useState(false);

	// Check NFC support
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
				console.log("NFC reader started successfully");
				reader.onreading = event => {
					const decoder = new TextDecoder();
					for (const record of event.message.records) {
						console.log(`Record type: ${record.recordType}`);
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
		<div className="p-4">
			<h1 className="text-xl font-semibold">NFC Reader</h1>
			{isNfcSupported ? (
				<>
					<button onClick={startNfcScan} className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700">
						Start NFC Scan
					</button>
					{nfcMessage && (
						<div className="mt-4 p-4 bg-gray-100 rounded">
							<h2 className="text-lg font-semibold">NFC Data:</h2>
							<p>{nfcMessage}</p>
						</div>
					)}
				</>
			) : (
				<p>NFC is not supported on this device.</p>
			)}
		</div>
	);
}
