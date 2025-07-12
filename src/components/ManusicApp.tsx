'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';
import MusicPlayer from '@/components/MusicPlayer';
import { sampleTracks } from '@/data/sampleTracks';

const ManusicApp: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900">
        <div className="text-center text-lg font-semibold text-muted-foreground">
          Loading authentication...
        </div>
      </div>
    );
  }

  return isAuthenticated() ? (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Manusic
          </h1>
          <p className="text-muted-foreground">Your Modern Music Player</p>
        </div>
        
        <MusicPlayer playlist={sampleTracks} />
        
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>Production Version - Secure Authentication Enabled</p>
        </div>
      </div>
    </div>
  ) : (
    <LoginForm />
  );
};

export default ManusicApp;

