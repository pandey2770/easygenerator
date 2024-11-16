import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
