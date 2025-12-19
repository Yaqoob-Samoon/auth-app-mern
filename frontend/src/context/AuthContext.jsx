import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // loading is true by default to prevent flashing login screen while verifying session
  const [loading, setLoading] = useState(true); 

  // Check if user is logged in on mount (verify HTTP-only cookie)
  useEffect(() => {
    const verifySession = async () => {
      try {
        // We call the protected /test endpoint. 
        // If the browser has a valid cookie, this returns 200 + user data
        const { data } = await api.get('/users/test');
        setUser(data.user || data); // Adjust based on your exact JSON response structure
      } catch (error) {
        // If 401, simply means not logged in. No error toast needed here.
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = async (credentials) => {
    try {
      const { data } = await api.post('/users/login', credentials);
      setUser(data.user);
      toast.success('Logged in successfully');
      return true;
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed';
      toast.error(msg);
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      await api.post('/users/signup', userData);
      toast.success('Account created! Please log in.');
      return true;
    } catch (error) {
      const msg = error.response?.data?.message || 'Signup failed';
      toast.error(msg);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Ideally, backend should have a /logout endpoint to clear the cookie
      // await api.post('/users/logout'); 
      setUser(null);
      toast.success('Logged out');
      
      // Optional: Force reload to clear any in-memory states
      // window.location.href = '/login';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};