import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Snackbar } from '@mui/material';
import { useContext } from "react";
import { AuthContext } from '../contexts/AuthContext';
import { useLocation } from "react-router-dom";

const defaultTheme = createTheme();

export default function Authentication() {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");

    const [formState, setFormState] = React.useState(0); // 0 = login, 1 = register
    const [open, setOpen] = React.useState(false);
    

     const { handleRegister, handleLogin } = useContext(AuthContext);

      

    let handleAuth = async () => {
        try {
            if (formState === 0) {
                let result = await handleLogin(username, password);
                console.log(result);
            }

            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                console.log(result);

                setUsername("");
                setPassword("");
                setMessage(result);
                setOpen(true);
                setError("");
                setFormState(0);
            }
        } catch (err) {
            console.log(err);
            let message = err?.response?.data?.message || "Something went wrong";
            setError(message);
        }
    }
    return (
  <ThemeProvider theme={defaultTheme}>
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5"
      }}
    >
      <Box
        sx={{
          width: 350,
          p: 4,
          boxShadow: 3,
          borderRadius: 3,
          backgroundColor: "white",
          textAlign: "center"
        }}
      >
        <Avatar sx={{ m: "auto", bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <div>
          <Button onClick={() => setFormState(0)}>Sign in</Button>
          <Button onClick={() => setFormState(1)}>Sign up</Button>
        </div>

        <Box component="form" noValidate sx={{ mt: 1 }}>

          {formState === 1 && (
            <TextField
              margin="normal"
              required
              fullWidth
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p style={{ color: "red" }}>{error}</p>

          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleAuth}
          >
            {formState === 0 ? "Login" : "Register"}
          </Button>
        </Box>

        <Snackbar
          open={open}
          autoHideDuration={4000}
          message={message}
          onClose={() => setOpen(false)}
        />
      </Box>
    </div>
  </ThemeProvider>
);
}

    
    

    