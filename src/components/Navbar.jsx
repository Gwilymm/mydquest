// components/Navbar.js
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import { signOut } from 'next-auth/react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledButton = styled(Button)({
  marginRight: '20px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
});
const handleSignOut = () => {
  signOut({ callbackUrl: `${window.location.origin}/` });
};


const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <button onClick={() => setIsDrawerOpen(!isDrawerOpen)} className="md:hidden">
        {isDrawerOpen ? <FaTimes /> : <FaBars />}
      </button>
      <nav className={`${isDrawerOpen ? 'block' : 'hidden'} md:block`}>
        <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <li>
            <Link href="/user" passHref>
              <StyledButton color="inherit">Home</StyledButton>
            </Link>
          </li>
          <li>
            <Link href="/tools" passHref>
              <StyledButton color="inherit">Tools</StyledButton>
            </Link>
          </li>
          <li>
            <Link href="/settings" passHref>
              <StyledButton color="inherit">Settings</StyledButton>
            </Link>
          </li>
          <li>
            <StyledButton onClick={handleSignOut} className="text-gray-600 hover:text-gray-900">Logout</StyledButton>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
