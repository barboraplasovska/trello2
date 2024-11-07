import React from 'react';
import { Navigate } from 'react-router-dom';

function Root() {
  const token = localStorage.getItem('authToken');

  const isAuthenticated = Boolean(token);

  return <Navigate to="/boards" replace />; // FIXME: temporary bc no login page

  //return isAuthenticated ? <Navigate to="/boards" replace /> : <Navigate to="/login" replace />;
}

export default Root;
