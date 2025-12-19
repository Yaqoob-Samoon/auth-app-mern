import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white p-6 rounded shadow-sm border">
        <p className="text-xl mb-2">Welcome back, <strong>{user?.name}</strong>!</p>
        <p className="text-gray-600 mb-4">Role: <span className="uppercase font-bold tracking-wider text-xs bg-gray-200 px-2 py-1 rounded">{user?.role}</span></p>
        
        <div className="flex gap-4 mt-6">
          <Link to="/student" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Go to Student Page
          </Link>
          <Link to="/admin" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Go to Admin Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;