/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {profileUI} from '../../Styles';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RegisteredProfile = () => {
  const {logout} = useContext(AuthContext);
  const navigation = useNavigation();
  const [name, setName] = useState('');

  const user = {
    avatar: require('../../../assets/default-imgs/default-pfp.png'),
    coverPhoto:
      'https://trusteid.mioa.gov.mk/wp-content/plugins/uix-page-builder/uixpb_templates/images/UixPageBuilderTmpl/default-cover-2.jpg',
  };

  return (
    <ScrollView style={profileUI.container}>
      <Image source={{uri: user.coverPhoto}} style={profileUI.coverPhoto} />
      <View style={profileUI.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Library')}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingLeft: 295, paddingTop: 2}}
          onPress={() => navigation.navigate('Settings')}>
          <Icon name="settings" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={profileUI.avatarContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Image source={user.avatar} style={profileUI.avatar} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={profileUI.name}>@{name}</Text>
        </TouchableOpacity>
      </View>

      <View style={profileUI.statsContainer}>
        <View style={profileUI.statContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={profileUI.statCount}>0</Text>
          </TouchableOpacity>
          <Text style={profileUI.statLabel}>total songs</Text>
        </View>
        <View style={profileUI.statContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={profileUI.statCount}>0</Text>
          </TouchableOpacity>
          <Text style={profileUI.statLabel}>hours{'\n'}listened</Text>
        </View>
      </View>

      <View style={profileUI.section}>
        <View style={profileUI.sectionHeader}>
          <Text style={profileUI.sectionTitle}>your songs:</Text>
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

export default RegisteredProfile;
