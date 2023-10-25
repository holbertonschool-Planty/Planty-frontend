import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Button, FlatList, Text, PermissionsAndroid } from 'react-native';
import NavigationBar from './navigationBar';
import { commonStyles } from './styles';
import RNBluetoothClassic from 'react-native-bluetooth-classic'
import { PERMISSIONS, request } from 'react-native-permissions';


const SettingsScreen = ({ navigation }) => {
  const [response, setResponse] = useState('');
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);


  async function requestBluetoothPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Tienes acceso a Bluetooth");
      } else {
        console.log("Permiso de Bluetooth denegado");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const sendMessage = async (txt) => {
    if (!connectedDevice) {
      return;
    }
    try {
      const message = txt;
      const data = new Uint8Array(message.length);
      for (let i = 0; i < message.length; i++) {
        data[i] = message.charCodeAt(i);
      }
      const success = await RNBluetoothClassic.writeToDevice(
        connectedDevice.address,
        Buffer.from(data)
      );
      console.log(success);
      if (success) {
        const response = await RNBluetoothClassic.readFromDevice(
          connectedDevice.address
        );
        Alert.alert('Mensaje enviado ', response);
        setResponse(response);
      } else {
        Alert.alert('Error al enviar mensaje');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const connectToDevice = async (device) => {
    try {
      const connection = await RNBluetoothClassic.connectToDevice(device.address);
      if (connection) {
        setConnectedDevice(device);
        sendMessage('1')
      }
    } catch (error) {
      console.error('eror', error);
    }
  };

  useEffect(() => {
    async function fetchPairDevices() {
      const pairDevices = await RNBluetoothClassic.getBondedDevices();
      console.log('ggggg', pairDevices)
      const filterList = [];
      for (const device of pairDevices) {
        if (device.name.startsWith("Planty-", 0)) {
          filterList.push(device);
        }
      }
      setDevices(pairDevices)
    }
    RNBluetoothClassic.requestBluetoothEnabled().then(enabled => {
      if (enabled) {
        fetchPairDevices();
      }
    })
      .catch(error => {
        console.error(`Error habilitando Bluetooth: ${error.message}`);
      });
  }, []);

return (
  <View style={commonStyles.container}>
    <ScrollView contentContainerStyle={commonStyles.scrollViewContent}>
      <View style={commonStyles.content}>
        <Text>Devices:</Text>
        <FlatList
          data={devices}
          keyExtractor={item => item.address}
          renderItem={({ item }) => (
            <View>
              <Text> {item.name} </Text>
              <Button title='connect' onPress={() => connectToDevice(item)} />
            </View>
          )}
        />
      </View>
    </ScrollView>
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