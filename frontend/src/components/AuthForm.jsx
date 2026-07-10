import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import api from '../api';

const AuthForm = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/login' : '/signup';
      const res = await api.post(endpoint, { username, password });
      onAuthSuccess(res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-surface p-8 rounded-xl shadow-lg border border-border">
      <h2 className="text-2xl font-bold mb-6 text-center text-textMain">
        {isLogin ? 'Hi..Welcome Back' : 'Please, Create an Account'}
      </h2>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-textMuted mb-1">Username</label>
          <input
            type="text"
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-textMain focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-textMuted mb-1">Password</label>
          <input
            type="password"
            className="w-full bg-background border border-border rounded-lg px-4 py-2 text-textMain focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primaryHover text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? 'Login' : 'Sign Up')}
        </button>
      </form>
      
      <p className="mt-6 text-center text-sm text-textMuted">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-primary hover:underline font-medium"
        >
          {isLogin ? 'Sign up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
