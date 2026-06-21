import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false); // UI Toggle
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      // --- REGISTER NEW USER ---
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name // <-- Supabase securely attaches this to the user's token!
          }
        }
      });

      if (error) {
        alert(error.message);
      } else {
        alert("Account created successfully! Switching to login...");
        setIsSignUp(false); // Flip them back to the login screen
      }
    } else {
      // --- LOG IN EXISTING USER ---
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
      else window.location.href = '/'; // Send to dashboard
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white shadow-md rounded-xl border-t-4 border-[#0072C6]">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-gray-900">GAIL Safety Portal</h2>
        <p className="text-xs text-gray-500 mt-1">
          {isSignUp ? 'Create a new authorized personnel account' : 'Enter your credentials to access the field network'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name input ONLY renders if they are in "Sign Up" mode */}
        {isSignUp && (
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Official Name</label>
            <input 
              type="text" 
              required={isSignUp}
              placeholder="e.g. Ramesh Kumar" 
              className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-[#0072C6] outline-none text-sm"
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">GAIL Email Address</label>
          <input 
            type="email" 
            required
            placeholder="employee@gail.co.in" 
            className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-[#0072C6] outline-none text-sm"
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
          <input 
            type="password" 
            required
            placeholder="••••••••" 
            className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-[#0072C6] outline-none text-sm"
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-[#0072C6] hover:bg-blue-800 text-white py-3 rounded font-bold transition shadow-sm text-sm"
        >
          {loading ? 'Communicating with Server...' : (isSignUp ? 'Register Account' : 'Secure Log In')}
        </button>

      </form>

      {/* Mode Flipper */}
      <div className="mt-6 text-center border-t pt-4">
        <button 
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-xs text-[#0072C6] font-bold hover:underline"
        >
          {isSignUp ? 'Already have an account? Sign In' : 'Need field access? Request Account'}
        </button>
      </div>

    </div>
  );
}