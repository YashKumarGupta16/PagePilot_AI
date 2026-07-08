import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, History, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const ProfileMenu = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/logout');
      onLogout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-surface hover:bg-slate-700 border border-slate-600 rounded-full px-4 py-2 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-white">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <span className="font-medium text-textMain">{user.username}</span>
        <ChevronDown className={`w-4 h-4 text-textMuted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-surface border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50">
          <div className="p-4 border-b border-slate-700">
            <p className="font-medium text-textMain">{user.username}</p>
            <p className="text-xs text-textMuted mt-1">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="py-2">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-textMain hover:bg-slate-700 transition-colors"
            >
              <User className="w-4 h-4 text-textMuted" />
              Your Profile
            </Link>
            <Link
              to="/previous-work"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm text-textMain hover:bg-slate-700 transition-colors"
            >
              <History className="w-4 h-4 text-textMuted" />
              Previous Work you did..
            </Link>
          </div>
          <div className="border-t border-slate-700 py-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors w-full text-left"
            >
              <LogOut className="w-4 h-4" />
              Logout this session
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
