import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import NavigationBar from './navigationBar';
import { commonStyles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SettingsScreen = ({ navigation, route }) => {
  const userData = route.params?.user || null;
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToken, setUserToken] = useState("your_user_token");

  const handleSignOff = async () => {
    await AsyncStorage.removeItem("userData");
    await AsyncStorage.removeItem("userToken");
    navigation.reset({
      index: 0,
      routes: [{ name: 'RegisterUser' }],
    });
  };

  const handleDeleteAccount = async () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`https://api.plantyit.tech/api/users/${userData.id}`, {
        headers: {
          'Authorization': 'Bearer ' + userToken,
        },
        // },
      });

      if (response.status === 200) {

        await AsyncStorage.removeItem("userData");
        await AsyncStorage.removeItem("userToken");
        navigation.reset({
          index: 0,
          routes: [{ name: 'RegisterUser' }],
        });
      } else {
        console.error('Failed to delete account. Server error.');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      console.log('Full error:', error);
    } finally {
      setShowDeleteConfirmation(false);
    }
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
        <TouchableOpacity style={styles.linkers} onPress={() => navigation.navigate('ConnectedDevices')}>
          <Icon name="cellphone-wireless" size={24} style={styles.icon} />
          <Text style={styles.link}>Connected Devices</Text>
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
        <TouchableOpacity style={styles.linkers} onPress={handleDeleteAccount} >
          <FontAwesome5Icons name="user-times" size={24} color="#252423" style={styles.icon} />
          <Text style={styles.link}>Delete Account</Text>
        </TouchableOpacity>
        <View style={commonStyles.topLine}></View>
        {showDeleteConfirmation && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={showDeleteConfirmation}
            onRequestClose={() => setShowDeleteConfirmation(false)}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
              <View style={styles.ModalDelete}>
                <Text style={styles.Header}>Are you sure you want to delete your account?</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <TouchableOpacity onPress={() => setShowDeleteConfirmation(false)}>
                    <Text style={styles.TextDeleteCancel}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleConfirmDelete}>
                    <Text style={styles.TextDelete}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
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
  },
  ModalDelete: {
    justifyContent: 'space-around',
    alignSelf: 'center',
    backgroundColor: "white",
    borderRadius: 10,
    width: 360,
    height: 150,
    elevation: 20,
  },
  TextDelete: {
    fontWeight: '600',
    fontSize: 18,
    width: 150,
    alignSelf: 'center',
    color: 'white',
    backgroundColor: 'red',
    textAlign: 'center',
    margin: 12,
    padding: 8,
    borderRadius: 6,
    elevation: 64,
    shadowColor: 'black',
  },
  TextDeleteCancel: {
    fontWeight: '600',
    fontSize: 18,
    width: 150,
    alignSelf: 'center',
    color: '#167eba',
    backgroundColor: 'rgb(255, 251, 251)',
    borderColor: '#167eba',
    borderStyle: 'solid',
    textAlign: 'center',
    margin: 12,
    padding: 6,
    borderWidth: 3,
    borderRadius: 6,
    elevation: 64,
    shadowColor: 'black',
  },

  Header: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 16,
  },

});
export default SettingsScreen;
