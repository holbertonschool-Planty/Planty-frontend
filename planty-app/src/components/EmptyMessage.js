import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationContext } from '@react-navigation/native';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { commonStyles } from './styles';
import { openBluetoothSettings } from './BlueetoothLogic';

const EmptyCardMessage = ({ user, message, status }) => {
  const navigation = useNavigation();

  const handleAddPlantPress = () => {
    navigation.navigate('Plants', {user: user});
  };

  return (
    <View style={status === 2 ? styles.centeredtoTwo : styles.centeredTextContainer}>
      <Text style={styles.centeredText}>{message}</Text>
      {status === 1 ? (
        <TouchableOpacity onPress={handleAddPlantPress}>
          <Text style={styles.buttonText}>
            <MaterialCommunityIcons name="plus-box" size={48} color="#38CE61" />
          </Text>
        </TouchableOpacity>
      ) : null}
      {status === 2 ? (
        <TouchableOpacity style={{ marginTop: 16, ...commonStyles.addButton}} onPress={() => openBluetoothSettings()}>
          <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 500, }}>Pair Bluetooth Device</Text>
        </TouchableOpacity>
      ) : null }
    </View>
  );
};

const styles = StyleSheet.create({
  centeredTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 400
  },
  centeredText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '400',
    color: 'grey',
  },
  buttonText: {
  },
  centeredtoTwo: {
    alignItems: 'center',
    top: "50%",
    height: 400,
  }
});

export default EmptyCardMessage;
