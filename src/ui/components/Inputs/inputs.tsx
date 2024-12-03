import React from 'react';

import "./inputs.css"
import PropTypes from 'prop-types';

type inputProps = {
    isPassword: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({ isPassword, value, onChange }: inputProps) {
    return (
        <div className="input-field">
            <input
                type={isPassword ? "password" : "text"}
                value={value}
                onChange={onChange}
                placeholder={isPassword ? "Enter your password" : "Enter your username"}
            />
        </div>
    );
}

InputField.propTypes = {
    isPassword: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
