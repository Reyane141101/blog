import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import ToggleColorMode from './ToggleColorMode';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Footer from './Footer';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';



const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'sticky',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  backgroundImage: 'none',
  zIndex: theme.zIndex.drawer + 1,
  flex: '0 0 auto',
  transition: 'transform 0.3s ease-in-out',
}));

function TemplatePage({children}) 
{
  const [mode, setMode] = React.useState('light');
  const [open, setOpen] = React.useState(false);

  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => 
  {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  React.useEffect(() => 
  {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) 
    {
      setMode(savedMode);
    } 
    else 
    {
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }

  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>

      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <StyledAppBar>
          <Toolbar
              variant="dense"
              disableGutters
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '98%',
                p: '15px 12px',
              }}
          >
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
                  <Button variant="text" color="info" sx={{fontSize: '1rem'}}>
                    Home
                  </Button>
                  <Button variant="text" color="info" sx={{fontSize: '1rem'}}>
                    Testimonials
                  </Button>
                  <Button variant="text" color="info" sx={{fontSize: '1rem'}}>
                    Highlights
                  </Button>
                  <Button variant="text" color="info" sx={{fontSize: '1rem'}}>
                    Pricing
                  </Button>
                  <Button variant="text" color="info"  sx={{minWidth: 0, fontSize: '1rem'}}>
                    FAQ
                  </Button>
                  <Button variant="text" color="info" sx={{minWidth: 0, fontSize: '1rem'}}>
                    Blog
                  </Button>
            </Box>

            <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  gap: 1,
                  alignItems: 'center',
                }}
            >
              <ToggleColorMode
                data-screenshot="toggle-mode"
                mode={mode}
                toggleColorMode={toggleColorMode}
              />
              <Button color="primary" variant="outlined" sx={{ fontSize: '1rem', padding: '10px 16px' }}>
                Sign in
              </Button>
              <Button color="primary" variant="contained" sx={{ fontSize: '1rem', padding: '10px 16px' }}>
                Sign up
              </Button>
            </Box>
          </Toolbar>
        </StyledAppBar>
      </Box>
        
      <Box sx={{ display: { sm: 'flex', md: 'none' } }}>  
        {!open && (
        <StyledAppBar>
          <Toolbar
            variant="dense"
            disableGutters
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '98%',
              p: '15px 12px',
            }}
          >
              <IconButton aria-label="Menu button" onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
          </Toolbar>
        </StyledAppBar>)}
        <Drawer  
          open={open} 
          onClose={toggleDrawer(false)}
          achor="top"
          PaperProps={{
            sx: {
              width: '100%',
              height: '100%',
              backgroundColor: 'background.default',
            },}}
        >
          <Box sx={{ p: 6, backgroundColor: 'background.default' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <IconButton onClick={toggleDrawer(false)}>
                <CloseRoundedIcon />
              </IconButton>
            </Box>
            <Divider sx={{ my: 3 }} />
            <MenuItem>Home</MenuItem>
            <MenuItem>Testimonials</MenuItem>
            <MenuItem>Highlights</MenuItem>
            <MenuItem>Pricing</MenuItem>
            <MenuItem>FAQ</MenuItem>
            <MenuItem>Blog</MenuItem>
            <MenuItem>
              <Button color="primary" variant="contained" fullWidth>
                Sign up
              </Button>
            </MenuItem>
            <MenuItem>
              <Button color="primary" variant="outlined" fullWidth>
                Sign in
              </Button>
            </MenuItem>
          </Box>
        </Drawer>
      </Box>
      <CssBaseline enableColorScheme />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 8, gap: 4 }}
      >
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
