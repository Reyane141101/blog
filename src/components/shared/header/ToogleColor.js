import { IconButton } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useState, useEffect} from 'react';

export default function ToggleColor({ mode, setMode }) 
{
    const [colorButton, setColorButton] = useState('black');
    const toggleColorMode = () => 
    {
      const newMode = mode === 'dark' ? 'light' : 'dark';
      setMode(newMode);
      localStorage.setItem('themeMode', newMode);
    };

    useEffect(() => 
    {
        setColorButton(mode === 'dark' ? 'white' : "black");
    }, [mode]);

    return (
        <IconButton
        aria-label="Toggle theme"
        onClick={toggleColorMode}
        sx={{
            color: colorButton,
            backgroundColor: "transparent",
            "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
        }}
        >
        {mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
        </IconButton>
    );
}
