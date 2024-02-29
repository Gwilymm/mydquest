import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const ToolCard = ({ href, title, description, imageUrl }) => (
	<div className="transform transition duration-500 hover:scale-105 bg-blue-900 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl">
		{/* Image container */}
		<div className="w-full h-40 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}></div>

		{/* Content container */}
		<div className="px-6 py-4">
			<h3 className="font-bold text-xl mb-2 text-teal-300">{title}</h3>
			<p className="text-teal-200 text-base">{description}</p>
		</div>

		{/* Action container */}
		<div className="px-6 py-4">
			<Link href={href}>
				<p className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition duration-300">
					Explore Tool
				</p>
			</Link>
		</div>
	</div>
);

export default function ToolsPage() {
	// Random placeholder images for the example
	const placeholderImages = [
		'https://via.placeholder.com/150',
		'https://via.placeholder.com/150',
		'https://via.placeholder.com/150',
		'https://via.placeholder.com/150'
	];

	return (
		<div className=" text-gray-900 min-h-screen">


			<Navbar />
			<div className="container mx-auto p-6">
				<h1 className="text-4xl font-bold text-center mb-12">Tools</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
					<ToolCard
						href="/tools/gps"
						title="GPS"
						description="Find your way around with our GPS tool."
						imageUrl={placeholderImages[ 0 ]}
					/>
					<ToolCard
						href="/tools/nfc"
						title="NFC"
						description="Interact with NFC tags and devices."
						imageUrl={placeholderImages[ 1 ]}
					/>
					<ToolCard
						href="/tools/ocr"
						title="OCR"
						description="Read and process text from images."
						imageUrl={placeholderImages[ 2 ]}
					/>
					<ToolCard
						href="/tools/qrscan"
						title="QR Scan"
						description="Scan QR codes quickly and easily."
						imageUrl={placeholderImages[ 3 ]}
					/>
				</div>
			</div>
		</div>
	);
}