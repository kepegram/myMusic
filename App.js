import React from 'react';
import {AuthProvider} from './src/context/AuthContext.js';
import AppNav from './src/navigation/AppNav.js';
import {useInitPlayer} from './src/screens/playerTab/InitPlayer.js';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  useInitPlayer();
  return (
    <AuthProvider>
      <GestureHandlerRootView>
        <AppNav />
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
