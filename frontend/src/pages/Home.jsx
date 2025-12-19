import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-50">
      <h1 className="text-5xl font-bold text-indigo-800 mb-6">Welcome</h1>
      <p className="text-xl text-gray-600 mb-8">Secure Authentication Demo with React & Express</p>
      <div className="flex gap-4">
        <Link to="/login" className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded shadow hover:bg-gray-100 transition">
          Login
        </Link>
        <Link to="/signup" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded shadow hover:bg-indigo-700 transition">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;