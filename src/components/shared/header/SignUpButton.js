import { Button } from "@mui/material";
import PersonAddAltOutlined from "@mui/icons-material/PersonAddAltOutlined";
import { useAuth0 } from "@auth0/auth0-react";

export default function SignUpButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: "signup" } })}
      color="primary"
      variant="contained"
      startIcon={<PersonAddAltOutlined />}
      sx={{
        textTransform: "none",
        fontSize: "0.9rem",
        padding: "10px 20px",
        borderRadius: "12px",
      }}
    >
      Sign up
    </Button>
  );
}
