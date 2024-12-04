import React from 'react';
import './ui/styles/App.css';
import HomePage from './ui/pages/Home/HomePage';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Root from './ui/pages/Root';
import BoardPage from "./ui/pages/Board/BoardPage";
import Login from "./ui/pages/Login";
import LoginLayout from "./ui/components/Layouts/LoginLayout";
import NotFoundPage from './ui/pages/NotFoundPage';
import BoardNotFoundPage from './ui/pages/BoardNotFoundPage';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/boardnotfound" element={<BoardNotFoundPage />} />
          <Route path="/" element={<Root />} />
          <Route path="/login" element= {
            <LoginLayout>
              <Login/>
            </LoginLayout>
          } />
          <Route path="/boards" element={
              <HomePage />
          } />
          <Route path="/board/:name" element={
              <BoardPage />
          } />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
