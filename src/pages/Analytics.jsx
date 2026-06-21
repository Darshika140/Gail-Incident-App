import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Analytics() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    const { data } = await supabase.from('incidents').select('category');
    if (data) setIncidents(data);
  };

  const categories = ['Gas Leak', 'Structural Damage', 'Electrical Hazard', 'Fire Safety', 'Other'];
  const chartData = categories.map(cat => ({
    name: cat,
    count: incidents.filter(i => i.category === cat).length
  }));

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-3xl font-black text-gray-900 mb-8">Safety Analytics</h2>
      <div className="h-80 w-full">
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0072C6' : '#ffde00'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}