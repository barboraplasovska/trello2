import React from 'react';
import './ui/styles/App.css';
import HomePage from './ui/pages/Home/HomePage';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Root from './ui/pages/Root';
import HomeLayout from './ui/components/Layouts/HomeLayout';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Root />} />
          {/* <Route path="/login" element= { <Login/> } />
          <Route path="/signup" element= { <SignUp/> } /> */}
          <Route path="/boards" element={
            <HomeLayout>
              <HomePage />
            </HomeLayout>
          } />
          {/* <Route path="/boards/:id" element= { <Board/> } /> */}
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
