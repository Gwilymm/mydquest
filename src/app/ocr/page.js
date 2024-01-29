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
		<div className="flex flex-col items-center justify-center min-h-screen p-4">
			<h1 className="text-3xl font-bold text-gray-800 mb-8">OCR Reader</h1>

			<div className="relative bg-white overflow-hidden shadow rounded-lg max-w-sm w-full">
				<video ref={videoRef} onCanPlay={() => videoRef.current.play()} className="w-full h-auto" />
				<canvas ref={canvasRef} className="hidden" />
			</div>

			<div className="flex flex-col space-y-4 mt-6">
				<button onClick={startVideo} className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300">
					Start Camera
				</button>
				<button onClick={captureImage} className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-300">
					Capture Image
				</button>
			</div>

			{text && (
				<div className="mt-6 p-6 bg-white rounded shadow max-w-md w-full">
					<h2 className="text-xl font-semibold text-gray-900 mb-2">Extracted Text:</h2>
					<p className="text-gray-600 whitespace-pre-wrap">{text}</p>
				</div>
			)}
		</div>

	);
}
