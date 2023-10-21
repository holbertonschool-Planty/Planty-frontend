import React, { useState, useRef, useEffect } from 'react';
import { View, Image, TextInput, StyleSheet, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchComp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [matchingPlants, setMatchingPlants] = useState([]);
  const scrollViewRef = useRef(null);

  const allPlants = [
    { id: 1, name: 'amapola' },
    { id: 2, name: 'jorge' },
    { id: 3, name: 'sexo' },
    { id: 4, name: 'sexo' },
    { id: 5, name: 'sexo' },
    { id: 6, name: 'sexo' },
    { id: 7, name: 'sexo' },
    { id: 8, name: 'sexo' },
    { id: 9, name: 'sexo' },
    { id: 10, name: 'sexo' },
    { id: 11, name: 'sexo' },
  ];

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setMatchingPlants([]);
    } else {
      const matching = allPlants.filter(plant => plant.name.toLowerCase().includes(text.toLowerCase()));
      setMatchingPlants(matching);
    }
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  }, [matchingPlants]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      enabled
    >
      <Image style={styles.image} source={require('../img/Logo_App_Planty1.png')} />
      <View style={styles.searchMainContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Icon name="magnify" size={32} color="#38CE61" style={styles.iconSearch} />
      </View>
      </View>
      {searchQuery !== '' && (
        <View style={styles.searchResultsContainer}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.plantList}
          contentContainerStyle={styles.plantListContent}
        >
          {matchingPlants.map(plant => (
            <View key={plant.id} style={styles.plantCard}>
              <Text>{plant.name}</Text>
            </View>
          ))}
        </ScrollView>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    zIndex: 2,
  },

  searchResultsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 3, // Asegura que los resultados estén en la parte superior
  },

  image: {
    alignSelf: 'center',
    marginTop: '6%',
    width: '70%',
  },
  searchContainer: {
    width: '96%',
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    marginTop: 10,
    marginBottom: 10,
    elevation: 6,
    zIndex: 3,
  },

  searchMainContainer:{
    width: '96%',
    alignSelf: 'center',
  },

  inputText: {
    flex: 1,
    fontSize: 16,
  },

  iconSearch: {
    padding: 8,
  },
  plantList: {
    alignSelf: 'center',
    width: '92%',
    maxHeight: '40%',
    backgroundColor: 'transparent',
    marginTop: '45%',
  },
  plantListContent: {
    alignItems: 'center',
  },
  plantCard: {
    width: '100%',
    marginBottom: 6,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 4,
  },
});

export default SearchComp;