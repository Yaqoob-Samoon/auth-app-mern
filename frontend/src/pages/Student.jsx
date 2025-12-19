// src/pages/Student.jsx
import { useEffect, useState } from 'react';
import api from '../api/axios';

const Student = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Example: Fetching data from the student-only endpoint
    api.get('/users/student').then(res => setData(res.data)).catch(console.error);
  }, []);

  return (
    <div className="p-8 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-800">Student Portal</h1>
      <p className="mt-4">This page is protected. Only students can see this.</p>
      {data && <pre className="bg-gray-800 text-white p-4 mt-4 rounded">{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default Student;
