import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Appearance,
} from 'react-native';
import {libraryUI} from '../../styles/Styles';
import {useNavigation} from '@react-navigation/native';
import Songs from './Songs';
import {dmLibraryUI} from '../../styles/DarkMode';
import TrackPlayer, {Event, State} from 'react-native-track-player';

const Library = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [songIndex, setSongIndex] = useState(0);
  const isPlayerReady = useRef(false);
  const index = useRef(0);
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });

  useEffect(() => {
    if (!isPlayerReady.current) {
      TrackPlayer.setupPlayer().then(async () => {
        await TrackPlayer.reset();
        await TrackPlayer.add(Songs);
        //TrackPlayer.play();
        console.log('player is setup');
        isPlayerReady.current === true;
      });
    } else {
      console.log('player is already setup');
    }
    return () => {
      TrackPlayer.reset();
    };
  }, []);

  // useEffect(() => {
  //   if (isPlayerReady.current) {
  //     TrackPlayer.skip(Songs[songIndex].id);
  //   }
  //   index.current = songIndex;
  // }, [songIndex]);

  TrackPlayer.addEventListener(Event.PlaybackTrackChanged, e => {
    console.log(e);
  });

  // const searchFilter = () => {
  //   const query = searchQuery.toLowerCase();
  //   return Songs.title.toLowerCase().includes(query);
  // };

  const playSong = song => {
    //TrackPlayer.reset();
    console.log(song.id++);
    TrackPlayer.skip(song.id++ - 2);
    TrackPlayer.play();
    navigation.navigate('Music Player');
  };

  return (
    <SafeAreaView
      style={theme === 'light' ? libraryUI.container : dmLibraryUI.container}>
      <View style={libraryUI.headerContainer}>
        <Text style={theme === 'light' ? libraryUI.title : dmLibraryUI.title}>
          library
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <ImageBackground
            source={require('../../../assets/default-imgs/default-pfp.png')}
            style={libraryUI.userAvatarSize}
            imageStyle={libraryUI.userAvatar}
          />
        </TouchableOpacity>
      </View>
      <TextInput
        style={libraryUI.searchInput}
        placeholder="search for songs here..."
        placeholderTextColor="#A9A9A9"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView style={libraryUI.card}>
        <View style={libraryUI.albumCoversContainer}>
          {Songs.map(song => {
            return (
              <View>
                <TouchableOpacity onPress={() => playSong(song)}>
                  <Image
                    source={song.image}
                    style={libraryUI.albumCovers}
                    key={song.id.toString()}
                  />
                </TouchableOpacity>
                <Text style={libraryUI.cardTitle}>{song.title}</Text>
                <Text style={libraryUI.cardArtistName}>{song.artist}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Library;
