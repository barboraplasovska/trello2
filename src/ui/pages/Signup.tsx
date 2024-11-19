import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "../../core/models/LoginRequest";
import { register } from "../../core/services/LoginService";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
      });
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

    const handleSubmit = async () => {

        const { username, password, confirmPassword } = formData;

        if (!username || !password || !confirmPassword){
            setError("Please fill in all fields");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const registerRequest : LoginRequest = {
            username: username,
            password: password
        }
        await register(registerRequest).then(() => navigate("/login")).catch(() => setError("Login failed"))
    }

    return (
        <Box className="sign-up-form">
          <Box component="form" className="create-account-form" onSubmit={handleSubmit}>
            <Typography variant="h4" align="center" gutterBottom>
              Create Account
            </Typography>
            {error && <Typography className="form-error">{error}</Typography>}
    
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button type="submit" variant="contained" className="submit-button" onClick={handleSubmit}>
              Sign up!
            </Button>
          </Box>
        </Box>
    );
}