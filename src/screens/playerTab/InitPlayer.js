import {useEffect} from 'react';
import TrackPlayer from 'react-native-track-player';

export const useInitPlayer = () => {
  useEffect(() => {
    TrackPlayer.setupPlayer();

    return () => {
      TrackPlayer.reset();
    };
  }, []);
};
