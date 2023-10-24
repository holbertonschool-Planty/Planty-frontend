import { all } from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { View, Image, TextInput, StyleSheet, Text, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchComp = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [viewHeight, setViewHeight] = useState(60);
  const [showNoResults, setShowNoResults] = useState(false); // Nuevo estado

  const allPlants = [
    { id: '1', label: 'Rosa', value: 'rosa' },
    { id: '2', label: 'Lavanda', value: 'lavanda' },
    { id: '3', label: 'Orquídea', value: 'orquidea' },
    { id: '4', label: 'Tomillo', value: 'tomillo' },
    { id: '5', label: 'Helecho', value: 'helecho' },
    { id: '6', label: 'Cactus', value: 'cactus' },
    { id: '7', label: 'Geranio', value: 'geranio' },
    { id: '8', label: 'Margarita', value: 'margarita' },
    { id: '9', label: 'Bambú', value: 'bambu' },
    { id: '10', label: 'Suculenta', value: 'suculenta' }
  ];

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = allPlants.filter((plant) =>
      plant.label.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPlants(filtered);

    if (filtered.length > 0) {
      setShowNoResults(false); // Si hay resultados, oculta "No results found"
      setViewHeight(180); // Altura cuando hay resultados
    } else {
      setViewHeight(60); // Altura cuando no hay resultados
      setShowNoResults(true); // Si no hay resultados, muestra "No results found"
    }

    if (text === '') {
      setViewHeight(60); // Restablece la altura a 60 cuando el texto está vacío
    }

  };

  const handlePlantSelection = (plant) => {
    setSearchText(plant.label);
    // Puedes realizar otras acciones con la planta seleccionada
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      enabled
    >
      <Image style={styles.image} source={require('../img/Logo_App_Planty1.png')} />
      <View
        style={{
          height: viewHeight, // Altura fija
          elevation: 8,
          marginTop: 10,
          borderRadius: 10,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignSelf: 'center',
          width: '92%',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={{ flex: 1, marginLeft: 10, marginVertical: 10 }}
            placeholder="Search a plant"
            value={searchText}
            onChangeText={handleSearch}
          />
          <Icon name="magnify" size={24} style={styles.iconSearch} />
        </View>
        {showNoResults && (
          <View
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, top: 20, margin: 0, padding: 0
            }}
          >
            <Text style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0}}>
              No results found
              </Text>
          </View>
        )}
        <FlatList
          data={filteredPlants}
          renderItem={({ item }) => (
            <Text
              style={{
                padding: 20,
                borderBottomWidth: 1,
                borderColor: '#ccc',
              }}
              onPress={() => handlePlantSelection(item)}
            >
              {item.label}
            </Text>
          )}
          keyExtractor={(item) => item.id}
          style={{ display: searchText ? 'flex' : 'none' }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    zIndex: 2,
    position: 'absolute',
    backgroundColor: '#fff',
  },

  image: {
    alignSelf: 'center',
    marginTop: '6%',
    width: '70%',
  },

  inputText: {
    flex: 1,
    fontSize: 16,
  },

  iconSearch: {
    padding: 8,
    position: 'absolute',
    right: 10,
    color: '#38CE61',
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