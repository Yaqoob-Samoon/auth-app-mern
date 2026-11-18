// src/pages/Admin.jsx
import { useEffect, useState } from 'react';
import api from '../api/axios';

const Admin = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Changed endpoint from '/users/admin' to '/users/teacher'
    api.get('/users/teacher')
      .then(res => setData(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-8 bg-red-50 min-h-screen">
      {/* Updated text to reflect Teacher role */}
      <h1 className="text-3xl font-bold text-red-800">Teacher Portal</h1>
      <p className="mt-4">Restricted Area. Only Teachers allowed.</p>
      {data && (
        <pre className="bg-gray-800 text-white p-4 mt-4 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default Admin;