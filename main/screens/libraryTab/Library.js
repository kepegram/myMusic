/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef, useMemo} from 'react';
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
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TrackPlayer, {
  Event,
  State,
  usePlaybackState,
} from 'react-native-track-player';
import BottomSheet from '@gorhom/bottom-sheet';
import {libraryUI} from '../../styles/Styles';
import {dmLibraryUI} from '../../styles/DarkMode';
import {musicPlayerUI} from '../../styles/Styles';
import {dmPlayerUI} from '../../styles/DarkMode';
import Songs from './Songs';
import SliderComp from '../playerTab/SliderComp';
import Controller from '../playerTab/Controller';

const {width} = Dimensions.get('window');

const Library = () => {
  const navigation = useNavigation();
  const playbackState = usePlaybackState();
  const [searchQuery, setSearchQuery] = useState('');
  const [songIndex, setSongIndex] = useState(0);
  const isPlayerReady = useRef(false);
  const index = useRef(0);
  const slider = useRef(null);
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const scrollX = useRef(new Animated.Value(0)).current;

  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });

  useEffect(() => {
    if (isPlayerReady.current) {
      TrackPlayer.skip(Songs[songIndex].id);
    }
    index.current = songIndex;
  }, [songIndex]);

  const setUpPlayer = () => {
    TrackPlayer.reset();
    TrackPlayer.add(Songs);
    TrackPlayer.play();
    console.log('player is setup');
    isPlayerReady.current === true;
  };

  const playSong = song => {
    setUpPlayer();
    console.log('-----CURRENT SONG ID-----', song.id++);
    TrackPlayer.skip(song.id++ - 2);
    TrackPlayer.play();
    setSongIndex(song.id++ - 3);
  };

  const renderItem = () => {
    return (
      <View style={musicPlayerUI.imageContainer}>
        <Image
          style={musicPlayerUI.albumCover}
          source={Songs[songIndex].image}
        />
      </View>
    );
  };

  const next = async () => {
    await TrackPlayer.skip(index.current + 1);
    await TrackPlayer.play();
  };

  const previous = async () => {
    slider.current.scrollToOffset({
      offset: (index.current - 1) * width,
    });
    await TrackPlayer.skip(index.current - 1);
    await TrackPlayer.play();
  };

  const snapPoints = useMemo(() => ['7%', '100%'], []);

  const searchFilter = item => {
    const query = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(query);
  };

  TrackPlayer.addEventListener(Event.PlaybackTrackChanged, e => {
    console.log(e);
  });

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
          {Songs.filter(searchFilter).map(song => {
            return (
              <View key={song.id}>
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
      <BottomSheet snapPoints={snapPoints}>
        <View
          style={
            theme === 'light' ? musicPlayerUI.container : dmPlayerUI.container
          }>
          {playbackState === State.Playing ? (
            <Text>
              {`Now playing: ${Songs[songIndex].title} by ${Songs[songIndex].artist}`}
            </Text>
          ) : null}
          <SafeAreaView style={{height: 410}}>
            <FlatList
              data={Songs}
              ref={slider}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: false},
              )}
            />
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
          <SliderComp />
          <Controller onNext={next} onPrevious={previous} />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Library;
