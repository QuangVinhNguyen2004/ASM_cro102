import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>PROFILE</Text>
      
      <View style={styles.profileContainer}>
        <Image 
          source={{ uri: 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau-012.jpg' }} 
          style={styles.avatar} 
        />
        <View>
          <Text style={styles.name}>Nguyễn Quang Vinh</Text>
          <Text style={styles.email}>vinhnguyen@gmail.com</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chung</Text>
        <TouchableOpacity style={styles.option}><Text style={styles.optionText}>Chỉnh sửa thông tin</Text></TouchableOpacity>
        <TouchableOpacity style={styles.option}><Text style={styles.optionText}>Cẩm nang trồng cây</Text></TouchableOpacity>
        <TouchableOpacity style={styles.option}><Text style={styles.optionText}>Lịch sử giao dịch</Text></TouchableOpacity>
        <TouchableOpacity style={styles.option}><Text style={styles.optionText}>Q & A</Text></TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bảo mật và Điều khoản</Text>
        <TouchableOpacity style={styles.option}><Text style={styles.optionText}>Điều khoản và điều kiện</Text></TouchableOpacity>

      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('qlsp')}>
        <Text style={styles.logoutText}>Quản lý sản phẩm</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    color: 'gray',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 10,
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
  },
  logoutText: {
    color: 'red',
    fontSize: 16,
  },
});

export default ProfileScreen;
