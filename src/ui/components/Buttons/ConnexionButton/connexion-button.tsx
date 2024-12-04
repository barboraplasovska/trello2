import React from 'react';

import './connexion-buttons.css';
import PropTypes from 'prop-types';

type ConnexionButtonsProps = {
    isLogIn: boolean;
    connect: () => void;
};

export default function ConnexionButton({ isLogIn, connect }: ConnexionButtonsProps) {
    return (
        <div className="connexion-button">
            <button
                onClick={connect}
                aria-label={isLogIn ? "login" : "signup"}>

                {isLogIn ? "Log in" : "Sign up"}
            </button>
        </div>
    )
}

ConnexionButton.propTypes = {
    isLogIn: PropTypes.bool.isRequired,
    connect: PropTypes.func,
}