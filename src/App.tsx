import React from 'react';
import './ui/styles/App.css';
import Home from './ui/pages/Home/Home';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Root from './ui/pages/Root';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
     
      <Routes>
          <Route path="/" element={ <Root/> } />
          {/* <Route path="/login" element= { <Login/> } />
          <Route path="/signup" element= { <SignUp/> } /> */}
          <Route path="/boards" element= { <Home /> } />
          {/* <Route path="/boards/:id" element= { <Board/> } /> */}
      </Routes>
    </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
