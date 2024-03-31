import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer from 'react-native-track-player';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const login = () => {
    setIsLoading(true);
    setUserToken('afwe');
    AsyncStorage.setItem('userToken', 'afwe');
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
    TrackPlayer.pause();
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let UserToken = await AsyncStorage.getItem('userToken');
      setUserToken(UserToken);
      setIsLoading(false);
    } catch (e) {
      console.log('isLogged in error ', e);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{isLoading, userToken, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
