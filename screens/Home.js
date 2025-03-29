import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import api from '../api';
import { api1 } from '../api1';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [cayxanhData, setcayxanhData] = useState([]);
  const [chaucayData, setchaucayData] = useState([]);
  const [dungcuData, setdungcuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Lấy đối tượng navigation
  useEffect(() => {
    console.log('API instance:', api);
    const fetchData = async () => {
        try {
          const cayxanh = await api.get('/cayxanh');
          const chaucay = await api.get('/chaucay');
          const dungcu = await api1.fetchDungCu();
          console.log('Dữ liệu cây xanh:', cayxanh.data);
          console.log('Dữ liệu chậu cây:', chaucay.data);
          console.log('Dữ liệu dụng cụ:', dungcu.data);
      
          setcayxanhData(cayxanh.data);
          setchaucayData(chaucay.data);
          setdungcuData(dungcu || []);
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu:", error);
        } finally {
          setLoading(false);
        }
      };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF8C00" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.header}>
              
        <Text style={styles.title}>Planta - Toả sáng không gian nhà bạn</Text>
                {/* Nút Giỏ hàng */}
                <TouchableOpacity onPress={() => navigation.navigate('GioHang')} style={styles.iconButton}>
                  <Ionicons name="cart-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
 
        <Image
          source={require('../hinhanh/banner.png')}
          style={styles.banner}
          resizeMode="contain"
        />
   
    <Text style={styles.title} onPress={() => navigation.navigate('ListCayXanh')}>Cây trồng</Text>
   
        
        <FlatList
          data={cayxanhData}
          renderItem={({ item }) => (
            <View style={styles.card} >
              <Image source={{ uri: item.avatar }} style={styles.image} />
              <Text style={styles.coffeeName}>{item.name}</Text>
              <Text style={styles.coffeePrice}>{item.price}$</Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CayTrongChiTiet', { product: item })}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.coffeeList}
        />

<Text style={styles.title} onPress={() => navigation.navigate('ChauCayList')}>Chậu cây</Text>
        <FlatList
          data={chaucayData}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.avatar }} style={styles.image} />
              <Text style={styles.coffeeName}>{item.name}</Text>
              <Text style={styles.coffeePrice}>{item.price}</Text>
              <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.coffeeList}
        />

        <Text style={styles.title} onPress={() => navigation.navigate('ListDungCu')}>Dụng cụ chăm sóc</Text>
   
        
   <FlatList
     data={dungcuData}
     renderItem={({ item }) => (
       <View style={styles.card}>
         <Image source={{ uri: item.avatar }} style={styles.image} />
         <Text style={styles.coffeeName}>{item.name}</Text>
         <Text style={styles.coffeePrice}>{item.price}</Text>
         <TouchableOpacity style={styles.button} >
           <Text style={styles.buttonText}>+</Text>
         </TouchableOpacity>
       </View>
     )}
     keyExtractor={item => item.id.toString()}
     horizontal
     showsHorizontalScrollIndicator={false}
     contentContainerStyle={styles.coffeeList}
   />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    paddingTop: 50, 
  },
  header: {
    flexDirection: 'row',
  
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
    fontSize: 24,
    color: '#1A1A1A',
    marginBottom: 20,
    width:250,
    lineHeight: 32,
  },
  banner: {
    width: '100%',
    height: 135,
  },
  coffeeList: {
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
   
    padding: 10,
    marginRight: 15,
    alignItems: 'center',
    width: 120,
    height: 200,
    justifyContent: 'center',
    
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 55,
  },
  coffeeName: {
    color: '#1A1A1A',
    marginVertical: 5,
    textAlign: 'center',
  },
  coffeePrice: {
    color: '#FF8C00',
    marginBottom: 5,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF8C00',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#1A1A1A',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default HomeScreen;
