'use client';
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EnigmaList from '@/components/Enigmas/EnigmaList';

// This page is likely a Server Component by default in Next.js 14
const EnigmasPage = () => {
  
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

  useSynchronizeEnigmas();
  
  

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Enigmas</h1>
      {/* EnigmaList will need to be a Client Component if it contains interactive elements */}
      <EnigmaList  />
    </DashboardLayout>
  );
};

export default EnigmasPage;
