
// src/pages/Admin.jsx
import { useEffect, useState } from 'react';
import api from '../api/axios';

const Admin = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/users/admin').then(res => setData(res.data)).catch(console.error);
  }, []);

  return (
    <div className="p-8 bg-red-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-800">Admin Console</h1>
      <p className="mt-4">Restricted Area. Only Admins allowed.</p>
      {data && <pre className="bg-gray-800 text-white p-4 mt-4 rounded">{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default Admin;