'use client';
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EnigmaList from '@/components/Enigmas/EnigmaList';

// This page is likely a Server Component by default in Next.js 14
const EnigmasPage = () => {
  // This data would be fetched from your database in a real application
  const enigmas = [
    { id: 1, title: 'Enigma 1', description: 'Description 1', hints: 'Hints 1', solution: 'Solution 1' },
    // ... other enigmas
  ];

  // The handlers are now simple stubs that only log to the console
  // because Server Components can't contain event handlers
  // You would implement the actual logic elsewhere, likely in a Client Component
  const handleEdit = (id) => {
    console.log('Edit enigma with ID:', id);
    // Navigate to the edit page or open a modal here
  };

  const handleDelete = (id) => {
    console.log('Delete enigma with ID:', id);
    // Make an API request to delete the enigma from the database here
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Enigmas</h1>
      {/* EnigmaList will need to be a Client Component if it contains interactive elements */}
      <EnigmaList enigmas={enigmas} onEdit={handleEdit} onDelete={handleDelete} />
    </DashboardLayout>
  );
};

export default EnigmasPage;
