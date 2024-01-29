// app/nfc-reader/page.js
"use client";

import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';

export default function OCRPage() {
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const [ text, setText ] = useState('');

	const startVideo = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
			videoRef.current.srcObject = stream;
		} catch (error) {
			console.error("Error accessing the camera", error);
		}
	};

	const captureImage = () => {
		const context = canvasRef.current.getContext('2d');
		context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
		canvasRef.current.toBlob(processImage);
	};

	const processImage = (blob) => {
		Tesseract.recognize(
			blob,
			'fra',
			{ logger: m => console.log(m) }
		).then(({ data: { text } }) => {
			setText(text);
		});
	};

	return (
		<div className="p-4">
			<h1 className="text-xl font-semibold">OCR Reader</h1>
			<video ref={videoRef} onCanPlay={() => videoRef.current.play()} className="w-full h-auto" />
			<canvas ref={canvasRef} style={{ display: 'none' }} />
			<button onClick={startVideo} className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700">
				Start Camera
			</button>
			<button onClick={captureImage} className="px-4 py-2 mt-4 text-white bg-green-600 rounded hover:bg-green-700">
				Capture Image
			</button>
			<div className="mt-4 p-4 bg-gray-100 rounded">
				<h2 className="text-lg font-semibold">Extracted Text:</h2>
				<p className="text-gray-600">{text}</p>
			</div>
		</div>
	);
}
