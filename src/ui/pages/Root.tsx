import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../core/stores/userStore';

function Root() {
  const isLoggedIn = useAuthStore.getState().isLoggedIn;

  return isLoggedIn ? <Navigate to="/boards" replace /> : <Navigate to="/login" replace />;
}

export default Root;
