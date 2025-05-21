import { useState } from "react";
import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import { useAuth0 } from "@auth0/auth0-react";

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout, user } = useAuth0();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Compte utilisateur">
        <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
          <Avatar alt={user?.name || "Utilisateur"} src={user?.picture || ""} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        sx={{ mt: "45px" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem disabled>
          <Typography variant="body1">{user?.name || "Utilisateur"}</Typography>
        </MenuItem>
        <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>
          <LogoutOutlined fontSize="small" sx={{ marginRight: 1 }} />
          Se déconnecter
        </MenuItem>
      </Menu>
    </>
  );
}
