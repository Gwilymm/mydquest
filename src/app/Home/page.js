// app/home/page.js
"use client";
import Image from "next/image";
import myDQuestImage from '/public/assets/image/illustration/home.png'; // Update the path to your image
import React, { useEffect } from 'react';
import axios from 'axios';
import { Button, Card } from '@shadcn/ui';
import db from '@/utils/db'; // Make sure to adjust the import path to your Dexie database instance

const useSynchronizeEnigmas = () => {
  useEffect(() => {
    // Define the function inside useEffect to ensure it's only used on the client-side
    const synchronizeEnigmas = async () => {
      const localEnigmas = await db.enigmas.toArray();
      for (const enigma of localEnigmas) {
        try {
          await axios.put(`/api/enigmas/${enigma.id}`, enigma);
          await db.enigmas.delete(enigma.id); // Remove from local DB after successful sync
          console.log('Enigma synchronized:', enigma);
        } catch (error) {
          console.error('Failed to synchronize enigma:', error);
        }
      }
    };

    // Check if the window object is available (i.e., code is running in the browser)
    if (typeof window !== 'undefined') {
      window.addEventListener('online', synchronizeEnigmas);

      // Return a cleanup function to remove the event listener when the component unmounts or re-renders
      return () => {
        window.removeEventListener('online', synchronizeEnigmas);
      };
    }
  }, []); // Empty dependency array ensures this runs once on mount
};
export default function HomePage() {
  useSynchronizeEnigmas();
  return (

    <div className="container mx-auto px-4">
      <header className="py-4">
        <h1 className="text-3xl font-bold text-gray-800">MyD Quest</h1>
      </header>

      <main className="flex flex-col items-center justify-center">
        <Image
          src={myDQuestImage}
          alt="MyD Quest Adventure"
          width={600}
          height={400}
          objectFit="cover"
        />

        <div className="text-center mt-4">
          <h2 className="text-5xl font-bold text-white">
            Discover the forgotten CousCous
          </h2>
          <p className="mt-4 text-xl text-gray-300">
            Embark on a captivating campus treasure hunt.
          </p>
        </div>

        <Button as="a" href="/login" variant="solid" color="primary" className="mt-8">
          Start the Quest
        </Button>
      </main>

      <footer className="py-4">
        <p className="text-center text-white">
          MyDQuest © 2024
        </p>
      </footer>
    </div>
  );
}
