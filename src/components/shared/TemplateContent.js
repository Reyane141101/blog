import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Footer from './Footer';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Stack} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import UserMenu from './header/UserMenu';
import StyledAppBar from './header/StyledAppBar';
import LoginButton from './header/LoginButton';
import SignUpButton from './header/SignUpButton';
import ToggleColor from './header/ToogleColor';
import AppLogo from './header/AppLogo';
import Sidebar from './header/sidebar/Sidebar';

function TemplatePage({children}) 
{
  const [mode, setMode] = useState('light');
  const { isAuthenticated } = useAuth0();

  useEffect(() => 
  {
    const savedMode = localStorage.getItem('themeMode') ||
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setMode(savedMode);
  }, []);

  const theme = createTheme({ palette: { mode } });
  const appBarStyle = { display: 'flex', justifyContent: 'space-between', width: '98%', p: '15px 12px' };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <StyledAppBar>
          <Toolbar variant="dense" disableGutters sx={appBarStyle}>
            <AppLogo mode={mode}/>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
              <ToggleColor mode={mode} setMode={setMode} />
              <Stack spacing={2} direction="row">
                {isAuthenticated ? <UserMenu /> : <><SignUpButton /><LoginButton /></>}
              </Stack>
            </Box>
          </Toolbar>
        </StyledAppBar>
      </Box>
        
      <Box sx={{ display: { sm: 'flex', md: 'none' } }}>  
        <Sidebar/>
      </Box>
      <CssBaseline enableColorScheme />

      <Container maxWidth="lg" component="main" sx={{ display: 'flex', flexDirection: 'column', my: 8, gap: 4 }} >
        {children}
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

TemplatePage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TemplatePage;
