import React from 'react';
import { User, Calendar } from 'lucide-react';

const Profile = ({ user }) => {
  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-textMain mb-8">Your Profile</h1>
      
      <div className="bg-surface border border-border p-8 rounded-xl shadow-lg">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center font-bold text-5xl text-white">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-textMain">{user.username}</h2>
            <div className="flex items-center gap-2 text-textMuted mt-2">
              <Calendar className="w-4 h-4" />
              <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-semibold text-textMain mb-4">Account Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background p-4 rounded-lg border border-border">
              <p className="text-sm text-textMuted mb-1">Username</p>
              <p className="font-medium text-textMain">{user.username}</p>
            </div>
            <div className="bg-background p-4 rounded-lg border border-border">
              <p className="text-sm text-textMuted mb-1">Account ID</p>
              <p className="font-medium text-textMain font-mono text-sm break-all">{user._id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
