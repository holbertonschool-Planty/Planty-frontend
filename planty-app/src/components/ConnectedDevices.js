import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { commonStyles } from './styles';
import { fetchPairDevices, bluetoothEnabled } from './BlueetoothLogic';

const ConnectedDevicesScreen = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchConnectedDevices = async () => {
      try {
        const pairedDevices = await fetchPairDevices();
        // Filtrar solo los dispositivos que comienzan con "Planty-"
        const filteredDevices = pairedDevices.filter(item => item.name.startsWith('Planty-'));
        setDevices(filteredDevices);
      } catch (error) {
        console.error(`Error fetching connected devices: ${error.message}`);
      }
    };

    const checkBluetooth = async () => {
      try {
        const enabled = await bluetoothEnabled();
        if (enabled) {
          fetchConnectedDevices();
        } else {
          console.warn('Bluetooth is not enabled.');
        }
      } catch (error) {
        console.error(`Error checking Bluetooth status: ${error.message}`);
      }
    };

    checkBluetooth();
  }, []);

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.headings}>Connected Devices</Text>
      <FlatList
        data={devices}
        keyExtractor={item => item.address}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleDevicePress(item)}>
            <View style={styles.deviceItem}>
              <Text style={styles.deviceName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  deviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  deviceName: {
    fontSize: 16,
  },
});

export default ConnectedDevicesScreen;