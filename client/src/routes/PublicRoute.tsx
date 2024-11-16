import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type PublicRouteProps = {
  children: JSX.Element;
};

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isAuthenticated = useAuth();
  return !isAuthenticated ? <Navigate to="/signup" /> : children;
};

export default PublicRoute;
