import React, { useState, useRef, useEffect } from 'react';
import { View, Image, TextInput, StyleSheet, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchComp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [matchingPlants, setMatchingPlants] = useState([]);
  const scrollViewRef = useRef(null);

  const allPlants = [
    { id: 1, name: 'amapola' },
    { id: 2, name: 'jorge' },
    { id: 3, name: 'sexo' },
    { id: 4, name: 'momo' },
    { id: 5, name: 'kusko' },
    { id: 7, name: 'guerra' },
    { id: 8, name: 'guerra' },
    { id: 9, name: 'guerra' },
    { id: 10, name: 'guerra' },
    { id: 11, name: 'guerra' },
    { id: 12, name: 'guerra' },
    { id: 13, name: 'guerra' },

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
      behavior="padding"
      enabled
    >
      <Image style={styles.image} source={require('../img/Logo_App_Planty1.png')} />
      <View style={styles.headContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Icon name="magnify" size={32} color="#38CE61" style={styles.iconSearch} />
      </View>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '96%',
  },
  image: {
    alignSelf: 'center',
    margin: '2%',
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
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    marginTop: 10,
    elevation: 10,
    marginBottom: 20,
  },

  headContainer:{
    width: '96%',
    alignSelf: 'center',
  },

  inputText: {
    flex: 1,
    fontSize: 16,
  },
  iconSearch: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  plantList: {
    width: '96%',
    backgroundColor: 'transparent',
  },
  plantListContent: {
    alignItems: 'center',
  },
  plantCard: {
    width: '96%',
    margin: 10,
    padding: 10,
    backgroundColor: 'transparent',
  },
});

export default SearchComp;
