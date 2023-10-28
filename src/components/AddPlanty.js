import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import PictureComp from './PictureComp';
import ColorPicker from './ColorPicker';
import PlantPicker from './PlantPicker';
import WateringPeriod from './WateringNotificationPeriod';
import PlantDescription from './PlantDescription';
import PlantLocation from './PlantLocation';
import { commonStyles } from './styles';
import { requestCreatePlanty, requestUbication } from './RequestLogic';

const AddPlantyScreen = ({ navigation }) => {
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

	const navigateToDeviceConnection = () => {
		navigation.navigate('Add your device');
	};


    const handleImagePicker = (imagePicker) => {
        setImagePicker({
          uri: imagePicker.assets[0].uri,
          type: 'image/jpeg',
          name: imagePicker.assets[0].uri
        });
      }
    
      const handleUser_plantyChange = (attribute, value) => {
        const newUserData = {...formData.user_planty};
        newUserData[attribute] = value;

        setFormData(prevFormData => ({
            ...prevFormData,
            user_planty: newUserData
        }));
    };
    
      const handlePhone_eventChange = (attribute, value) => {
        const newFormData = {...formData.phone_event[0]};
        newFormData[attribute] = value;
        setFormData(prevFormData => ({
            ...prevFormData,
            phone_event: [newFormData]
          }));
      };
    
      const sendDatatoCreate = async () => {
        const ubication = await requestUbication();
        formData.token_phone = "ExpoToken[123123]"; //Falta hacer que sea dinamico implementando expo-notifications
        formData.timezone = ubication;
        const user_id = "53ec29c2-8328-4a24-a0f2-08f49040e344"; //Falta hacer que sea dinamico haciendo el Login y register
        const planty_id = "699bd4f7-0689-4e68-a064-b33111424a3a"; //Falta hacer que sea dinamico implementando lo de bluetooth
        const response = await requestCreatePlanty(user_id, planty_id, formData, imagePicker);
      }

      return (
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', width: "92%", justifyContent: 'space-evenly', alignSelf: 'center' }}>
            <PictureComp onPickerResult={(image) => handleImagePicker(image)} />
            <ColorPicker onColorSelected={(color) => handleUser_plantyChange('color_card', color)}/>
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
              <Button title='Connect a Device to your Plant' onPress={navigateToDeviceConnection} />
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