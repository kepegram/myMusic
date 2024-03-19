/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {createAccountUI} from '../../Styles';
import {AuthContext} from '../../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CreateAccount = () => {
  const navigation = useNavigation();
  const {login} = useContext(AuthContext);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (name.length === 0 || username.length === 0 || password.length === 0) {
      Alert.alert('Please fill out information completely');
    } else {
      login();
    }
  };

  return (
    <View style={createAccountUI.container}>
      <View style={createAccountUI.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Welcome Screen')}>
          <Icon
            style={{paddingBottom: 100, paddingRight: 320}}
            color={'black'}
            name={'arrow-back'}
            size={35}
          />
        </TouchableOpacity>
      </View>
      <View style={createAccountUI.form}>
        <Text style={createAccountUI.label}>name</Text>
        <TextInput
          style={createAccountUI.input}
          placeholder="enter your name"
          placeholderTextColor={'#CBCBCB'}
          value={name}
          onChangeText={setName}
          secureTextEntry={false}
        />
        <Text style={createAccountUI.label}>username</Text>
        <TextInput
          style={createAccountUI.input}
          placeholder="enter a username"
          placeholderTextColor={'#CBCBCB'}
          value={username}
          onChangeText={setUsername}
          secureTextEntry={false}
        />
        <Text style={createAccountUI.label}>password</Text>
        <TextInput
          style={createAccountUI.input}
          placeholder="enter a password"
          placeholderTextColor={'#CBCBCB'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity style={createAccountUI.button} onPress={handleSubmit}>
          <Text style={createAccountUI.buttonText}>create account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateAccount;
