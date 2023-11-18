import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { commonStyles } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Collapsible from 'react-native-collapsible';
import { sendMessage, connectToDevice, fetchPairDevices, bluetoothEnabled } from './BlueetoothLogic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyCardMessage from "./EmptyMessage";
import useAppState from "react-native-useappstate";



const ConnectDeviceScreen = ({ navigation, route }) => {
	const userData = route.params?.user || null;
	const [responseWifi, setResponseWifi] = useState('');
	const [devices, setDevices] = useState([]);
	const [connectedDevice, setConnectedDevice] = useState(null);
	const [wifiName, setWifiName] = useState('');
	const [wifiPassword, setWifiPassword] = useState('');
	const SetKey = route.params?.setKey || null;
	const key = route.params?.key || null;
	const [expandedItem, setExpandedItem] = useState(null);
  const [test, setTest] = useState(0);
  const [isAppActive, setIsAppActive] = useState(false);

  const appState = useAppState();

  const filterUUID = (inputString) => {
    const withoutSpaces = inputString.replace(/\s+/g, '').replace(/\\/g, '');
    const isUUID = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/.test(withoutSpaces);
    return isUUID ? withoutSpaces : null;
  };
  
  const expandCard = (addressMac) => {
    console.log(addressMac)
    setExpandedItem(expandedItem === addressMac ? null : addressMac)
    console.log("Connect")
    if (connectedDevice === null) {
      connectToDevice(addressMac).then(device => { setConnectedDevice(device)})
    }
    else {
    console.log(connectedDevice.address)
    }
  }
  
	const sendwifi = async (device) => {
    navigateToPlantAddition();
		const wifi = wifiName || "zunzun07-2.4GHz";
		const password = wifiPassword || "49861978";
		const message1 = JSON.stringify({ status_code: 1, data: { ssid: wifi, password: password }});
		const request = await sendMessage(device, message1);

		if (request === "{status_code:6}" || request === null) {
		} else {
			setResponseWifi("Wifi conectado.");
      console.log("Wifi conectado", request)
			const message2 = JSON.stringify({ status_code: 2 });
			const uuidRequest = await sendMessage(device, message2);
			const uuidFiltered = filterUUID(uuidRequest);
      console.log(uuidFiltered)
      await AsyncStorage.setItem('plantyId', uuidFiltered);
		}
	};

	const navigateToPlantAddition = () => {
	  console.log(userData)
		navigation.navigate('Add your plant', { user: userData, setKey: SetKey, key: key });
	};


  useEffect(() => {
      setTest(0);
      bluetoothEnabled().then(enabled => {
        if (enabled) {
          fetchPairDevices().then(filterList => {
            setDevices(filterList);
            if (filterList.length === 0) {
              setTest(1);
            }
          });
        }
      })
        .catch(error => {
          console.error(`Error habilitando Bluetooth: ${error.message}`);
        });
  }, [navigation, appState]);


  if (test === 1) {
    return (
    <View>
    			<Text style={commonStyles.headings}>Add you devices</Text>
			<TouchableOpacity onPress={() => { navigateToPlantAddition() }} style={styles.skipSection}>
				<Text style={styles.skipText}>Skip</Text>
				<Icon name="fast-forward" size={24} style={{ justifyContent: 'center' }} />
			</TouchableOpacity>
      <EmptyCardMessage message={"No Arduino devices paired with your Bluetooth. Pair one now!"} status={2}/>
    </View>)
  }

	return (
		<View style={commonStyles.container}>
			<Text style={commonStyles.headings}>Add you devices</Text>
			<TouchableOpacity onPress={() => { navigateToPlantAddition() }} style={styles.skipSection}>
				<Text style={styles.skipText}>Skip</Text>
				<Icon name="fast-forward" size={24} style={{ justifyContent: 'center' }} />
			</TouchableOpacity>
			<View style={commonStyles.container}>
				<FlatList
					data={devices}
					keyExtractor={item => item.address}
					renderItem={({ item }) => (
						<View>
							<TouchableOpacity onPress={() => { expandCard(item.address) }}>
								<Text style={styles.expandableItem}>{item.name}</Text>
							</TouchableOpacity>
							<Collapsible collapsed={expandedItem !== item.address}>
								<View>
									<Text style={{ marginTop: 10, marginLeft: '4%' }}>WiFi Address:</Text>
									<TextInput
										style={styles.inputs}
										placeholder="Type the WiFi address"
										onChangeText={text => setWifiName(text)}
										defaultValue={wifiName}
									/>
									<Text style={{ marginLeft: '4%' }}>WiFi Password:</Text>
									<TextInput
										style={styles.inputs}
										placeholder="Type the WiFi password"
										onChangeText={text => setWifiPassword(text)}
										defaultValue={wifiPassword}
										secureTextEntry={true}
									/>
									{/* se pasa el dispositivo para tenerlo en contexto */}
									<View style={{ flexDirection: 'row', alignSelf: 'center' }}>
										<View style={{ margin: 10, }}>
											{responseWifi && (
												<Text>Connected: {responseWifi} </Text>
											)}
											<TouchableOpacity onPress={() => sendwifi(item)}>
												<View style={commonStyles.addButton}>
													<Text style={{ textAlign: 'center', color: '#fff', fontWeight: 500, }}>Send WiFi</Text>
												</View>
											</TouchableOpacity>
										</View>
										{/* <View style={{ margin: 10 }}>
										  <TouchableOpacity onPress={() => connectToDevice(item).then(device => { setConnectedDevice(device) })}>
												<View style={commonStyles.addButton}>
													<Text style={{ textAlign: 'center', color: '#fff', fontWeight: 500, }}>Connect Device</Text>
												</View>
											</TouchableOpacity> 
										</View> */}
									</View>
								</View>
							</Collapsible>
						</View>
					)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	inputs: {
		elevation: 4,
		marginVertical: 4,
		borderRadius: 8,
		paddingHorizontal: 8,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignSelf: 'center',
		width: '92%',
		height: 40,
	},

	expandableItem: {
		backgroundColor: connectToDevice ? "rgba(20, 90, 255, 0.55)" : "rgba(0, 160, 0, 0.55)",
		marginBottom: 1,
		paddingVertical: 12,
		color: '#fff',
		paddingLeft: 10,
		fontWeight: '400',
		fontSize: 16,
		borderRadius: 10,
		width: '96%',
		alignSelf: 'center',
	},

	skipSection: {
		padding: 10,
		fontWeight: '500',
		fontSize: 18,
		alignSelf: 'flex-start',
		flexDirection: 'row',
	},

	skipText: {
		fontWeight: '500',
		fontSize: 16,
		marginRight: 4,
	},
});

export default ConnectDeviceScreen;
