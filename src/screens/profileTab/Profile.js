/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Appearance,
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
          style={{paddingLeft: 295, paddingTop: 2}}
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
          <Text style={profileUI.statLabel}>total songs</Text>
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
          <Text style={profileUI.statLabel}>hours{'\n'}listened</Text>
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
            your songs:
          </Text>
          <TouchableOpacity style={profileUI.seeAllButton} onPress={() => {}}>
            <Text style={profileUI.seeAllButtonText}>see all</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={profileUI.logOutContainer}>
        <TouchableOpacity
          onPress={() =>
            Alert.alert('logout', 'are you sure you wish to logout?', [
              {
                text: 'cancel',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'logout',
                onPress: () => {
                  logout();
                },
              },
            ])
          }>
          <Text style={profileUI.logOutText}>logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
