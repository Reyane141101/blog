import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Google, GitHub } from '@mui/icons-material';
import logo from "./../logo_olympe.svg";
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import pour la navigation

function LoginDialog({ open, onClose, mode }) {
  const navigate = useNavigate(); // Hook de navigation
  const handleGoogleLogin = () => {
    alert('Google Login');
  };

  const handleGitHubLogin = () => {
    alert('GitHub Login');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box sx={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        py: 2,
      }}>        <Button
          onClick={() => navigate("/")}
          sx={{ padding: 0, minWidth: 40 }}
        >
          <img
            src={logo}
            alt="Olympe Logo"
            style={{
              height: 90,
              filter: mode === 'dark' ? 'invert(1)' : 'none',
            }}
          />
        </Button>
      </Box>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Connect to my account
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Button
            onClick={handleGoogleLogin}
            fullWidth
            startIcon={<Google />}
            sx={{
              textTransform: 'none',
              color: 'black',
              backgroundColor: 'white',
              border: '1px solid #ddd',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: '#f7f7f7',
              },
            }}
          >
            Continue with Google
          </Button>

          <Button
            onClick={handleGitHubLogin}
            fullWidth
            startIcon={<GitHub />}
            sx={{
              textTransform: 'none',
              color: 'white',
              backgroundColor: '#333',
              '&:hover': {
                backgroundColor: '#24292e',
              },
            }}
          >
            Continue with GitHub
          </Button>
        </Stack>
        <Divider sx={{ my: 3 }}></Divider>

        {/* Formulaire d'email et mot de passe */}
        <TextField margin="normal" fullWidth label="Email Address" type="email" />
        <TextField margin="normal" fullWidth label="Password" type="password" />
        
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoginDialog;
