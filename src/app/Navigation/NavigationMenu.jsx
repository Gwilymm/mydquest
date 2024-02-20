import React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

const NavigationMenu = () => {
  const StyledButton = styled(Button)({
    marginRight: '20px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
      backgroundColor: 'rgba(255,255,255,0.2)', // Slight white tint on hover
    },
  });

  return (
    <AppBar position="static" color="primary" sx={{ boxShadow: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          >
            Enigma Admin
          </Typography>

          <nav>
            {/* Use the styled button */}
            <Link href="/admin/dashboard" passHref>
              <StyledButton color="inherit">Dashboard</StyledButton>
            </Link>
            <Link href="/admin/enigmas" passHref>
              <StyledButton color="inherit">Enigmas</StyledButton>
            </Link>
            <Link href="/admin/enigmas/create" passHref>
              <StyledButton color="inherit">Create Enigma</StyledButton>
            </Link>
          </nav>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationMenu;
