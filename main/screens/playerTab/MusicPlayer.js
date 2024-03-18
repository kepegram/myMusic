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
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Songs from '../libraryTab/Songs';
import {musicPlayerUI} from '../../Styles';
import Controller from './Controller';

const {width} = Dimensions.get('window');

const MusicPlayer = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [songIndex, setSongIndex] = useState(0);
  const slider = useRef(null);

  useEffect(() => {
    scrollX.addListener(({value}) => {
      const index = Math.round(value / width);
      setSongIndex(index);
    });
    return () => {
      scrollX.removeAllListeners();
    };
  }, []);

  const next = () => {
    slider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };

  const previous = () => {
    slider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
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
      <SafeAreaView style={{height: 470}}>
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
      <Controller onNext={next} onPrevious={previous} />
    </View>
  );
};

export default MusicPlayer;
