import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function App() {
  const [ftseData, setFtseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/ftse100');
        setFtseData(data);
      } catch (error) {
        console.error('Error fetching FTSE data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-3">FTSE 100 Index Tracker</h1>
      <LineChart width={600} height={300} data={ftseData}
                 margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="close" stroke="#ff7300" yAxisId={0} />
      </LineChart>
    </div>
  );
}

export default App;
