import React, { useState } from "react";
import { Button, Stack, TextField, ThemeProvider } from "@mui/material";
import { LoginTheme } from '../styles/LoginStyle';
import { login } from "../../core/services/LoginService";
import { LoginRequest } from "../../core/models/LoginRequest";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async () => {
    
        if (!username || !password) {
          setError('Please fill in all fields');
          return;
        }
        
        let loginRequest : LoginRequest = {
            username: username,
            password: password
        }

        await login(loginRequest).then(() => {
            console.log("Success")
            navigate("/")}).catch((err) => alert(err))
        console.log('Username:', username);
        console.log('Password:', password);
        setError('');
      };
    
    return (
        <ThemeProvider theme={LoginTheme}>
            <Stack direction="column">
                <label>Username</label>
                <TextField required className="custom-field" placeholder="Enter your username..." onChange={onUsernameChange}/>
                <label>Password</label>
                <TextField required className="custom-field" type="password" placeholder="Enter your password..." onChange={onPasswordChange}/>
                <Button className="login-button" onClick={handleSubmit}>Login</Button>
                <span>You don't have an account?</span> <Link to={"/signup"}>Create an account</Link>
            </Stack>
        </ThemeProvider>
    )
}