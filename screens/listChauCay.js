import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../api';

const ProductListScreen = () => {
  const [chaucayData, setChaucayData] = useState([]); // Dữ liệu chậu cây từ API
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Lấy đối tượng navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/chaucay'); // Gọi API lấy danh sách chậu cây
        console.log('Dữ liệu chậu cây:', response.data);

        setChaucayData(response.data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem}>
      <Image source={{ uri: item.avatar }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}$</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Thanh tiêu đề */}
      <View style={styles.header}>
        {/* Nút Back */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Tiêu đề */}
        <Text style={styles.title}>Chậu cây trồng</Text>

        {/* Nút Giỏ hàng */}
        <TouchableOpacity onPress={() => console.log('Đi đến giỏ hàng')} style={styles.iconButton}>
          <Ionicons name="cart-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Kiểm tra xem đang tải dữ liệu không */}
      {loading ? (
        <ActivityIndicator size="large" color="green" style={styles.loader} />
      ) : (
        <FlatList
          data={chaucayData}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 10,
  },
  list: {
    paddingHorizontal: 10,
  },
  productItem: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    margin: 8,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
    marginTop: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    elevation: 3,
    paddingTop: 30,
  },
  iconButton: {
    padding: 10,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
