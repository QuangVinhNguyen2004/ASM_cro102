import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCayXanh } from '../redux/Slide/CayXanhSlide';

const ListCayXanh = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState('Tất cả'); // bộ lọc mặc định

  const cayxanhData = useSelector(state => state.cayxanh.data);
  const loading = useSelector(state => state.cayxanh.loading);
  const error = useSelector(state => state.cayxanh.error);

  useEffect(() => {
    dispatch(fetchCayXanh());
  }, [dispatch]);

  const filterData = () => {
    if (selectedSize === 'Tất cả') return cayxanhData;
    return cayxanhData.filter(item => item.kichco === selectedSize.toLowerCase());
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem}>
      <Image source={{ uri: item.avatar }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}$</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="green" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Lỗi: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Cây Trồng</Text>
        <TouchableOpacity onPress={() => navigation.navigate('GioHang')} style={styles.iconButton}>
          <Ionicons name="cart-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Bộ lọc kích cỡ */}
      <View style={styles.filterContainer}>
        {['Tất cả', 'Nhỏ', 'Vừa', 'Lớn'].map(size => (
          <TouchableOpacity
            key={size}
            onPress={() => setSelectedSize(size)}
            style={[
              styles.filterButton,
              selectedSize === size && styles.selectedFilterButton
            ]}
          >
            <Text
              style={[
                styles.filterText,
                selectedSize === size && styles.selectedFilterText
              ]}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={filterData()}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 10,
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 20,
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  filterButton: {
    backgroundColor: '#EEE',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedFilterButton: {
    backgroundColor: 'green',
  },
  filterText: {
    color: '#000',
    fontWeight: '500',
  },
  selectedFilterText: {
    color: '#FFF',
  },
});

export default ListCayXanh;
