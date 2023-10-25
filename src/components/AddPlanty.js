import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import PictureComp from './PictureComp';
import ColorPicker from './ColorPicker';
import PlantPicker from './PlantPicker';
import WateringPeriod from './WateringNotificationPeriod';
import PlantDescription from './PlantDescription';
import PlantLocation from './PlantLocation';
import { commonStyles } from './styles';

const AddPlantyScreen = ({ navigation }) => {
	const [selectedPeriod, setSelectedPeriod] = useState(null);
	const [selectedLocation, setSelectedLocation] = useState(null);

	const handlePeriodSelect = (value) => {
		setSelectedPeriod(value);
	};

	const handleLocationSelect = (value) => {
		setSelectedLocation(value);
	};

	const navigateToDeviceConnection = () => {
		navigation.navigate('Add your device');
	};

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row', width: "92%", justifyContent: 'space-evenly', alignSelf: 'center' }}>
				<PictureComp />
				<ColorPicker />
			</View>
			<PlantPicker />
			<View style={commonStyles.inputContainers}>
				<TextInput placeholder="Choose its name..." style={{ marginLeft: 10, marginVertical: 10, }} />
			</View>
			<View style={commonStyles.inputContainers}>
				<WateringPeriod selectedPeriod={selectedPeriod} onSelect={handlePeriodSelect} />
			</View>
			<PlantDescription />
			<View style={commonStyles.inputContainers}>
				<PlantLocation selectedLocation={selectedLocation} onSelect={handleLocationSelect} />
			</View>
			<View style={commonStyles.addDeviceButton} >
				<Button title='Connect a Device to your Plant' onPress={navigateToDeviceConnection} style={{ borderRadius: 20 }} />
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