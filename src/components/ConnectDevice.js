import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Text, TextInput, Alert } from 'react-native';
import { commonStyles } from './styles';
import {
	sendMessage,
	connectToDevice,
	fetchPairDevices,
	bluetoothEnabled,
} from './BlueetoothLogic';

const ConnectDeviceScreen = ({ navigation }) => {
	const [responseWifi, setResponseWifi] = useState('');
	const [responseUuid, setResponseUuid] = useState('');
	const [devices, setDevices] = useState([]);
	const [connectedDevice, setConnectedDevice] = useState(null);
	const [wifiName, setWifiName] = useState('');
	const [wifiPassword, setWifiPassword] = useState('');


	const sendwifi = async (device) => {
		const wifi = wifiName || "zunzun07-2.4GHz"; // to exists wifi and password default.
		const password = wifiPassword || "49861978";
		const message1 = JSON.stringify({ status_code: 1, data: { ssid: wifi, password: password } });
		const request = await sendMessage(device, message1);
		if (request === "{status_code:6}") {
			Alert.alert("Error de credenciales"); //Manejo de error al no poder conectar el arduino con el wifi
		}
		else {
			setResponseWifi(request);
		}
	}

	const getuuid = async () => {
		const message2 = JSON.stringify({ status_code: 2 });
		const request = await sendMessage(connectedDevice, message2);
		setResponseUuid(request);
	}

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
			<View style={commonStyles.container}>
				<FlatList
					data={devices}
					keyExtractor={item => item.address}
					renderItem={({ item }) => (
						<View>
							<Text style={{ backgroundColor: connectedDevice ? "green" : "gray", marginBottom: 10 }}> {item.name} </Text>
							<Button title='connect' onPress={() => connectToDevice(item).then(device => { setConnectedDevice(device) })} />
							<Text style={{ marginTop: 10 }}>Nombre WiFi:</Text>
							<TextInput
								style={{ borderWidth: 1, borderColor: 'grey', marginBottom: 10, padding: 5 }}
								placeholder="Introduce el nombre del WiFi"
								onChangeText={text => setWifiName(text)}
								defaultValue={wifiName}
							/>
							<Text>Contraseña WiFi:</Text>
							<TextInput
								style={{ borderWidth: 1, borderColor: 'grey', marginBottom: 10, padding: 5 }}
								placeholder="Introduce la contraseña del WiFi"
								onChangeText={text => setWifiPassword(text)}
								defaultValue={wifiPassword}
								secureTextEntry={true}
							/>
							{/* se pasa el dispositivo para tenerlo en contexto */}
							<View style={{ marginVertical: 10 }}>
								{responseWifi && (
									<Text> Se conecto: {responseWifi} </Text>
								)}
								<Button title='Enviar WiFi' onPress={() => sendwifi(item)} />
							</View>
							<View style={{ marginVertical: 15 }}>
								{responseUuid && (
									<Text> La uuid de la planty es: {responseUuid} </Text>
								)}
								<Button title='uuid' onPress={() => getuuid()} />
							</View>

						</View>
					)}
				/>
			</View>
		</View >
	);
}

export default ConnectDeviceScreen;