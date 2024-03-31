/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useMemo} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Appearance,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import BottomSheet from '@gorhom/bottom-sheet';
import {libraryUI} from '../../styles/Styles';
import {dmLibraryUI} from '../../styles/DarkMode';
import {musicPlayerUI} from '../../styles/Styles';
import {dmPlayerUI} from '../../styles/DarkMode';
import Songs from './Songs';
import Controller from '../playerTab/Controller';
import Slider from '@react-native-community/slider';
import VolumeSlider from '../playerTab/VolumeSlider';

const formatTime = secs => {
  let minutes = Math.floor(secs / 60);
  let seconds = Math.ceil(secs - minutes * 60);

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
};

const Library = () => {
  const navigation = useNavigation();
  const playbackState = usePlaybackState();
  const [searchQuery, setSearchQuery] = useState('');
  const [songIndex, setSongIndex] = useState(0);
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const {position, duration} = useProgress();
  const bottomSheetRef = useRef(BottomSheet);

  const handleChange = val => {
    TrackPlayer.seekTo(val);
  };

  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });

  const handleOpenPress = () => bottomSheetRef.current?.expand();

  const setUpPlayer = () => {
    TrackPlayer.reset();
    TrackPlayer.add(Songs);
    TrackPlayer.play();
    console.log('player is setup');
  };

  const playSong = song => {
    setUpPlayer();
    TrackPlayer.skip(song.id - 1);
    TrackPlayer.play();
    setSongIndex(song.id - 1);
    handleOpenPress();
  };

  const next = async () => {
    await TrackPlayer.skip(songIndex + 1);
    await TrackPlayer.play();
    console.log('-----CURRENT SONG INDEX-----', songIndex + 1);
    setSongIndex(songIndex + 1);
  };

  const previous = async () => {
    await TrackPlayer.skip(songIndex - 1);
    await TrackPlayer.play();
    console.log('-----CURRENT SONG INDEX-----', songIndex - 1);
    setSongIndex(songIndex - 1);
  };

  const snapPoints = useMemo(() => ['7%', '100%'], []);

  const searchFilter = item => {
    const query = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(query);
  };

  return (
    <SafeAreaView
      style={theme === 'light' ? libraryUI.container : dmLibraryUI.container}>
      <View style={libraryUI.headerContainer}>
        <Text style={theme === 'light' ? libraryUI.title : dmLibraryUI.title}>
          Library
        </Text>
        <TouchableOpacity
          style={{paddingRight: 10}}
          onPress={() => navigation.navigate('Profile')}>
          <ImageBackground
            source={require('../../../assets/default-imgs/default-pfp.png')}
            style={libraryUI.userAvatarSize}
            imageStyle={libraryUI.userAvatar}
          />
        </TouchableOpacity>
      </View>
      <View style={{paddingLeft: 10}}>
        <TextInput
          style={libraryUI.searchInput}
          placeholder="search for songs here..."
          placeholderTextColor="#A9A9A9"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <ScrollView style={libraryUI.card}>
        <View style={libraryUI.albumCoversContainer}>
          {Songs.filter(searchFilter).map((song, mapIndex) => {
            return (
              <View key={mapIndex}>
                <TouchableOpacity onPress={() => playSong(song)}>
                  <Image source={song.image} style={libraryUI.albumCovers} />
                </TouchableOpacity>
                <Text
                  style={
                    theme === 'light'
                      ? libraryUI.cardTitle
                      : dmLibraryUI.cardTitle
                  }>
                  {song.title}
                </Text>
                <Text style={libraryUI.cardArtistName}>{song.artist}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <BottomSheet
        index={-1}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        handleIndicatorStyle={
          theme === 'light'
            ? musicPlayerUI.handleIndicator
            : dmPlayerUI.handleIndicator
        }
        backgroundStyle={
          theme === 'light'
            ? musicPlayerUI.modalBackground
            : dmPlayerUI.modalBackground
        }>
        <View
          style={
            theme === 'light' ? musicPlayerUI.container : dmPlayerUI.container
          }>
          {playbackState === State.Playing ? (
            <Text
              color={
                theme === 'light'
                  ? musicPlayerUI.nowPlaying
                  : dmPlayerUI.nowPlaying
              }>
              {`Now playing: ${Songs[songIndex].title} by ${Songs[songIndex].artist}`}
            </Text>
          ) : null}
          <SafeAreaView style={{height: Dimensions.get('screen').height - 250}}>
            <View style={musicPlayerUI.imageContainer}>
              <Image
                style={musicPlayerUI.albumCover}
                source={Songs[songIndex].image}
              />
            </View>
          </SafeAreaView>
          <View>
            <Text
              style={
                theme === 'light'
                  ? musicPlayerUI.songTitle
                  : dmPlayerUI.songTitle
              }>
              {Songs[songIndex].title}
            </Text>
            <Text style={musicPlayerUI.songArtist}>
              {Songs[songIndex].artist}
            </Text>
          </View>
          <View>
            <Slider
              style={{width: 360, height: 40}}
              minimumValue={0}
              maximumValue={duration}
              value={position}
              minimumTrackTintColor="#C73EFF"
              maximumTrackTintColor="grey"
              thumbTintColor={theme === 'light' ? 'black' : 'white'}
              onSlidingComplete={handleChange}
              backgroundColor={theme === 'light' ? null : 'black'}
            />
            <View
              style={
                theme === 'light'
                  ? timerUI.timerContainer
                  : dmTimerUI.timerContainer
              }>
              <Text
                style={
                  theme === 'light' ? timerUI.timerText : dmTimerUI.timerText
                }>
                {formatTime(position)}
              </Text>
              <Text
                style={
                  theme === 'light' ? timerUI.timerText : dmTimerUI.timerText
                }>
                {formatTime(duration)}
              </Text>
            </View>
          </View>
          <Controller onNext={next} onPrevious={previous} />
          <VolumeSlider />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const timerUI = StyleSheet.create({
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timerText: {
    fontSize: 13,
    color: 'black',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const dmTimerUI = StyleSheet.create({
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
  timerText: {
    fontSize: 13,
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Library;
