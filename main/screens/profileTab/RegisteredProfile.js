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

const RegisteredProfile = () => {
  const {logout} = useContext(AuthContext);
  const navigation = useNavigation();
  const [name, setName] = useState('');

  const user = {
    avatar: 'https://i.stack.imgur.com/l60Hf.png',
    coverPhoto:
      'https://trusteid.mioa.gov.mk/wp-content/plugins/uix-page-builder/uixpb_templates/images/UixPageBuilderTmpl/default-cover-2.jpg',
  };

  return (
    <ScrollView style={profileUI.container}>
      <Image source={{uri: user.coverPhoto}} style={profileUI.coverPhoto} />
      <View style={profileUI.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Library')} />
        <TouchableOpacity
          style={{paddingLeft: 285, paddingTop: 2}}
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
      <View style={profileUI.avatarContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Image source={{uri: user.avatar}} style={profileUI.avatar} />
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
          <Text style={profileUI.statLabel}>Total Songs</Text>
        </View>
        <View style={profileUI.statContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={profileUI.statCount}>0</Text>
          </TouchableOpacity>
          <Text style={profileUI.statLabel}>Hours{'\n'}Listened</Text>
        </View>
      </View>

      <View style={profileUI.section}>
        <View style={profileUI.sectionHeader}>
          <Text style={profileUI.sectionTitle}>Your Songs:</Text>
          <TouchableOpacity style={profileUI.seeAllButton} onPress={() => {}}>
            <Text style={profileUI.seeAllButtonText}>See all</Text>
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

export default RegisteredProfile;
