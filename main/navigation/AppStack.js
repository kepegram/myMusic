import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Library from '../screens/libraryTab/Library';
import RegisteredProfile from '../screens/profileTab/RegisteredProfile';
import MusicPlayer from '../screens/playerTab/MusicPlayer';
import Settings from '../screens/settingsTab/Settings';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Library"
        component={Library}
        options={{
          presentaion: 'modal',
          gestureEnabled: true,
          animationTypeForReplace: 'push',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen name="Profile" component={RegisteredProfile} />
      <Stack.Screen
        name="Music Player"
        component={MusicPlayer}
        options={{
          presentaion: 'modal',
          gestureEnabled: true,
          animationTypeForReplace: 'push',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default AppStack;
