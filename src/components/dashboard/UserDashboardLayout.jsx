// Importez les composants nécessaires de Shadcn et autres dépendances
import React from 'react';
import { signOut } from "next-auth/react"; // Méthode de déconnexion
import { Sidebar, Navbar, Button } from '@shadcn/ui'; // Exemple d'importation de composants Shadcn
import { LogoutIcon } from '@heroicons/react/outline'; // Importation d'une icône de déconnexion
import { motion } from 'framer-motion';

const DashboardLayout = ({ children }) => {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' }); // Redirection vers la page d'accueil après déconnexion
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar avec Shadcn */}
      <Sidebar width={250} className="border-r">
        <Sidebar.Brand>
          <h2 className="text-3xl font-semibold">Dashboard</h2>
        </Sidebar.Brand>
        <Sidebar.Items>
          <Sidebar.Item href="#">Home</Sidebar.Item>
          <Sidebar.Item href="#">Tools</Sidebar.Item>
          <Sidebar.Item href="#">Settings</Sidebar.Item>
          {/* Bouton de déconnexion */}
          <Button 
            icon={<LogoutIcon className="h-5 w-5" />} 
            onClick={handleSignOut}
            className="mt-4"
          >
            Sign Out
          </Button>
        </Sidebar.Items>
      </Sidebar>

      {/* Contenu principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* En-tête */}
        <Navbar className="justify-between flex-shrink-0 p-5 border-b">
          <h1 className="text-2xl font-semibold">Welcome Back!</h1>
        </Navbar>

        {/* Contenu */}
        <main className="flex-1 overflow-y-auto p-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
