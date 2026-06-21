import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

// Import Pages
import ReportForm from './pages/ReportForm';
import AdminDashboard from './pages/AdminDashboard';
import ContactUs from './pages/ContactUs';
import About from './pages/About';
import Analytics from './pages/Analytics';
import Login from './pages/Login';

// Import Assets
import gailLogo from './assets/gail.png';

function App() {
  const [openCautions, setOpenCautions] = useState(0);
  const [session, setSession] = useState(null);

  // 1. Supabase Auth Listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Realtime Database Listener
  useEffect(() => {
    fetchOpenCautions();
    
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'incidents' }, () => {
        fetchOpenCautions();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const fetchOpenCautions = async () => {
    const { count, error } = await supabase
      .from('incidents')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'Open');
    
    if (!error) setOpenCautions(count || 0);
  };

  // Quick Sign Out Helper
  const handleSignOut = () => supabase.auth.signOut();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        
        {/* HEADER - CHANGED TO OFFICIAL GAIL YELLOW (#ffde00) WITH RED ACCENT BORDER */}
        <header className="bg-[#ffde00] py-3 px-6 shadow-md border-b-4 border-[#ed1c24]">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            
            <div className="flex items-center space-x-4">
              <img src={gailLogo} alt="GAIL Logo" className="h-16 w-auto object-contain" />
              <div>
                <h1 className="text-xl font-black text-black tracking-tight">GAIL (India) Limited</h1>
                <p className="text-[11px] text-gray-900 font-extrabold uppercase tracking-widest">
                  India's Integrated Energy Major
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              {/* Added 'bg-white' so the input doesn't turn yellow */}
              <input 
                type="text" 
                placeholder="Information Finder" 
                className="bg-white border border-gray-400 px-3 py-1.5 text-sm w-56 rounded focus:outline-none focus:ring-2 focus:ring-[#0072C6]" 
              />
              
              <Link 
                to="/admin" 
                onClick={fetchOpenCautions}
                className={`px-3 py-1 rounded border-2 flex flex-col items-center leading-none shadow-md transition-all hover:scale-105 ${
                  openCautions > 0 ? 'bg-[#FF0000] border-white text-white animate-pulse' : 'bg-green-700 border-green-900 text-white'
                }`}
              >
                <span className="text-[10px] uppercase font-bold">Cautions</span>
                <span className="text-xl font-black">{openCautions > 0 ? openCautions : '✓'}</span>
              </Link>

              {/* DYNAMIC LOGOUT BUTTON */}
              {session && (
                <button 
                  onClick={handleSignOut}
                  className="text-xs font-black text-gray-800 hover:text-red-700 transition underline cursor-pointer"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </header>

        {/* NAVIGATION */}
        <nav className="bg-[#0072C6] text-white shadow-md">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex space-x-8 text-sm font-bold py-3">
              <Link to="/report" className="hover:text-[#ffde00] transition-colors">Submit Report</Link>
              <Link to="/admin" className="hover:text-[#ffde00] transition-colors">Admin Dashboard</Link>
              <Link to="/analytics" className="hover:text-[#ffde00] transition-colors">Analytics</Link>
              <Link to="/about" className="hover:text-[#ffde00] transition-colors">About System</Link>
              <Link to="/contact" className="hover:text-[#ffde00] transition-colors">Contact Us</Link>
            </div>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* SECURED ROUTES */}
            <Route path="/" element={session ? <ReportForm /> : <Login />} />
            <Route path="/report" element={session ? <ReportForm /> : <Login />} />
            <Route path="/admin" element={session ? <AdminDashboard /> : <Login />} />
            <Route path="/analytics" element={session ? <Analytics /> : <Login />} />

            {/* PUBLIC ROUTES */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-gray-400 py-6 text-center text-xs mt-12 border-t-2 border-[#ffde00]">
          <p>© 2026 GAIL (India) Limited. Internal Safety Tracking System.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;