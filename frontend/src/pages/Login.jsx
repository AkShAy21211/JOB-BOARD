import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import heroImg from '../assets/hero.png';
import logoImg from '../assets/logo.png';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await client.post('/auth/login', form);
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
        
        {/* Left Side: Illustration */}
        <div className="md:w-1/2 bg-[#FFEFED] relative overflow-hidden hidden md:block">
          <img 
            src={heroImg} 
            alt="Hero Illustration" 
            className="w-full h-full object-cover relative z-10"
          />
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center md:text-left">Login</h1>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 animate-shake">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    required
                    className="pl-12 !bg-slate-50 border-slate-200 focus:border-[#FF6B6B] focus:ring-[#FF6B6B]/20 py-2.5"
                    placeholder="example@gmail.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </span>
                  <input
                    type="password"
                    required
                    className="pl-12 !bg-slate-50 border-slate-200 focus:border-[#FF6B6B] focus:ring-[#FF6B6B]/20 py-2.5"
                    placeholder="********"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                  />
                </div>
                <div className="text-right mt-1.5">
                  <Link to="/forgot-password" size="sm" className="text-xs font-medium text-[#FF6B6B] hover:underline">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#FF6B6B] text-white font-bold rounded-xl hover:bg-[#FF5252] transition-all transform active:scale-[0.98] shadow-lg shadow-[#FF6B6B]/30"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            <p className="mt-8 text-center text-slate-600 font-medium text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#FF6B6B] hover:underline font-bold">
                Sign Up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
