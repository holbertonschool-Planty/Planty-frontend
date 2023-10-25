import React, { useState } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';

function PlantPicker() {
	const [searchText, setSearchText] = useState('');
	const [filteredPlants, setFilteredPlants] = useState([]);
	const [viewHeight, setViewHeight] = useState(60);
	const [selectedPlant, setSelectedPlant] = useState(null);
	const [isPlantSelected, setIsPlantSelected] = useState(false);
	const [showNoResults, setShowNoResults] = useState(false);

	const plantData = [
		{ label: 'Rosa', value: 'rosa' },
		{ label: 'Lavanda', value: 'lavanda' },
		{ label: 'Orquídea', value: 'orquidea' },
		{ label: 'Tomillo', value: 'tomillo' },
		{ label: 'Helecho', value: 'helecho' },
		{ label: 'Cactus', value: 'cactus' },
		{ label: 'Geranio', value: 'geranio' },
		{ label: 'Margarita', value: 'margarita' },
		{ label: 'Bambú', value: 'bambu' },
		{ label: 'Suculenta', value: 'suculenta' }
		// Agrega más plantas según tus necesidades
	];

	const handleSearch = (text) => {
		setSearchText(text);
		const filtered = plantData.filter((plant) =>
			plant.label.toLowerCase().includes(text.toLowerCase())
		);
		setFilteredPlants(filtered);

		if (filtered.length > 0) {
			setShowNoResults(false); // Si hay resultados, oculta "No results found"
			setViewHeight(180); // Altura cuando hay resultados
		} else {
			setViewHeight(60); // Altura cuando no hay resultados
			setShowNoResults(true); // Si no hay resultados, muestra "No results found"
		}

		if (text === '') {
			setViewHeight(60); // Restablece la altura a 60 cuando el texto está vacío
			setShowNoResults(!isPlantSelected);
		}

	};

	const handlePlantSelection = (plant) => {
		setSelectedPlant(plant);
		setIsPlantSelected(true);
		setViewHeight(60);
		setSearchText(plant.label);
		// Puedes realizar otras acciones con la planta seleccionada
	};

	const renderSelectedPlant = () => {
		if (selectedPlant) {
			return (
				<View style={{ padding: 10, backgroundColor: '#eee', justifyContent: 'center' }}>
					<Text>{selectedPlant.label}</Text>
				</View>
			);
		}
		return null; // No mostrar nada si no se ha seleccionado una planta
	};

	return (
		<View
			style={{
				height: viewHeight,
				elevation: 5,
				marginTop: 20,
				borderRadius: 8,
				backgroundColor: '#fff',
				justifyContent: 'center',
				alignSelf: 'center',
				width: '82%',
			}}
		>
			{isPlantSelected ? (
				<View style={{ padding: 10, backgroundColor: '#eee', justifyContent: 'center', height: 60, borderRadius: 8, }}>
					<Text>{selectedPlant.label}</Text>
				</View>
			) : (
				<TextInput
					style={{ marginLeft: 10, marginVertical: 10 }}
					placeholder="Select your plant"
					value={searchText}
					onChangeText={handleSearch}
				/>
			)}
			<FlatList
				data={filteredPlants}
				renderItem={({ item }) => (
					<Text
						style={{
							padding: 10,
							borderBottomWidth: 1,
							borderColor: '#ccc',
						}}
						onPress={() => handlePlantSelection(item)}
					>
						{item.label}
					</Text>
				)}
				keyExtractor={(item) => item.value}
				style={{ display: searchText && !isPlantSelected ? 'flex' : 'none' }}
			/>
		</View>
	);
}

export default PlantPicker;