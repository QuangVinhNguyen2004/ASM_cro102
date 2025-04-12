import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../api'; // Đảm bảo api này đang dùng đúng cấu hình của bạn

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cayxanhData, setCayXanhData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation(); // Lấy đối tượng navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/cayxanh');
        setCayXanhData(response.data);
      } catch (error) {
        setError('Lỗi khi lấy dữ liệu cây trồng');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Lọc cây trồng theo từ khóa
  const filteredPlants = cayxanhData.filter(plant =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.avatar }} style={styles.image} />
      <Text style={styles.coffeeName}>{item.name}</Text>
      <Text style={styles.coffeePrice}>{item.price}$</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CayTrongChiTiet', { product: item })}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#FF8C00" style={styles.loader} />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm cây trồng..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Danh sách cây trồng */}
      <FlatList
        data={filteredPlants}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>Không có cây trồng nào.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  card: {
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    flexDirection: 'row', // Căn chỉnh các phần tử trong card theo dòng
    alignItems: 'center', // Căn giữa các phần tử trong card
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 55,
    marginRight: 15,
  },
  coffeeName: {
    color: '#1A1A1A',
    marginVertical: 5,
    fontSize: 16,
    flex: 1,
  },
  coffeePrice: {
    color: '#FF8C00',
    marginBottom: 5,
    fontSize: 16,
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#FF8C00',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  buttonText: {
    color: '#1A1A1A',
    fontSize: 14,
  },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#999' },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default SearchScreen;
