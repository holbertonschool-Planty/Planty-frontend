import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import PictureComp from './PictureComp';
import ColorPicker from './ColorPicker';
import PlantPicker from './PlantPicker';
import WateringPeriod from './WateringNotificationPeriod';
import PlantDescription from './PlantDescription';
import PlantLocation from './PlantLocation';
import { commonStyles } from './styles';
import { requestCreatePlanty, requestLocation } from './RequestLogic';
import { getExpoPushToken } from './ExpoNotifications';

const AddPlantyScreen = ({ navigation, route }) => {
    const userData = route.params?.user || null;
    const [token, setToken] = useState(null);
    const plantyId = route.params?.plantyId || null;

	const [formData, setFormData] = useState({
		token_phone: '',
		user_planty: {
			plant_name: '',
			color_card: '',
			location: ''
		},
		plants_info_id: '',
		timezone: 0,
		phone_event: [{
			frequency: 0,
			event_type: 'TYPE_1',
			message: 'Regame'
		}]
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
        navigation.navigate('Plants', {user: userData});
      };

	const handlePhone_eventChange = (attribute, value) => {
		const newFormData = { ...formData.phone_event[0] };
		newFormData[attribute] = value;
		setFormData(prevFormData => ({
			...prevFormData,
			phone_event: [newFormData]
		}));
	};

	const sendDatatoCreate = async () => {
		const timezone = await requestLocation();
		formData.token_phone = token;
		formData.timezone = timezone;
		const user_id = userData.id;
		const planty_id = "368a2ae8-2563-4b13-91da-e41250d3c031";
		const response = await requestCreatePlanty(user_id, planty_id, formData, imagePicker);
        navigateToPlants();
	}

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row', width: "92%", justifyContent: 'space-evenly', alignSelf: 'center' }}>
				<PictureComp onPickerResult={(image) => handleImagePicker(image)} />
				<ColorPicker onColorSelected={(color) => handleUser_plantyChange('color_card', color)} />
			</View>
			<PlantPicker OnSelectedPlant={(selectedPlant) => formData.plants_info_id = selectedPlant.id} />
			<View style={commonStyles.inputContainers}>
				<TextInput
					placeholder="Choose its name..."
					style={{ marginLeft: 10, marginVertical: 10 }}
					onChangeText={(text) => handleUser_plantyChange("plant_name", text)}
				/>
			</View>
			<View style={commonStyles.inputContainers}>
				<WateringPeriod onSelectedPeriod={(item) => handlePhone_eventChange("frequency", item.value)} />
			</View>
			<PlantDescription />
			<View style={commonStyles.inputContainers}>
				<PlantLocation onSelectedPlantLocation={(location) => handleUser_plantyChange("location", location.label)} />
			</View>
			<View style={commonStyles.addDeviceButton} >
				<View>
					{/* <Button title='Connect a Device to your Plant' onPress={navigateToDeviceConnection} /> */}
				</View>
				<View style={{
					marginTop: 20,
					height: 70,
				}}>
					<Button title='Add your Plant' onPress={sendDatatoCreate} />
				</View>
			</View>
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
