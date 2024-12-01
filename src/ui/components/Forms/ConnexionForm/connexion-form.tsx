import React, { useState } from 'react';
import './connexion-form.css';
import InputField from '../../Inputs/inputs';
import ConnexionButton from '../../Buttons/ConnexionButton/connexion-button';

type formProps = {
    isLogIn: boolean;
    connect: () => void;
    setIsLogIn: React.Dispatch<React.SetStateAction<boolean>>;
    error: string;
    username: string;
    password: string;
    confirmPassword: string;
    onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    toggleFormMode: () => void;
};

export default function ConnexionForm({
    isLogIn,
    connect,
    setIsLogIn,
    error,
    username,
    password,
    confirmPassword,
    onUsernameChange,
    onPasswordChange,
    onConfirmPasswordChange,
    toggleFormMode,
}: formProps) {
    return (
        <div className="connexion-form">
            <div className="form-title">{isLogIn ? "Login" : "Sign up"}</div>

            {error && <div className="form-error">{error}</div>}

            <div className="form-inputs">
                <InputField isPassword={false} value={username} onChange={onUsernameChange} />
                <InputField isPassword={true} value={password} onChange={onPasswordChange} />
                {!isLogIn && (
                    <InputField isPassword={true} value={confirmPassword} onChange={onConfirmPasswordChange} />
                )}
            </div>

            <div className="form-actions">
                <ConnexionButton isLogIn={isLogIn} connect={connect} />
                <div className="bottom-text">
                    <div className="question">
                        {isLogIn ? "Don't have an account?" : "Already have an account?"}
                    </div>
                    <div
                        className="change-mode-text"
                        onClick={toggleFormMode}
                    >
                        {isLogIn ? "Create an account" : "Go to login"}
                    </div>
                </div>
            </div>
        </div>
    );
}
