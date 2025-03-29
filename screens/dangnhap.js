import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import CryptoJS from 'crypto-js';
import { useNavigation, useRoute } from '@react-navigation/native';

const dummyUsers = [
  {
    email: 'user@example.com',
    password: CryptoJS.SHA256('password123').toString(),
  },
  {
    email: 'admin@example.com',
    password: CryptoJS.SHA256('admin123').toString(),
  },
  {
    email: 'vinh@gmail.com',
    password: CryptoJS.SHA256('vinh123').toString(),
  },
];

const LoginScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const { email: initialEmail } = route.params || {}; 
  const [inputEmail, setInputEmail] = useState(initialEmail || '');
  const [inputPassword, setInputPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    setEmailError('');
    setPasswordError('');

    if (!validateEmail(inputEmail)) {
      setEmailError('Email không hợp lệ.');
      return;
    }

    if (inputPassword.length < 6) {
      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    const hashedPassword = CryptoJS.SHA256(inputPassword).toString();
    const user = dummyUsers.find((user) => user.email === inputEmail && user.password === hashedPassword);

    if (user) {
      navigation.navigate('Menu');
    } else {
      setPasswordError('Email hoặc mật khẩu không đúng.');
    }
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
          <Text style={styles.welcomeText}>Chào mừng bạn</Text>
          <Text style={styles.welcomeText1}>Đăng nhập tài khoản</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#888"
          value={inputEmail}
          onChangeText={setInputEmail}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={inputPassword}
          onChangeText={setInputPassword}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Don't have an account? <Text style={styles.link} onPress={() => navigation.navigate('Register')}>Click Register</Text>
        </Text>
        <Text style={styles.footerText}>
          Forget Password? <Text style={styles.link}>Click Reset</Text>
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
    color: '#1A1A1A',
    marginTop: 10,
  },
  welcomeText1: {
    fontSize: 20,
    color: '#1A1A1A',
    marginTop: 10,
  },
  input: {
    height: 50,
    borderColor: '#FFF',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#1A1A1A',
  },
  button: {
    backgroundColor: '#FF8C00',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  googleButton: {
    backgroundColor: '#FFF',
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

export default LoginScreen;
