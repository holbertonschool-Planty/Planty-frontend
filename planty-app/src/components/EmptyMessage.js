import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationContext } from '@react-navigation/native';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const EmptyCardMessage = () => {
  const navigation = useNavigation();

  const handleAddPlantPress = () => {
    navigation.navigate('Plants');
  };

  return (
    <View style={styles.centeredTextContainer}>
      <Text style={styles.centeredText}>Add your first plant!</Text>
      <TouchableOpacity onPress={handleAddPlantPress}>
        <Text style={styles.buttonText}><MaterialCommunityIcons name="plus-box" size={50} color="#38CE61" /></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 300,
  },
  centeredText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '400',
    color: 'grey',
  },
  buttonText: {
  },
});

export default EmptyCardMessage;
