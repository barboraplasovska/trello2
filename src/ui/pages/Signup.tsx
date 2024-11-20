import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "../../core/models/LoginRequest";
import { register } from "../../core/services/LoginService";
import { Box, Typography, TextField, Button } from "@mui/material";

function validatePassword(password : string) {
  const minLength = 8;
  const maxLength = 24;

  // Vérification de la longueur
  if (password.length < 8 || password.length > 24) {
    return 'Le mot de passe doit contenir entre 8 et 24 caractères.';
  }

  // Expression régulière pour les autres critères
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,24}$/;

  if (!regex.test(password)) {
    return `Le mot de passe doit contenir :
    - Au moins une lettre majuscule
    - Au moins une lettre minuscule
    - Au moins un chiffre
    - Au moins un caractère spécial.`;
  }

  return 'Mot de passe valide.';
}

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
          setError("Veuillez remplir tous les champs");
          return;
        }
        if (password !== confirmPassword) {
          setError("Les mots de passe ne sont pas les mêmes.");
          return;
        }

        const isPasswordValid = validatePassword(password);
        if (isPasswordValid != 'Mot de passe valide.'){
          setError(isPasswordValid);
          return;
        }
        const registerRequest : LoginRequest = {
          username: username,
          password: password
        }
        await register(registerRequest).then(() => navigate("/login")).catch((err) => {
          setError(error)
          console.log(err)});
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