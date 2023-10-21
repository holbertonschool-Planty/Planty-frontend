import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const NavigationBar = ({ name, icon, text, active }) => {

  const navigation = useNavigation();
    const colors = {
    primary: '#38CE61',
    secondary: '#252423',
  };
  const iconColor = active ? colors.primary : colors.secondary;

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate(name)}>
      <View style={styles.iconStyle}>
        <Icon name={icon} size={24} color={iconColor} />
        <Text style={{ ...styles.text, color: iconColor }}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({

  iconStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },

  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default NavigationBar;