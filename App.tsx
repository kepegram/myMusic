import React from 'react';
import {AuthProvider} from './main/context/AuthContext.js';
import AppNav from './main/navigation/AppNav.js';

export default function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
