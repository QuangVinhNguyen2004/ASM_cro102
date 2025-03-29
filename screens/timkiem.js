import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    { id: '1', name: 'Spider Plant' },
    { id: '2', name: 'Song of India' }
  ]);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const removeSearchItem = (id) => {
    setRecentSearches(recentSearches.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
      </View>

      {/* Tiêu đề "Tìm kiếm gần đây" */}
      <Text style={styles.recentTitle}>Tìm kiếm gần đây</Text>

      {/* Danh sách tìm kiếm gần đây */}
      <FlatList
        data={recentSearches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recentItem}>
            <Ionicons name="radio-button-off" size={16} color="gray" />
            <Text style={styles.recentText}>{item.name}</Text>
            <TouchableOpacity onPress={() => removeSearchItem(item.id)}>
              <Ionicons name="close" size={18} color="gray" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    paddingBottom: 5,
    paddingTop: 30,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  searchIcon: {
    marginLeft: 10,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  recentText: {
    flex: 1,
    fontSize: 14,
    marginLeft: 10,
  },
});
