import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "./../../../logo_olympe.svg"

export default function AppLogo({ mode }) 
{
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}>
      <Button
        onClick={() => navigate("/")}
        sx={{
          padding: 0,
          minWidth: 40,
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        <img
          src={logo}
          alt="Olympe Logo"
          style={{
            height: 55,
            filter: mode === "dark" ? "invert(1)" : "none",
            transition: "filter 0.3s ease-in-out",
          }}
        />
      </Button>
    </Box>
  );
}
