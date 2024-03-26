import React from 'react';
import {AuthProvider} from './main/context/AuthContext.js';
import AppNav from './main/navigation/AppNav.js';
import {useInitPlayer} from './main/screens/playerTab/InitPlayer.js';

export default function App() {
  useInitPlayer();
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
