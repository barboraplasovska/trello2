import React from 'react';
import LoginCard from "../components/Forms/LoginCard/LoginCard";
import '../styles/LoginPageStyles.css';

export default function Login() {
  return (
      <div className="container-login-page">
          <div className="text-container-login-page">
              <div className="top-text-container-login-page">
                  <span className="welcome-text-login-page">Welcome to </span>
                  <span className="app-name-login-page">Trello2</span>
              </div>
              <div className="subtitle-login-page">
                  the app that lets you organize yourself Kanban style
              </div>
          </div>
          <div className="card-container-login-page">
              <LoginCard />
          </div>
      </div>
  );
}