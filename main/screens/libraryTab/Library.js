import React, {useState, useEffect, useRef} from 'react';
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
  Modal,
} from 'react-native';
import {libraryUI, modalUI} from '../../styles/Styles';
import {useNavigation} from '@react-navigation/native';
import Songs from './Songs';
import {dmLibraryUI} from '../../styles/DarkMode';
import TrackPlayer, {
  Event,
  State,
  usePlaybackState,
} from 'react-native-track-player';
import ModalController from './ModalController';

const Library = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [songIndex, setSongIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const isPlayerReady = useRef(false);
  const playbackState = usePlaybackState();
  const index = useRef(0);
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });

  // useEffect(() => {
  //   if (!isPlayerReady.current) {
  //     TrackPlayer.setupPlayer().then(async () => {
  //       await TrackPlayer.reset();
  //       await TrackPlayer.add(Songs);
  //       //TrackPlayer.play();
  //       console.log('player is setup');
  //       isPlayerReady.current === true;
  //     });
  //   } else {
  //     console.log('player is already setup');
  //   }
  //   return () => {
  //     TrackPlayer.reset();
  //   };
  // }, []);

  useEffect(() => {
    if (playbackState === State.Playing) {
      setModalVisible(true);
    }
  }, [modalVisible, playbackState]);

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
    toggleModal();
    setSongIndex(song.id++ - 3);
  };

  const toggleModal = () => {
    if (playbackState === State.Playing) {
      setModalVisible(true);
    }
    // } else {
    //   setModalVisible(!modalVisible);
    // }
  };

  const next = async () => {
    await TrackPlayer.skip(index.current + 1);
    await TrackPlayer.play();
  };

  TrackPlayer.addEventListener(Event.PlaybackTrackChanged, e => {
    console.log(e);
  });

  const searchFilter = item => {
    const query = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(query);
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        presentationStyle="overFullScreen">
        <View style={modalUI.centeredView}>
          <View
            style={theme === 'light' ? modalUI.modalView : modalUI.dmModalView}>
            <ModalController onNext={next} />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Music Player');
              //setModalVisible(false);
            }}>
            <Image style={modalUI.modalImage} source={Songs[songIndex].image} />
          </TouchableOpacity>
          <Text
            style={theme === 'light' ? modalUI.modalText : modalUI.dmModalText}>
            {Songs[songIndex].title}
          </Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Library;
