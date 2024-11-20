import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../core/stores/userStore';

function Root() {
  const token = useAuthStore.getState().jwt;

  const isAuthenticated = Boolean(token);
  console.log("Aaaaaaa")
  return isAuthenticated ? <Navigate to="/boards" replace /> : <Navigate to="/login" replace />;
}

export default Root;
