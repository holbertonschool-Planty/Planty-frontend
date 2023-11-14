import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { commonStyles } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Collapsible from 'react-native-collapsible';
import { sendMessage, connectToDevice, fetchPairDevices, bluetoothEnabled } from './BlueetoothLogic';

const ConnectDeviceScreen = ({ navigation, route }) => {
	const userData = route.params?.user || null;
	const [responseWifi, setResponseWifi] = useState('');
	const [responseUuid, setResponseUuid] = useState('');
	const [devices, setDevices] = useState([]);
	const [connectedDevice, setConnectedDevice] = useState(null);
	const [wifiName, setWifiName] = useState('');
	const [wifiPassword, setWifiPassword] = useState('');
	const SetKey = route.params?.setKey || null;
	const key = route.params?.key || null;
	const [expandedItem, setExpandedItem] = useState(null);

	const sendwifi = async (device) => {
		const wifi = wifiName || "zunzun07-2.4GHz";
		const password = wifiPassword || "49861978";
		const message1 = JSON.stringify({ status_code: 1, data: { ssid: wifi, password: password } });
		const request = await sendMessage(device, message1);

		if (request === "{status_code:6}") {
			Alert.alert("Error de credenciales");
		} else {
			setResponseWifi("Wifi conectado.");

			//Se verifica que el status_code sea 5 antes de llamar a la funcion
			if (request === "{status_code:5}") {
				const message2 = JSON.stringify({ status_code: 2 });
				const uuidRequest = await sendMessage(connectedDevice, message2);

				setResponseUuid(uuidRequest);
				navigateToPlantAddition();
			}
		}
	};

	const navigateToPlantAddition = () => {
		navigation.navigate('Add your plant', { user: userData, setKey: SetKey, key: key, plantyId: responseUuid });
	};

	useEffect(() => {
		if (responseUuid) {
			alert('Only for testing, got uuid:' + responseUuid);
			navigateToPlantAddition();
		}
	}, [responseUuid]);

	useEffect(() => {
		bluetoothEnabled().then(enabled => {
			if (enabled) {
				fetchPairDevices().then(filterList => {
					setDevices(filterList);
				});
			}
		})
			.catch(error => {
				console.error(`Error habilitando Bluetooth: ${error.message}`);
			});
	}, []);

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
							<TouchableOpacity onPress={() => setExpandedItem(expandedItem === item.address ? null : item.address)}>
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
										<View style={{ margin: 10 }}>
											{responseUuid && (
												<Text> Planty UUID is: {responseUuid} </Text>
											)}
											<TouchableOpacity onPress={() => connectToDevice(item).then(device => { setConnectedDevice(device) })}>
												<View style={commonStyles.addButton}>
													<Text style={{ textAlign: 'center', color: '#fff', fontWeight: 500, }}>Connect Device</Text>
												</View>
											</TouchableOpacity>
										</View>
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
