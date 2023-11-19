import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import PictureComp from './PictureComp';
import ColorPicker from './ColorPicker';
import PlantPicker from './PlantPicker';
import PlantLocation from './PlantLocation';
import { commonStyles } from './styles';
import { requestCreatePlanty, requestLocation } from './RequestLogic';
import { getExpoPushToken } from './ExpoNotifications';
import NotificationsSettings from './WateringNotificationPeriod';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPlantyScreen = ({ navigation, route }) => {
	const userData = route.params?.user || null;
	const [token, setToken] = useState(null);
	const [wateringFreq, setWateringFreq] = useState(0);

	const [formData, setFormData] = useState({
		token_phone: '',
		user_planty: {
			plant_name: '',
			color_card: '',
			location: ''
		},
		plants_info_id: '',
		timezone: 0,
		phone_event: []
	});

	const [imagePicker, setImagePicker] = useState(
		{
			uri: null,
			type: 'image/jpeg',
			name: null
		}
	)



	const handleImagePicker = (imagePicker) => {
		setImagePicker({
			uri: imagePicker.assets[0].uri,
			type: 'image/jpeg',
			name: imagePicker.assets[0].uri
		});
	}

	const handleUser_plantyChange = (attribute, value) => {
		const newUserData = { ...formData.user_planty };
		newUserData[attribute] = value;

		setFormData(prevFormData => ({
			...prevFormData,
			user_planty: newUserData
		}));
	};

	useEffect(() => {
		(async () => {
			const token = await getExpoPushToken();
			console.log('Expo Push Token:', token);
			setToken(token);
		})();
	}, []);

	const navigateToPlants = () => {
		route.params?.setKey(route.params?.key + 1);
		navigation.navigate('Plants', { user: userData });
	};

	const handlePhone_eventChange = (attributes) => {
		const eventList = [];
		attributes.forEach(attribute => {
			if (attribute === "Watering") {
				const watering = {
					frequency: wateringFreq,
					event_type: "Watering Reminder",
					message: `It's time to water your plant ${formData.user_planty.plant_name}. Don't forget to keep it hydrated!`
				}
				eventList.push(watering);
			} else if (attribute === "Temperature") {
				const temperature = {
					frequency: wateringFreq,
					event_type: `Temperature Alert`,
					message: `Don't forget to keep it hydrated!`
				}
				eventList.push(temperature);
			} else if (attribute === "Light") {
				const light = {
					frequency: wateringFreq,
					event_type: `Light Alert`,
					message: `Don't forget to keep it hydrated!`
				}
				eventList.push(light);
			} else if (attribute === "Humidity") {
				const humidity = {
					frequency: wateringFreq,
					event_type: `Humidity Alert`,
					message: `Don't forget to keep it hydrated!`
				}
				eventList.push(humidity);
			}
		})
		setFormData(prevFormData => ({
			...prevFormData,
			phone_event: eventList
		}));
	};

	useEffect(() => {
		console.log(formData);
	}, [formData]
	)

	const sendDatatoCreate = async () => {
		try {
			if (1 === 1) {
				console.log("Try plantyId")
				const plantyID = await AsyncStorage.getItem('plantyId');
				console.log(plantyID)
				formData.planty_id = plantyID
			}
			const timezone = await requestLocation();
			formData.timezone = timezone;
			const user_id = userData.id;
			console.log(formData)
			const response = await requestCreatePlanty(user_id, formData, imagePicker);
			navigateToPlants();
		} catch (err) {
			console.log("requ", err)
		}
	}

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row', width: "92%", justifyContent: 'space-evenly', alignSelf: 'center', paddingBottom: 16 }}>
				<PictureComp onPickerResult={(image) => handleImagePicker(image)} />
				<ColorPicker onColorSelected={(color) => handleUser_plantyChange('color_card', color)} />
			</View>
			<Text style={{ marginLeft: '9%' }}>Choose your plant</Text>
			<PlantPicker OnSelectedPlant={(selectedPlant) => {
				formData.plants_info_id = selectedPlant.id;
				setWateringFreq(selectedPlant.water_frequency);
			}} />
			<Text style={{ marginLeft: '9%' }}>Plant's personal name</Text>
			<View style={commonStyles.inputContainers}>
				<TextInput
					placeholder="Choose its name..."
					style={{ marginLeft: 10, marginVertical: 10 }}
					onChangeText={(text) => handleUser_plantyChange("plant_name", text)}
				/>
			</View>
			<Text style={{ marginLeft: '9%' }}>Notification settings</Text>
			<View style={commonStyles.inputContainers}>
				<NotificationsSettings onSelectedOptions={(item) => handlePhone_eventChange(item)} />
			</View>
			<Text style={{ marginLeft: '9%' }}>Location</Text>
			<View style={commonStyles.inputContainers}>
				<PlantLocation onSelectedPlantLocation={(location) => handleUser_plantyChange("location", location.label)} />
			</View>
      <TouchableOpacity style={{ top: 120, ...commonStyles.addButton, width: 210, height: 50}} onPress={() => sendDatatoCreate()}>
          <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 600 }}>Add your plant!</Text>
        </TouchableOpacity>
		</View>
	);
}


const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		paddingTop: 20,
		flex: 1,
	},
	colorPalette: {
		flexDirection: 'column',
	},
	colorRow: {
		flexDirection: 'row', // Cada fila contiene colores en una fila horizontal
	},
	colorCircle: {
		width: 32,
		height: 32,
		borderRadius: 20,
		margin: 5,
		borderWidth: 2,
	},
	pickHeading: {
		fontWeight: '600',
		color: 'rgba(37, 36, 35, 0.8)',
	}

});

export default AddPlantyScreen;
