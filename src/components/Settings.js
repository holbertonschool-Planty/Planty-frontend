import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Text, TextInput, Alert } from 'react-native';
import NavigationBar from './navigationBar';
import { commonStyles } from './styles';
import ConnectDeviceScreen from './ConnectDevice';

const SettingsScreen = ({ navigation }) => {

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.headings}>Settings</Text>
      <View style={commonStyles.scrollViewContent}>

      </View>
      <View style={commonStyles.shadowContainer}>
        <View style={commonStyles.topLine}></View>
        <View style={commonStyles.bottomContainer}>
          <NavigationBar name="Home" icon="home-variant" text="Home" navigation={navigation} />
          <NavigationBar name="Plants" icon="sprout" text="Plants" navigation={navigation} />
          <NavigationBar name="Calendar" icon="calendar" text="Calendar" navigation={navigation} />
          <NavigationBar name="Settings" icon="cog" text="Settings" active={true} navigation={navigation} />
        </View>
      </View>
    </View >
  );
}

export default SettingsScreen;