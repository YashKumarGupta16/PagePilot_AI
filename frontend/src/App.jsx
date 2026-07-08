import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import api from './api';

// Components
import AuthForm from './components/AuthForm';
import ProfileMenu from './components/ProfileMenu';

// Pages
import Builder from './pages/Builder';
import PreviousWork from './pages/PreviousWork';
import Profile from './pages/Profile';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await api.get('/me');
      setUser(res.data.user);
    } catch (error) {
      console.error('Auth check failed', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col font-sans">
        <nav className="border-b border-slate-700 bg-surface/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-primary p-2 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-textMain tracking-tight">PagePilot AI</span>
              </Link>
              
              {user && (
                <ProfileMenu user={user} onLogout={handleLogout} />
              )}
            </div>
          </div>
        </nav>

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {!user ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="text-center mb-10 max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 mb-4">
                  Welcome to PagePilot AI
                </h1>
                <p className="text-lg text-textMuted">
                  Generate beautiful, responsive webpages in seconds just by describing them. Sign up or log in to get started.
                </p>
              </div>
              <AuthForm onAuthSuccess={handleAuthSuccess} />
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Builder />} />
              <Route path="/previous-work" element={<PreviousWork />} />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;
