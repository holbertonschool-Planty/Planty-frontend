import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const periods = [
	{ label: 'Every 1 Day', value: 1 },
	{ label: 'Every 2 Days', value: 2 },
	{ label: 'Every 3 Days', value: 3 },
	{ label: 'Weekly', value: 7 },
	{ label: 'Every 2 Weeks', value: 14 },
	{ label: 'Monthly', value: 30 },
];

const WateringPeriod = ({ onSelectedPeriod }) => {
	const [selectedPeriod, setSelectedPeriod] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [textColor, setTextColor] = useState('#666');
	const modalRef = useRef(null);

	const renderSelectedPeriod = () => (
		<TouchableOpacity onPress={() => setModalVisible(true)}>
			<Text style={[styles.renderPeriod, { color: textColor }]}>{selectedPeriod ? selectedPeriod.label : 'Watering notification period...'}</Text>
		</TouchableOpacity>
	);

	const renderPeriodItem = ({ item }) => (
		<TouchableOpacity onPress={() => {
			setSelectedPeriod(item);
			setTextColor('#252423'); // Cambia el color del texto al seleccionar un período
			setModalVisible(false);
            onSelectedPeriod(item);
		}}>
			<Text style={styles.labels}>{item.label}</Text>
		</TouchableOpacity>
	);

	const closeModal = () => {
		setModalVisible(false);
	};


	return (
		<View>
			{renderSelectedPeriod()}
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<View style={styles.options}>
						<FlatList
							data={periods}
							renderItem={renderPeriodItem}
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
	renderPeriod: {
		marginLeft: 10,
	}
});

export default WateringPeriod;