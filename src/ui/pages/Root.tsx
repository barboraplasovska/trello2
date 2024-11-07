import React from 'react';
import { Navigate } from 'react-router-dom';

function Root() {
  const token = localStorage.getItem('authToken');

  const isAuthenticated = Boolean(token);

  return isAuthenticated ? <Navigate to="/boards" replace /> : <Navigate to="/login" replace />;
}

export default Root;
