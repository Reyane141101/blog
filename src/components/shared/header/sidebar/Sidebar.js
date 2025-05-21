import { useState } from "react";
import { Box, IconButton, Drawer, Toolbar, Divider, MenuItem, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import StyledAppBar from "./../StyledAppBar";
import LoginButton from "../LoginButton";
import SignUpButton from "../SignUpButton";

export default function Sidebar() 
{
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      {!open && (
        <StyledAppBar>
          <Toolbar
            variant="dense"
            disableGutters
            sx={{
              justifyContent: "space-between",
              width: "98%",
              p: "15px 12px",
            }}
          >
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)} sx={{ color: "black" }}>
              <MenuIcon />
            </IconButton>
            <LoginButton/>
          </Toolbar>
        </StyledAppBar>
      )}

      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor="top"
        PaperProps={{
          sx: {
            width: "100%",
            height: "100%",
            backgroundColor: "background.default",
          },
        }}
      >
        <Box sx={{ p: 6, backgroundColor: "background.default" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton onClick={toggleDrawer(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>
          <Divider sx={{ my: 3 }} />
          <MenuItem>
            <SignUpButton/>
          </MenuItem>
          <MenuItem>
            <LoginButton/>
          </MenuItem>
        </Box>
      </Drawer>
    </>
  );
}
