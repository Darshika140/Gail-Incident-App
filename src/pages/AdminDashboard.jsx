import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminDashboard() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    const { data, error } = await supabase
      .from('incidents')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching:', error.message);
    else setIncidents(data);
    
    setLoading(false);
  };

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('incidents')
      .update({ status: newStatus })
      .eq('id', id);
      
    if (error) {
      alert("Failed to update status.");
      console.error(error);
    } else {
      setIncidents(incidents.map(inc => inc.id === id ? { ...inc, status: newStatus } : inc));
    }
  };

  const deleteIncident = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to permanently delete this report?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from('incidents')
      .delete()
      .eq('id', id);
      
    if (error) {
      alert("Failed to delete report.");
      console.error(error);
    } else {
      setIncidents(incidents.filter(inc => inc.id !== id));
    }
  };

  if (loading) {
    return <div className="text-center mt-20 text-xl font-bold text-gray-500">Loading Database Records...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8 border-b-2 border-[#0072C6] pb-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900">Admin Dashboard</h2>
          <p className="text-gray-600 mt-1">Manage and resolve field safety reports.</p>
        </div>
        <div className="bg-blue-100 text-[#0072C6] px-4 py-2 rounded-lg font-bold">
          Total Reports: {incidents.length}
        </div>
      </div>

      {incidents.length === 0 ? (
        <div className="bg-white p-10 text-center rounded-lg border border-gray-200 shadow-sm">
          <p className="text-gray-500 text-lg">No incidents reported yet. The facility is secure.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {incidents.map((incident) => (
            <div key={incident.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              
              <div className="p-5 border-b border-gray-100 flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {incident.category}
                  </span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    incident.status === 'Closed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700 animate-pulse'
                  }`}>
                    {incident.status || 'Open'}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{incident.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{incident.description}</p>
                
                {/* GPS Coordinates Display - FIXED LINK */}
                {incident.lat && incident.lng && (
                  <div className="mb-4 bg-gray-50 p-2 rounded border border-gray-100">
                    <p className="text-[10px] font-bold text-[#0072C6] uppercase tracking-widest">📍 Location</p>
                    <p className="text-xs text-gray-500 font-mono">{incident.lat.toFixed(5)}, {incident.lng.toFixed(5)}</p>
                    <a 
                      href={`https://www.google.com/maps?q=${incident.lat},${incident.lng}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] text-blue-600 font-bold underline hover:text-blue-800"
                    >
                      View on Map
                    </a>
                  </div>
                )}

                {/* Reported By Display */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Reported By</p>
                  <p className="text-xs font-semibold text-gray-700">{incident.submitted_by || "Anonymous"}</p>
                </div>

                <p className="text-xs text-gray-400 font-medium mt-4">
                  Logged: {new Date(incident.created_at).toLocaleString()}
                </p>
              </div>

              <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between items-center">
                <button 
                  onClick={() => updateStatus(incident.id, incident.status === 'Closed' ? 'Open' : 'Closed')}
                  className={`text-sm font-bold transition ${incident.status === 'Closed' ? 'text-yellow-600' : 'text-[#0072C6]'}`}
                >
                  {incident.status === 'Closed' ? '↺ Reopen' : '✓ Mark Closed'}
                </button>
                <button 
                  onClick={() => deleteIncident(incident.id)}
                  className="text-sm font-bold text-red-500 hover:text-red-700 transition"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}