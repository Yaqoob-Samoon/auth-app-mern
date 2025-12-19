import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const RoleRoute = ({ requiredRole }) => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user && user.role !== requiredRole) {
      toast.error(`Access denied: Requires ${requiredRole} role`);
    }
  }, [loading, user, requiredRole]);

  if (loading) return null; // Or spinner

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== requiredRole) {
    // Redirect to dashboard if role doesn't match
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;