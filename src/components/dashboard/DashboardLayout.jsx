// DashboardLayout.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import NavigationMenu from '@/app/Navigation/NavigationMenu';

const DashboardLayout = ({ children }) => {
  return (
    <>

      <NavigationMenu />
      <Container>{children}</Container>
    </>
  );
};

export default DashboardLayout;
