import React from 'react';
import './ui/styles/App.css';
import HomePage from './ui/pages/Home/HomePage';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Root from './ui/pages/Root';
import HomeLayout from './ui/components/Layouts/HomeLayout';
import BoardPage from "./ui/pages/Board/BoardPage";
import Login from "./ui/pages/Login";
import LoginLayout from "./ui/components/Layouts/LoginLayout";

import { logout } from "./core/services/LoginService";

function onLogout() {
  logout();
  window.location.href = '/login';
}

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element= {
            <LoginLayout>
              <Login/>
            </LoginLayout>
          } />
          <Route path="/boards" element={
            <HomeLayout onLogout={onLogout}>
              <HomePage />
            </HomeLayout>
          } />
          <Route path="/board/:name" element={
            <HomeLayout onLogout={onLogout}>
              <BoardPage />
            </HomeLayout>
          } />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
