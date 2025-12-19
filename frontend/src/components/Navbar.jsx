import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-indigo-600">AuthApp</Link>
      <div className="flex gap-4 items-center">
        {!user ? (
          <>
            <Link to="/login" className="text-gray-600 hover:text-indigo-600">Login</Link>
            <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Signup</Link>
          </>
        ) : (
          <>
            <span className="text-gray-600 flex items-center gap-2">
              <User size={18} /> {user.name} ({user.role})
            </span>
            <button onClick={handleLogout} className="text-red-500 hover:text-red-700 flex items-center gap-1">
              <LogOut size={18} /> Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;