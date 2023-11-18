import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationContext } from '@react-navigation/native';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const EmptyCardMessage = ({ user, message, status }) => {
  const navigation = useNavigation();

  const handleAddPlantPress = () => {
    navigation.navigate('Plants', {user: user});
  };

  return (
    <View style={styles.centeredTextContainer}>
      <Text style={styles.centeredText}>{message}</Text>
      {status === 0 ? (
      <TouchableOpacity onPress={handleAddPlantPress}>
        <Text style={styles.buttonText}>
          <MaterialCommunityIcons name="plus-box" size={48} color="#38CE61" />
        </Text>
      </TouchableOpacity>
    ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
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
