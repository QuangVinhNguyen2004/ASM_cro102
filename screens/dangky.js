import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import CryptoJS from 'crypto-js';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const toLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (password !== confirmPassword) {
      setConfirmPasswordError('Mật khẩu không khớp.');
      return;
    }

    if (password.length < 6) {
      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    navigation.navigate('Login', { name, email, password: CryptoJS.SHA256(password).toString() });
  };

  return (
    <ImageBackground source={require('../hinhanh/caynen1.png')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../hinhanh/cay.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.welcomeText}>Đăng ký</Text>
          <Text style={styles.registerText}>Tạo tài khoản</Text>
        </View>

        

        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Re-type password"
          placeholderTextColor="#888"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          You have an account? <Text onPress={toLogin} style={styles.link}>Click Sign in</Text>
        </Text>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 50,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
  },
  welcomeText: {
    fontSize: 30,
    color: '#FFF',
    marginTop: 10,
  },
  registerText: {
    fontSize: 20,
    color: '#FFF',
    marginTop: 10,
  },
  input: {
    height: 50,
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#FFF',
  },
  button: {
    backgroundColor: '#FF8C00',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#1A1A1A',
    fontSize: 16,
  },
  footerText: {
    color: '#FFF',
    textAlign: 'center',
  },
  link: {
    color: '#FF8C00',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default RegisterScreen;
