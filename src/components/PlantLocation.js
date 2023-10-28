import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { commonStyles } from './styles';

const locations = [
	{ label: 'Bedroom', value: '1' },
	{ label: 'Kitchen', value: '2' },
	{ label: 'Living Room', value: '3' },
	{ label: 'Back yard', value: '4' },
	{ label: 'Front yard', value: '5' },
];

const PlantLocation = ({ onSelectedPlantLocation }) => {
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [textColor, setTextColor] = useState('#666');
	const modalRef = useRef(null);

	const renderSelectedLocation = () => (
		<TouchableOpacity onPress={() => setModalVisible(true)}>
			<Text style={[styles.renderLocation, { color: textColor }]}>{selectedLocation ? selectedLocation.label : 'Choose its location...'}</Text>
		</TouchableOpacity>
	);

	const renderLocationItem = ({ item }) => (
		<TouchableOpacity onPress={() => {
			setSelectedLocation(item);
			setTextColor('#252423'); // Cambia el color del texto al seleccionar un período
			setModalVisible(false);
            onSelectedPlantLocation(item);
		}}>
			<Text style={styles.labels}>{item.label}</Text>
		</TouchableOpacity>
	);

	const closeModal = () => {
		setModalVisible(false);
	};


	return (
		<View>
			{renderSelectedLocation()}
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<View style={styles.options}>
						<FlatList
							data={locations}
							renderItem={renderLocationItem}
							keyExtractor={(item) => item.value}
						/>
						<TouchableOpacity onPress={closeModal}>
							<Text style={styles.closingTag}>Close</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	options: {
		backgroundColor: 'white',
		borderRadius: 8,
		borderBottomColor: '#252423',
		width: '82%',
		height: 300,
		elevation: 6,
	},
	labels: {
		padding: 10,
		borderBottomWidth: 1,
		borderColor: '#ccc',
	},
	closingTag: {
		alignSelf: 'center',
		justifyContent: 'center',
		marginBottom: 20,
	},
	renderLocation: {
		marginLeft: 10,
	}
});

export default PlantLocation;