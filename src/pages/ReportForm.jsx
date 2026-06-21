import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function ReportForm() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Gas Leak');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [geoStatus, setGeoStatus] = useState('Standby');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setGeoStatus('Acquiring GPS & Identity...');

    // Get current secure session
    const { data: { session } } = await supabase.auth.getSession();

    // Look up the full name from metadata, fallback to email, then Anonymous
    const submitterName = session?.user?.user_metadata?.full_name || session?.user?.email || "Anonymous";

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setGeoStatus('Data Locked!');

        const { error } = await supabase
          .from('incidents')
          .insert([{ 
            title, 
            category, 
            description, 
            status: 'Open',
            lat: latitude, 
            lng: longitude,
            submitted_by: submitterName // Passes actual Name to the database
          }]);

        setIsSubmitting(false);

        if (error) {
          console.error("Database Error:", error.message);
          alert("Failed to transmit report. Please check your connection.");
        } else {
          alert("Official Report logged securely!");
          setTitle('');
          setDescription('');
          setCategory('Gas Leak');
          setGeoStatus('Standby');
        }
      },
      (geoError) => {
        setIsSubmitting(false);
        setGeoStatus('GPS Error');
        alert("Location access denied. Please enable GPS permissions to submit an official hazard report.");
      }
    );
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border-t-4 border-[#0072C6]">
      <div className="mb-8 border-b pb-4">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Field Hazard Report</h2>
        <p className="text-gray-500 mt-1">Automated GPS and identity logging enabled for Vijaipur facility.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Title Input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Incident Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0072C6]"
            placeholder="e.g., Main Valve Pressure Drop"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Category Options */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Hazard Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-4 py-2.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0072C6]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Gas Leak">Gas Leak / Pipeline Issue</option>
            <option value="Structural Damage">Structural Damage</option>
            <option value="Electrical Hazard">Electrical Hazard</option>
            <option value="Fire Safety">Fire / Combustible Safety</option>
            <option value="Other">Other Concern</option>
          </select>
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Full Description <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows="4"
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0072C6]"
            placeholder="Describe the nature of the issue and any immediate actions taken..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 text-white font-bold rounded-md shadow-sm transition-colors flex items-center justify-center space-x-2 ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0072C6] hover:bg-blue-800'
            }`}
          >
            <span>{isSubmitting ? 'Transmitting...' : 'Submit Report'}</span>
            {isSubmitting && <span className="animate-spin">◎</span>}
          </button>
          
          <div className="mt-2 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
            System Status: {geoStatus}
          </div>
        </div>
        
      </form>
    </div>
  );
}