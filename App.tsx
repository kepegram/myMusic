import React from 'react';
import {AuthProvider} from './main/context/AuthContext.js';
import AppNav from './main/navigation/AppNav.js';
import {useInitPlayer} from './main/screens/playerTab/InitPlayer.js';
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
