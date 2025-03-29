import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/dangnhap';
import RegisterScreen from './screens/dangky';
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/profile';
import SearchScreen from './screens/timkiem';
import NotificationScreen from './screens/thongbao';
import ProductListScreen  from './screens/listChauCay';
import ListDungCu from './screens/listDungCu';
import ListCayXanh from './screens/listCayXanh';
import CartScreen from './screens/giohang';
import CayTrongChiTietScreen from './screens/cayxanhct';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';  // Để sử dụng biểu tượng
// Khai báo Stack
const Stack = createNativeStackNavigator();
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

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
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
          <Stack.Screen options={{ headerShown: false }} name="CayTrongChiTiet" component={CayTrongChiTietScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Notification" component={NotificationScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Profile" component={ProfileScreen} />
        
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
