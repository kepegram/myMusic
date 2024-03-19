import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {libraryUI} from '../../Styles';
import {useNavigation} from '@react-navigation/native';
import Songs from './Songs';

const Library = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const renderAppointmentCard = ({item}) => (
    <TouchableOpacity onPress={() => navigation.navigate('Music Player')}>
      <SafeAreaView style={libraryUI.card}>
        <View style={libraryUI.cardContent}>
          <View style={libraryUI.albumCoversContainer}>
            <Image source={item.image} style={libraryUI.albumCovers} />
          </View>
        </View>
        <Text style={libraryUI.cardTitle}>{item.title}</Text>
        <View style={libraryUI.cardArtists}>
          <Text style={libraryUI.cardArtistName}>{item.artist}</Text>
        </View>
      </SafeAreaView>
    </TouchableOpacity>
  );

  const searchFilter = item => {
    const query = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(query);
  };

  return (
    <SafeAreaView style={libraryUI.container}>
      <View style={libraryUI.headerContainer}>
        <Text style={libraryUI.title}>library</Text>
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
      <FlatList
        contentContainerStyle={libraryUI.listContainer}
        data={Songs.filter(searchFilter)}
        renderItem={renderAppointmentCard}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default Library;
