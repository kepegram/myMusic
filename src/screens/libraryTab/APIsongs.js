/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';
import TrackPlayer from 'react-native-track-player';

const APIsongs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(
        'https://itunes.apple.com/search?term=akon&entity=song',
      );
      setSongs(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  // useEffect(() => {
  //   TrackPlayer.reset();
  //   TrackPlayer.add(songs);
  //   //TrackPlayer.play();
  //   console.log('player is setup');
  // }, [songs]);

  const playSong = song => {
    TrackPlayer.reset();
    TrackPlayer.add(song);
    TrackPlayer.play(song);
    console.log('Playing song:', song);
  };

  const renderSong = ({item}) => (
    <TouchableOpacity onPress={() => playSong(item.previewUrl)}>
      <View style={{padding: 10}}>
        <Image
          source={{uri: item.artworkUrl100}}
          style={{width: 100, height: 100}}
        />
        <Text>{item.trackName}</Text>
        <Text>{item.artistName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20, marginBottom: 20}}>Songs</Text>
      <FlatList
        numColumns={2}
        data={songs}
        renderItem={renderSong}
        keyExtractor={item => item.trackId.toString()}
      />
    </View>
  );
};

export default APIsongs;
