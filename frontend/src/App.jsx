import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';

import logoImg from './assets/logo.png';

const Navbar = () => (
  <nav className="glass sticky top-0 z-50 px-8 py-4 flex justify-between items-center">
    <div className="flex items-center gap-3 group cursor-pointer">
      <img src={logoImg} alt="VibeHire Logo" className="h-10 w-auto rounded-lg transition-transform group-hover:scale-110" />
      <span className="font-extrabold text-2xl tracking-tighter text-slate-800">
        Vibe<span className="text-[#FF6B6B]">Hire</span>
      </span>
    </div>
    <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
      <Link to="/" className="hover:text-[#FF6B6B] transition-colors">Find Jobs</Link>
      <Link to="/login" className="px-6 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all">Sign In</Link>
      <Link to="/register" className="px-6 py-2 rounded-xl bg-[#FF6B6B] text-white hover:bg-[#FF5252] shadow-lg shadow-[#FF6B6B]/20 transition-all">Post a Job</Link>
    </div>
  </nav>
);

const Register = () => <div className="p-10">Register Page (WIP)</div>;
const Jobs = () => <div className="p-10">Jobs List (WIP)</div>;
const JobDetail = () => <div className="p-10">Job Detail (WIP)</div>;
const MyApplications = () => <div className="p-10">My Applications (WIP)</div>;
const Dashboard = () => <div className="p-10">Recruiter Dashboard (WIP)</div>;

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-slate-50 overflow-hidden">
            <Navbar />
            <main className="flex-1 flex items-center justify-center p-4 overflow-auto">
              <Routes>
                <Route path="/" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/mine" element={
                  <ProtectedRoute role="seeker">
                    <MyApplications />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute role="recruiter">
                    <Dashboard />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
