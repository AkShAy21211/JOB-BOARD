import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Placeholder components - we will create these in the next phase
const Navbar = () => <nav className="p-4 bg-white shadow flex justify-between">
  <div className="font-bold text-xl text-primary-600">JobPortal</div>
  <div className="space-x-4">
    <a href="/" className="hover:text-primary-500">Jobs</a>
    <a href="/login" className="hover:text-primary-500">Login</a>
  </div>
</nav>;
const Login = () => <div className="p-10">Login Page (WIP)</div>;
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
          <Navbar />
          <main className="min-h-screen bg-slate-50">
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
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
