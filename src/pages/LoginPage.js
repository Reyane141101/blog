import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";
import { Lock, Person, Google, GitHub } from "@mui/icons-material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:5000/auth/github";
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(to right, #2196f3, #9c27b0)" }}>
      <Card sx={{ maxWidth: 400, p: 4, borderRadius: 2, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Login to Your Account
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ position: "relative" }}>
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{ startAdornment: <Person color="action" style={{ marginRight: "8px" }} /> }}
                required
              />
            </Box>
            <Box sx={{ position: "relative" }}>
              <TextField
                fullWidth
                variant="outlined"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{ startAdornment: <Lock color="action" style={{ marginRight: "8px" }} /> }}
                required
              />
            </Box>
            <Button type="submit" variant="contained" sx={{ backgroundColor: "#2196f3", color: "white" }} fullWidth>
              Login
            </Button>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Or login using:
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 2 }}>
            <Button
              variant="outlined"
              startIcon={<Google />}
              onClick={handleGoogleLogin}
              sx={{ color: "#db4437", borderColor: "#db4437" }}
            >
              Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<GitHub />}
              onClick={handleGithubLogin}
              sx={{ color: "#333", borderColor: "#333" }}
            >
              GitHub
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
