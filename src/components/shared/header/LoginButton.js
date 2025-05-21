import { Button } from "@mui/material";
import LoginOutlined from "@mui/icons-material/LoginOutlined";
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() => loginWithRedirect()}
      variant="outlined"
      startIcon={<LoginOutlined />}
      sx={{
        textTransform: "none",
        fontSize: "0.9rem",
        padding: "10px 20px",
        borderRadius: "10px",
        "&:hover": {
          backgroundColor: "rgba(0, 123, 255, 0.1)",
        },
      }}
    >
      Login
    </Button>
  );
}
