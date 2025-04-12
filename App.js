import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './redux/Slide/CartSlide'; // import reducer từ cartSlice
import cayxanhReducer from './redux/Slide/CayXanhSlide';
import chaucayReducer from './redux/Slide/ChauCaySlide';
import accountSlice from './redux/Slide/accountSlice';

import LoginScreen from './screens/dangnhap';
import RegisterScreen from './screens/dangky';
import ProductManagementScreen from './screens/qlsp';
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/profile';
import SearchScreen from './screens/timkiem';
import NotificationScreen from './screens/thongbao';
import ProductListScreen  from './screens/listChauCay';
import ListDungCu from './screens/listDungCu';
import ListCayXanh from './screens/listCayXanh';
import CartScreen from './screens/giohang';
import CayTrongChiTiet from './screens/cayxanhct';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';  // Để sử dụng biểu tượng

// Cấu hình Redux store
const store = configureStore({
  reducer: {
    cart: cartReducer, // cartSlice reducer
    cayxanh:cayxanhReducer,
    chaucay:chaucayReducer,
   
  },
});

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
 // Khai báo Tab
 const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: '#d6cfc6', 
        },
        tabBarActiveTintColor: '#FF8C00', 
        tabBarInactiveTintColor: 'gray', 
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Notifications" component={NotificationScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};
const App = () => {
  return (
    <Provider store={store}> {/* Cung cấp Redux store cho toàn bộ app */}
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Menu" component={TabNavigator} />
          <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
          <Stack.Screen options={{ headerShown: false }} name="ChauCayList" component={ProductListScreen} />
          <Stack.Screen options={{ headerShown: false }} name="ListCayXanh" component={ListCayXanh} />
          <Stack.Screen options={{ headerShown: false }} name="ListDungCu" component={ListDungCu} />
          <Stack.Screen options={{ headerShown: false }} name="GioHang" component={CartScreen} />
          <Stack.Screen options={{ headerShown: false }} name="CayTrongChiTiet" component={CayTrongChiTiet} />
          <Stack.Screen options={{ headerShown: false }} name="Notification" component={NotificationScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Profile" component={ProfileScreen} />
          <Stack.Screen options={{ headerShown: false }} name="qlsp" component={ProductManagementScreen} />
        
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
