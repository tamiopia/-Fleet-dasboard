import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { Home, DirectionsCar, Settings, Menu, Close } from '@mui/icons-material';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Toggle Button */}
      <IconButton
        onClick={toggleSidebar}
        sx={{
          position: 'absolute',
          top: 20,
          left: isOpen ? 260 : 20,
          zIndex: 1000,
          backgroundColor: 'white',
          borderRadius: '50%',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          color: '#0D7C66',
          '&:hover': { backgroundColor: '#f0f0f0' },
          transition: 'all 0.3s ease-in-out',
        }}
      >
        {isOpen ? <Close /> : <Menu />}
      </IconButton>

      {/* Sidebar */}
      <Box
        sx={{
          width: isOpen ? 250 : 0,
          backgroundColor: '#0D7C66',
          padding: isOpen ? 2 : 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 2,
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <List
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
          }}
        >
          <ListItem
            button
            sx={{
              marginBottom: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <Home sx={{ color: 'white', fontSize: 30, marginBottom: 1 }} />
            <ListItemText primary="Dashboard" sx={{ color: 'white', textAlign: 'center' }} />
          </ListItem>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', width: '80%' }} />
          <ListItem
            button
            sx={{
              marginBottom: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <DirectionsCar sx={{ color: 'white', fontSize: 30, marginBottom: 1 }} />
            <ListItemText primary="Vehicles" sx={{ color: 'white', textAlign: 'center' }} />
          </ListItem>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', width: '80%' }} />
          <ListItem
            button
            sx={{
              marginBottom: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <Settings sx={{ color: 'white', fontSize: 30, marginBottom: 1 }} />
            <ListItemText primary="Settings" sx={{ color: 'white', textAlign: 'center' }} />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
