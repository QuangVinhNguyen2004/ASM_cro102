import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartScreen = () => {
  // Danh sách sản phẩm trong giỏ hàng
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Spider Plant', price: 250000, quantity: 2, image: 'https://via.placeholder.com/80' },
  ]);

  // Xóa sản phẩm khỏi giỏ hàng
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Tính tổng tiền
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Render mỗi sản phẩm trong giỏ hàng
  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      {/* Checkbox */}
      <TouchableOpacity style={styles.checkbox}>
        <Ionicons name="checkmark" size={20} color="black" />
      </TouchableOpacity>

      {/* Hình ảnh sản phẩm */}
      <Image source={{ uri: item.image }} style={styles.productImage} />

      {/* Thông tin sản phẩm */}
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name} | Ưa bóng</Text>
        <Text style={styles.productPrice}>{item.price.toLocaleString()}đ</Text>
      </View>

      {/* Số lượng sản phẩm */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity>
          <Ionicons name="remove-circle-outline" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity>
          <Ionicons name="add-circle-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Nút xóa */}
      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Text style={styles.deleteText}>Xoá</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Tiêu đề */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>GIỎ HÀNG</Text>
        <TouchableOpacity>
          <Ionicons name="trash-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      {/* Tổng tiền & nút thanh toán */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Tạm tính</Text>
        <Text style={styles.totalPrice}>{totalPrice.toLocaleString()}đ</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Tiến hành thanh toán</Text>
        <Ionicons name="chevron-forward" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#DDD',
  },
  totalText: {
    fontSize: 16,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  checkoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
});
