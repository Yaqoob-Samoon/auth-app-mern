import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Student from './pages/Student';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes (Login required) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Role-based Routes */}
          <Route element={<RoleRoute requiredRole="student" />}>
            <Route path="/student" element={<Student />} />
          </Route>

          <Route element={<RoleRoute requiredRole="admin" />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;