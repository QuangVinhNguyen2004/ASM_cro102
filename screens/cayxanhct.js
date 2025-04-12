import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/Slide/CartSlide';

const CayTrongChiTietScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    Alert.alert('Thêm vào giỏ hàng', `${product.name} đã được thêm vào giỏ hàng.`);
    navigation.navigate('GioHang');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{product.name}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('GioHang')}>
          <Ionicons name="cart-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: product.avatar }} style={styles.productImage} />

      <View style={styles.productDetails}>
        <Text style={styles.price}>{product.price.toLocaleString()}đ</Text>
        <Text style={styles.sectionTitle}>Chi tiết sản phẩm</Text>
        <Text>Kích cỡ: {product.kichco}</Text>
        <Text>Xuất xứ: {product.xuatxu}</Text>
        <Text>Tình trạng: {product.tinhtrang}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decreaseQuantity}>
            <Ionicons name="remove-circle-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={increaseQuantity}>
            <Ionicons name="add-circle-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.totalContainer}>
          <Text>Tạm tính</Text>
          <Text style={styles.totalPrice}>{totalPrice.toLocaleString()}đ</Text>
        </View>

        <TouchableOpacity style={styles.buyButton} onPress={handleAddToCart}>
          <Text style={styles.buyButtonText}>CHỌN MUA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CayTrongChiTietScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#FFF', elevation: 3, paddingTop: 30 },
  title: { fontSize: 18, fontWeight: 'bold' },
  productImage: { width: '100%', height: 250, resizeMode: 'contain' },
  productDetails: { padding: 15 },
  price: { fontSize: 22, fontWeight: 'bold', color: 'green' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 15 },
  quantity: { marginHorizontal: 10, fontSize: 16 },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  totalPrice: { fontSize: 16, fontWeight: 'bold' },
  buyButton: { backgroundColor: 'green', paddingVertical: 15, borderRadius: 10, alignItems: 'center' },
  buyButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
