import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      date: 'Thứ tư, 03/09/2021',
      message: 'Đặt hàng thành công',
      productName: 'Spider Plant',
      description: 'Ủa bông - 2 sản phẩm',
      image: 'https://via.placeholder.com/50',
    },
  ]);

  return (
    <View style={styles.container}>
      <Ionicons
        name="arrow-back"
        size={24}
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.header}>THÔNG BÁO</Text>
      {notifications.length === 0 ? (
        <Text style={styles.emptyMessage}>Hiện chưa có thông báo nào cho bạn</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.notificationCard}>
              <Text style={styles.dateText}>{item.date}</Text>
              <View style={styles.notificationContent}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View style={styles.textContainer}>
                  <Text style={styles.messageText}>{item.message}</Text>
                  <Text style={styles.productName}>{item.productName}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: 'gray',
  },
  notificationCard: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dateText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  textContainer: {
    marginLeft: 10,
  },
  messageText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  productName: {
    color: 'green',
    fontSize: 14,
  },
  description: {
    color: 'gray',
  },
});

export default NotificationScreen;
