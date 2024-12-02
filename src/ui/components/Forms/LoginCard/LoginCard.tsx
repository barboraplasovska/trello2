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
        if (isPasswordValid !== 'Mot de passe valide.') {
            setError(isPasswordValid);
            return;
        }

        const registerRequest: LoginRequest = {
            username: username,
            password: password,
        };

        await register(registerRequest)
            .then(() => {
                navigate("/login");
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
            return 'Le mot de passe doit contenir entre 8 et 24 caractères.';
        }

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,24}$/;
        if (!regex.test(password)) {
            return 'Le mot de passe doit contenir : au moins une lettre majuscule, au moins une lettre minuscule, au moins un chiffre, au moins un caractère spécial.';
        }

        return 'Mot de passe valide.';
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
