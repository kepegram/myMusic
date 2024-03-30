import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/userCreation/WelcomeScreen';
import CreateAccount from '../screens/userCreation/CreateAccountScreen';
import LoginScreen from '../screens/userCreation/LoginScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome Screen" component={WelcomeScreen} />
      <Stack.Screen name="Create Account" component={CreateAccount} />
      <Stack.Screen name="Login Screen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
