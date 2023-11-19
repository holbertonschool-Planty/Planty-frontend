import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, StyleSheet, Text, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Lightbox from 'react-native-lightbox';
import {
  requestGetPlants
}
  from "./RequestLogic";

const SearchComp = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [viewHeight, setViewHeight] = useState(60);
  const [showNoResults, setShowNoResults] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [allPlants, setAllPlants] = useState([]);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = allPlants._j.filter((plant) =>
      plant.scientific_name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPlants(filtered);

    if (filtered.length > 0) {
      setShowNoResults(false); // Si hay resultados, oculta "No results found"
      setViewHeight(214); // Altura cuando hay resultados
    } else {
      setViewHeight(60); // Altura cuando no hay resultados
      setShowNoResults(true); // Si no hay resultados, muestra "No results found"
    }

    if (text === '') {
      setViewHeight(60); // Restablece la altura a 60 cuando el texto está vacío
    }

    setSelectedPlant(null);
  };

  const handlePlantSelection = (plant) => {
    setSearchText(plant.scientific_name);
    setSelectedPlant(plant);
    // Puedes realizar otras acciones con la planta seleccionada
  };

  useEffect(() => {
    setAllPlants(requestGetPlants());
  }, [])

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      enabled
    >
      <Image style={styles.image} source={require('../img/Logo_App_Planty.png')} />
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
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent' }}>
          <TextInput
            style={{ flex: 1, marginLeft: 10, marginVertical: 10, fontSize: 16 }}
            placeholder="Search a plant"
            value={searchText}
            onChangeText={handleSearch}
          />
          <Icon name="magnify" size={24} style={styles.iconSearch} />
        </View>
        {showNoResults && (
          <View
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, top: 22, margin: 0, padding: 0
            }}
          >
            <Text style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0 }}>
              No results found
            </Text>
          </View>
        )}
        {selectedPlant ? (
          <View style={{ padding: 16, flexDirection: 'row' }}>
            <View style={{ width: 128, height: 128, borderRadius: 12, marginRight: 16, elevation: 8, color: '#000000', shadowColor: 'black' }}>
              <Lightbox
                underlayColor="transparent"
                springConfig={{ tension: 15, friction: 7 }}
                renderContent={() => (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {/* Contenido personalizado aquí */}
                    <Image
                      style={{ width: '100%', height: 300 }}
                      source={{
                        uri: `https://firebasestorage.googleapis.com/v0/b/planty-app-htbn.appspot.com/o/plants_info%2F${selectedPlant.id}.jpg?alt=media&token=5bb2b64b-a92d-4e66-8fa0-b017490cb58f`,
                      }}
                    />
                  </View>
                )}
              >
                <Image
                  style={{ width: 128, height: 128, borderRadius: 12, marginRight: 16 }}
                  source={{ uri: `https://firebasestorage.googleapis.com/v0/b/planty-app-htbn.appspot.com/o/plants_info%2F${selectedPlant.id}.jpg?alt=media&token=5bb2b64b-a92d-4e66-8fa0-b017490cb58f` }}
                />
              </Lightbox>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontWeight: '500', marginVertical: 6, fontSize: 14 }}>{selectedPlant.scientific_name}</Text>
              <Text style={{ fontWeight: '500', marginVertical: 6, fontSize: 14 }}>{selectedPlant.temperature}ºC - Temperature Average</Text>
              <Text style={{ fontWeight: '500', marginVertical: 6, fontSize: 14 }}>{selectedPlant.watering}%  - Humidity Average</Text>
              <Text style={{ fontWeight: '500', marginVertical: 6, fontSize: 14 }}>Watering every {selectedPlant.water_frequency} day/s</Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={filteredPlants}
            renderItem={({ item }) => (
              <Text
                style={{
                  padding: 16,
                  borderBottomWidth: 1,
                  borderColor: '#ccc',
                }}
                onPress={() => handlePlantSelection(item)}
              >
                {item.scientific_name}
              </Text>
            )}
            keyExtractor={(item) => item.id}
            style={{ display: searchText ? 'flex' : 'none', marginBottom: 16 }}
          />
        )}
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
    height: 100,
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