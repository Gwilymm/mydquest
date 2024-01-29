// app/home/page.js

import React from 'react';
import Image from 'next/image';
import myDQuestImage from '/public/assets/image/illustration/home.png'; // Update the path to your image

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="p-4 bg-gray-800 text-white">
        <h1 className="text-3xl font-bold">MyD Quest</h1>
      </header>

      {/* Hero Section */}
      <section className="relative flex-1">
        <Image
          src={myDQuestImage}
          alt="MyD Quest Adventure"
          layout="fill"
          objectFit="cover"
          priority // for preloading the image
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-white">Discover the forgotten CousCous</h2>
            <p className="mt-4 text-xl text-gray-300">Embark on a captivating campus treasure hunt.</p>
            <a href="/login" className="mt-8 inline-block px-6 py-3 text-lg font-semibold text-teal-500 bg-white rounded-lg shadow hover:bg-gray-100">Start the Quest</a>
          </div>
        </div>
      </section>

      {/* Features or About Section */}
      <section className="p-8">
        <h3 className="text-2xl font-semibold text-center text-gray-800">Why Join MyD Quest?</h3>
        <p className="mt-4 text-gray-600">Engage in a story-driven adventure that tests your wits and knowledge. Explore the campus like never before and solve the mysteries that await.</p>
      </section>

      {/* Footer */}
      <footer className="p-4 bg-gray-700 text-white">
        <div className="text-center">
          <p>MyD Quest © 2024</p>
        </div>
      </footer>
    </div>
  );
}
