import React from 'react';
import './ui/styles/App.css';
import HomePage from './ui/pages/Home/HomePage';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Root from './ui/pages/Root';
import HomeLayout from './ui/components/Layouts/HomeLayout';
import BoardPage from "./ui/pages/Board/BoardPage";
import LoginLayout from "./ui/components/Layouts/LoginLayout";
import Login from "./ui/pages/Login";

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
            <HomeLayout>
              <HomePage />
            </HomeLayout>
          } />
          <Route path="/board/:id" element={
            <HomeLayout>
              <BoardPage />
            </HomeLayout>
          } />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
