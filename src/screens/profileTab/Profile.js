/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Appearance,
  Dimensions,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {profileUI} from '../../styles/Styles';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {dmProfileUI} from '../../styles/DarkMode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';

const Profile = () => {
  const {logout} = useContext(AuthContext);
  const navigation = useNavigation();
  const [name, setName] = useState('');

  const [theme, setTheme] = useState(Appearance.getColorScheme());

  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });

  const user = {
    avatar: require('../../../assets/default-imgs/default-pfp.png'),
    coverPhoto: require('../../../assets/default-imgs/default-cover-2.jpg'),
  };

  AsyncStorage.getItem('username').then(username => {
    setName(username);
  });

  return (
    <ScrollView
      style={theme === 'light' ? profileUI.container : dmProfileUI.container}>
      <Image source={user.coverPhoto} style={profileUI.coverPhoto} />
      <SafeAreaView style={profileUI.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Library')}>
          <Icon
            name="arrow-back"
            size={30}
            color={theme === 'light' ? 'black' : 'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingLeft: Dimensions.get('screen').width - 60,
            paddingTop: 2,
          }}
          onPress={() => navigation.navigate('Settings')}>
          <Icon
            name="settings"
            size={30}
            color={theme === 'light' ? 'black' : 'white'}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={profileUI.avatarContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Image source={user.avatar} style={profileUI.avatar} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={theme === 'light' ? profileUI.name : dmProfileUI.name}>
            @{name}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={profileUI.statsContainer}>
        <View style={profileUI.statContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={
                theme === 'light' ? profileUI.statCount : dmProfileUI.statCount
              }>
              0
            </Text>
          </TouchableOpacity>
          <Text style={profileUI.statLabel}>Total Songs</Text>
        </View>
        <View style={profileUI.statContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Text
              style={
                theme === 'light' ? profileUI.statCount : dmProfileUI.statCount
              }>
              0
            </Text>
          </TouchableOpacity>
          <Text style={profileUI.statLabel}>Hours{'\n'}Listened</Text>
        </View>
      </View>

      <View style={profileUI.section}>
        <View style={profileUI.sectionHeader}>
          <Text
            style={
              theme === 'light'
                ? profileUI.sectionTitle
                : dmProfileUI.sectionTitle
            }>
            Your Songs:
          </Text>
          <TouchableOpacity style={profileUI.seeAllButton} onPress={() => {}}>
            <Text style={profileUI.seeAllButtonText}>See All</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={profileUI.logOutContainer}>
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Logout', 'Are you sure you wish to logout?', [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'Logout',
                onPress: () => {
                  logout();
                },
              },
            ])
          }>
          <Text style={profileUI.logOutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
