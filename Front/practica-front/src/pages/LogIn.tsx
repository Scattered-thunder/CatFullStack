import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Typography, TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserAndAuth } from "../services/auth";
import { SetSessionData } from "../redux/slices/sessionSlice";

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();
  const dispatchTo = useDispatch();

  const handleLogin = async () => {
    const session = await fetchUserAndAuth(username, password);
    if (session) {
      dispatchTo(SetSessionData({ username: session.username }));
      navigateTo("/home");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "gray",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Typography variant="h3">Log In</Typography>
      <TextField
        variant="filled"
        label="Usuario"
        margin="normal"
        sx={{ bgcolor: "white", marginX: 1 }}
        onChange={(e) => setUsername(e.target.value)}
      ></TextField>
      <TextField
        variant="filled"
        label="Contraseña"
        margin="normal"
        sx={{ bgcolor: "white", marginX: 1 }}
        onChange={(e) => setPassword(e.target.value)}
      ></TextField>
      <Button variant="contained" size="large" onClick={handleLogin}>
        Ingresar
      </Button>
    </Box>
  );
}
