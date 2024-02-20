import { motion } from 'framer-motion';
import React from 'react';
import { signOut } from "next-auth/react"; // Import the signOut method

const DashboardLayout = ({ children }) => {
  // Function to handle sign-out
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' }); // Redirect to homepage after sign out
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: 0 }}
        animate={{ width: 250 }}
        className="flex flex-col flex-shrink-0 w-64 h-full p-5 bg-white border-r"
      >
        <h2 className="text-3xl font-semibold">Dashboard</h2>
        {/* Navigation Links */}
        <nav className="flex flex-col mt-10 space-y-2">
          <a href="#" className="hover:text-indigo-600">Home</a>
          <a href="#" className="hover:text-indigo-600">Profile</a>
          <a href="#" className="hover:text-indigo-600">Settings</a>
          {/* Sign out link */}
          <button 
            onClick={handleSignOut} 
            className="mt-4 px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-700"
          >
            Sign Out
          </button>
        </nav>
      </motion.aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between flex-shrink-0 p-5 bg-white border-b">
          <h1 className="text-2xl font-semibold">Welcome Back!</h1>
        </header>

        {/* Content */}
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
