/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Songs from '../libraryTab/Songs';
import {musicPlayerUI} from '../../Styles';
import Controller from './Controller';
import TrackPlayer, {Event} from 'react-native-track-player';
import SliderComp from './SliderComp';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const MusicPlayer = () => {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(0);
  const isPlayerReady = useRef(false);
  const slider = useRef(null);
  const index = useRef(0);

  useEffect(() => {
    scrollX.addListener(({value}) => {
      const val = Math.round(value / width);
      setSongIndex(val);
    });

    TrackPlayer.addEventListener(Event.PlaybackTrackChanged, e => {
      console.log(e);
    });

    TrackPlayer.setupPlayer().then(async () => {
      await TrackPlayer.reset();
      await TrackPlayer.add(Songs);
      TrackPlayer.play();
      isPlayerReady.current === true;
    });

    return () => {
      scrollX.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (isPlayerReady.current) {
      TrackPlayer.skip(Songs[songIndex].id);
    }
    index.current = songIndex;
  }, [songIndex]);

  const next = async () => {
    slider.current.scrollToOffset({
      offset: (index.current + 1) * width,
    });
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

  const renderItem = ({item}) => {
    return (
      <View style={musicPlayerUI.imageContainer}>
        <Image style={musicPlayerUI.albumCover} source={item.image} />
      </View>
    );
  };

  return (
    <View style={musicPlayerUI.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Library')}>
        <Icon style={{paddingTop: 5, paddingRight: 320}} color={'black'} name={'arrow-back'} size={35} />
      </TouchableOpacity>
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
        <Text style={musicPlayerUI.songTitle}>{Songs[songIndex].title}</Text>
        <Text style={musicPlayerUI.songArtist}>{Songs[songIndex].artist}</Text>
      </View>
      <SliderComp />
      <Controller onNext={next} onPrevious={previous} />
    </View>
  );
};

export default MusicPlayer;
