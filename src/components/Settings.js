import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Button, FlatList, Text, PermissionsAndroid, Alert } from 'react-native';
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
      const success = await RNBluetoothClassic.writeToDevice(
        connectedDevice.address,
        txt
      );
      console.log(success);
      if (success) {
        console.log("TRY")
        await sleep(10000)
        const response = await RNBluetoothClassic.readFromDevice(
          connectedDevice.address
        );
        setResponse(response);
        console.log(response)
      } else {
        Alert.alert('Error al enviar mensaje');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const connectToDevice = async (device) => {
    try {
      const connection = await RNBluetoothClassic.connectToDevice(device.address);
      if (connection) {
        console.log("test-\n", connection);
        setConnectedDevice(device);
        console.log("Finish")
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  const sendwifi = async () => {
    const message1 = JSON.stringify({status_code:1,data:{wifi:"planty",password:"12345678"}});
    sendMessage(message1)
  }

  const getuuid = async () => {
    const message2 = JSON.stringify({status_code:2});
    await sendMessage(message2)
    Alert.alert(response)
  }

  useEffect(() => {
    async function fetchPairDevices() {
      const pairDevices = await RNBluetoothClassic.getBondedDevices();
      const filterList = [];
      for (const device of pairDevices) {
        if (device.name.startsWith("Planty-", 0)) {
          filterList.push(device);
        }
      }
      setDevices(filterList)
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
              <Button title='connect' onPress={() => connectToDevice(item)} style={{ margin: 10 }}/>
              <Button title='wifi' onPress={() => sendwifi()} style={{ margin: 10 }}/>
              <Button title='uuid' onPress={() => getuuid()} style={{ margin: 10 }}/>

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