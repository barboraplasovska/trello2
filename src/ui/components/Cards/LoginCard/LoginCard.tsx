import React, { useState } from "react";
import {login, register} from "../../../../core/services/LoginService";
import { LoginRequest } from "../../../../core/models/LoginRequest";
import { useNavigate } from "react-router-dom";
import ConnexionForm from "../ConnexionForm/connexion-form";

export default function LoginCard() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLogIn, setIsLogIn] = useState(true);
    const navigate = useNavigate();

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleLogin = async () => {
        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }

        const loginRequest: LoginRequest = {
            username: username,
            password: password,
        };

        await login(loginRequest)
            .then(() => {
                navigate("/");
            })
            .catch((err) => {
                setError("Login failed. Please check your credentials.");
            });
    };

    const handleSignup = async () => {
        if (!username || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const isPasswordValid = validatePassword(password);
        if (isPasswordValid !== 'Valid password.') {
            setError(isPasswordValid);
            return;
        }

        const registerRequest: LoginRequest = {
            username: username,
            password: password,
        };

        await register(registerRequest)
            .then(() => {
                navigate("/");
            })
            .catch((err) => {
                setError('An error occurred while registering.');
                console.error(err);
            });
    };

    function validatePassword(password: string) {
        const minLength = 8;
        const maxLength = 24;

        if (password.length < minLength || password.length > maxLength) {
            return 'Password must contain between 8 et 24 characters.';
        }

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,24}$/;
        if (!regex.test(password)) {
            return 'The password must contain at least: one uppercase letter, one lowercase letter, one digit, and one special character.';
        }

        return 'Valid password.';
    }

    const toggleFormMode = () => {
        setIsLogIn(!isLogIn);
        setError('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <ConnexionForm
            isLogIn={isLogIn}
            connect={isLogIn ? handleLogin : handleSignup}
            setIsLogIn={setIsLogIn}
            error={error}
            username={username}
            password={password}
            confirmPassword={confirmPassword}
            onUsernameChange={onUsernameChange}
            onPasswordChange={onPasswordChange}
            onConfirmPasswordChange={onConfirmPasswordChange}
            toggleFormMode={toggleFormMode}
        />
    );
}
