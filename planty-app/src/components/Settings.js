import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import NavigationBar from './navigationBar';
import { commonStyles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation, route }) => {
  const userData = route.params?.user || null;
  const handleSignOff = async() => {
    await AsyncStorage.removeItem("userData");
    await AsyncStorage.removeItem("userToken");
    navigation.reset({
      index: 0,
      routes: [{ name: 'RegisterUser' }],
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (e.data.action.type === 'GO_BACK' && e.data.action.source) {
        e.preventDefault();

      }
    });

    return unsubscribe;
  }, [navigation]);

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

        <View style={commonStyles.topLine}></View>
        <TouchableOpacity style={styles.linkers} onPress={handleSignOff} >
          <FontAwesome5Icons name="sign-in-alt" size={24} color="#252423" style={styles.icon} />
          <Text style={styles.link}>Sign off</Text>
        </TouchableOpacity>
        <View style={commonStyles.topLine}></View>

      </View>
      <View style={commonStyles.shadowContainer}>
        <View style={commonStyles.topLine}></View>
        <View style={commonStyles.bottomContainer}>
          <NavigationBar user={userData} name="Home" icon="home-variant" text="Home" navigation={navigation} />
          <NavigationBar user={userData} name="Plants" icon="sprout" text="Plants" navigation={navigation} />
          <NavigationBar user={userData} name="Calendar" icon="calendar" text="Calendar" navigation={navigation} />
          <NavigationBar user={userData} name="Settings" icon="cog" text="Settings" active={true} navigation={navigation} />
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