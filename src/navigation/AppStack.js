import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Library from '../screens/libraryTab/Library';
import Profile from '../screens/profileTab/Profile';
import Settings from '../screens/settingsTab/Settings';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Library" component={Library} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default AppStack;
