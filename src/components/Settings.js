import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationBar from './navigationBar';
import { commonStyles } from './styles';

const SettingsScreen = ({ navigation }) => {

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.headings}>Settings</Text>
      <View style={styles.mainContainer}>
        <View style={commonStyles.topLine}></View>
          <TouchableOpacity style={styles.linkers} onPress={() => navigation.navigate('ConnectDevice')}>
          <Icon name="cellphone-wireless" size={24} style={styles.icon} />
            <Text style={styles.link}>Connect Devices</Text>
          </TouchableOpacity>
          <View style={commonStyles.topLine}></View>
          <TouchableOpacity style={styles.linkers} onPress={() => navigation.navigate('')}>
          <Icon name="bell-outline" size={24} style={styles.icon} />
            <Text style={styles.link}>Notifications</Text>
          </TouchableOpacity>
          <View style={commonStyles.topLine}></View>
          <TouchableOpacity style={styles.linkers} onPress={() => navigation.navigate('')}>
          <Icon name="email-outline" size={24} style={styles.icon} />
            <Text style={styles.link}>Account</Text>
          </TouchableOpacity>
          <View style={commonStyles.topLine}></View>
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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  linkers: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 8,
    marginLeft: 20,
  },
  link: {
    fontWeight: '500',
    color: '#252423',
  },
  icon: {
    color: '#252423',
    marginRight: 16,
    alignSelf: 'baseline',
  }

});


export default SettingsScreen;