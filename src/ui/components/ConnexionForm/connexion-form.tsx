import React, { useState } from 'react';
import './connexion-form.css';
import InputField from '../Inputs/inputs';
import ConnexionButton from '../Buttons/connexion-button';

type formProps = {
    isLogIn: boolean;
    connect: () => void;
};

export default function ConnexionForm({ isLogIn: isLogInProp, connect }: formProps) {
    const [isLogIn, setIsLogIn] = useState(isLogInProp);

    return (
        <div className="connexion-form">
            <div className="form-title">
                {isLogIn ? "Login" : "Sign up"}
            </div>

            <div className="form-inputs">
                <InputField isPassword={false} value="Username" />
                <InputField isPassword={true} value="Password" />
                {!isLogIn && (
                    <InputField isPassword={true} value="Confirm password" />
                )}
            </div>

            <div className="form-actions">
                <ConnexionButton isLogIn={isLogIn} connect={connect} />
                <div className="bottom-text">
                    <div className="question">
                        {isLogIn
                            ? "Don't have an account?"
                            : "Already have an account?"}
                    </div>
                    <div
                        className="change-mode-text"
                        onClick={() => setIsLogIn(!isLogIn)}
                    >
                        {isLogIn ? "Create an account" : "Go to login"}
                    </div>
                </div>
            </div>
        </div>
    );
}
