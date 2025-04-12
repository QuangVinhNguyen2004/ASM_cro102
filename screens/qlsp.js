import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput, StyleSheet, Modal, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../api'; // Đảm bảo api này đã được cấu hình đúng

const ProductManagementScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [avatar, setAvatar] = useState('');
  const [kichco, setKichco] = useState('');
  const [xuatxu, setXuatxu] = useState('');
  const [tinhtrang, setTinhtrang] = useState('');
  const [editingProductId, setEditingProductId] = useState(null); // Để xác định sản phẩm đang sửa
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị modal

  useEffect(() => {
    fetchProducts(); // Lấy danh sách sản phẩm khi lần đầu render
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/cayxanh'); // Lấy danh sách cây trồng từ API
      setProducts(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await api.delete(`/cayxanh/${productId}`); // Xóa sản phẩm qua API
      Alert.alert('Thành công', 'Sản phẩm đã bị xóa.');
      fetchProducts(); // Tải lại dữ liệu sau khi xóa
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể xóa sản phẩm. Vui lòng thử lại.');
    }
  };

  const handleEdit = (product) => {
    setName(product.name);
    setPrice(product.price);
    setAvatar(product.avatar);
    setKichco(product.kichco);
    setXuatxu(product.xuatxu);
    setTinhtrang(product.tinhtrang);
    setEditingProductId(product.id);
    setIsModalVisible(true); // Mở modal khi chỉnh sửa sản phẩm
  };

  const handleAddProduct = async () => {
    if (!name || !price || !avatar || !kichco || !xuatxu || !tinhtrang) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    const newProduct = { name, price, avatar, kichco, xuatxu, tinhtrang };

    try {
      await api.post('/cayxanh', newProduct); // Thêm sản phẩm mới qua API
      Alert.alert('Thành công', 'Thêm sản phẩm thành công.');
      fetchProducts(); // Tải lại dữ liệu sau khi thêm sản phẩm
      setIsModalVisible(false); // Đóng modal sau khi thêm thành công
    } catch (error) {
      Alert.alert('Lỗi', 'Đã có lỗi xảy ra. Vui lòng thử lại.');
    }

    // Reset form
    setName('');
    setPrice('');
    setAvatar('');
    setKichco('');
    setXuatxu('');
    setTinhtrang('');
  };

  const handleEditProduct = async () => {
    if (!name || !price || !avatar || !kichco || !xuatxu || !tinhtrang) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    const updatedProduct = { name, price, avatar, kichco, xuatxu, tinhtrang };

    try {
      await api.put(`/cayxanh/${editingProductId}`, updatedProduct); // Cập nhật sản phẩm qua API
      Alert.alert('Thành công', 'Cập nhật sản phẩm thành công.');
      fetchProducts(); // Tải lại dữ liệu sau khi sửa sản phẩm
      setIsModalVisible(false); // Đóng modal sau khi sửa thành công
    } catch (error) {
      Alert.alert('Lỗi', 'Đã có lỗi xảy ra. Vui lòng thử lại.');
    }

    // Reset form
    setName('');
    setPrice('');
    setAvatar('');
    setKichco('');
    setXuatxu('');
    setTinhtrang('');
    setEditingProductId(null);
  };

  if (loading) {
    return <Text>Đang tải dữ liệu...</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)} // Mở modal thêm sản phẩm
      >
        <Ionicons name="add-circle" size={40} color="#FF8C00" />
        <Text style={styles.addButtonText}>Thêm sản phẩm</Text>
      </TouchableOpacity>

      {/* Modal thêm/sửa sản phẩm */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.input}
              placeholder="Tên sản phẩm"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Giá"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
            <TextInput
              style={styles.input}
              placeholder="URL ảnh"
              value={avatar}
              onChangeText={setAvatar}
            />
            <TextInput
              style={styles.input}
              placeholder="Kích cỡ"
              value={kichco}
              onChangeText={setKichco}
            />
            <TextInput
              style={styles.input}
              placeholder="Xuất xứ"
              value={xuatxu}
              onChangeText={setXuatxu}
            />
            <TextInput
              style={styles.input}
              placeholder="Tình trạng"
              value={tinhtrang}
              onChangeText={setTinhtrang}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={editingProductId ? handleEditProduct : handleAddProduct} // Gọi hàm thích hợp
            >
              <Text style={styles.buttonText}>
                {editingProductId ? 'Lưu thay đổi' : 'Thêm sản phẩm'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#F44336' }]}
              onPress={() => setIsModalVisible(false)} // Đóng modal
            >
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.avatar }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}$</Text>
              <Text style={styles.productDetails}>Kích cỡ: {item.kichco}</Text>
              <Text style={styles.productDetails}>Xuất xứ: {item.xuatxu}</Text>
              <Text style={styles.productDetails}>Tình trạng: {item.tinhtrang}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEdit(item)} // Mở modal để sửa sản phẩm
              >
                <Ionicons name="pencil" size={20} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)} // Xóa sản phẩm
              >
                <Ionicons name="trash" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Các kiểu dáng vẫn giữ nguyên như trước
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#FF8C00',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF8C00',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#FF8C00',
    marginVertical: 5,
  },
  productDetails: {
    fontSize: 14,
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
  },
});

export default ProductManagementScreen;
