import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, FlatList } from 'react-native';
import { commonStyles } from './styles';
import { PictureComp } from './PictureComp';

const paletteColors = ['#AAFBB7', '#F8FFAD', '#E84444', '#FD964B', '#87C290', '#AFEAEA', '#D68FB5', '#B28FD6'];

const ColorPicker = () => {
	const [selectedColor, setSelectedColor] = useState(null);

	const paletteColorsTop = paletteColors.slice(0, 4);
	const paletteColorsBottom = paletteColors.slice(4, 8);

	return (
		<View style={styles.container}>
			<Text style={styles.pickHeading}>Pick a card color</Text>
			<View style={styles.colorPalette}>
				<View style={styles.colorRow}>
					{paletteColorsTop.map((color, index) => (
						<TouchableOpacity
							key={index}
							style={[
								styles.colorCircle,
								{ backgroundColor: color, borderColor: selectedColor === color ? 'black' : 'transparent' }
							]}
							onPress={() => setSelectedColor(color)}
						/>
					))}
				</View>
				<View style={styles.colorRow}>
					{paletteColorsBottom.map((color, index) => (
						<TouchableOpacity
							key={index + 4} // Agrega un offset para la clave única
							style={[
								styles.colorCircle,
								{ backgroundColor: color, borderColor: selectedColor === color ? 'black' : 'transparent' }
							]}
							onPress={() => setSelectedColor(color)}
						/>
					))}
				</View>
			</View>
			<View style={styles.selectedColorPreview}>
				{selectedColor && (
					<View style={[styles.selectedColor, { backgroundColor: selectedColor }]} />
				)}
			</View>
		</View>
	);
};

function AddPlanty() {
	return (
	<View style={{ flexDirection: 'row', width: "92%", justifyContent: 'space-evenly', alignSelf: 'center' }}>
		<PictureComp />
		<ColorPicker />
		<PlantPicker />
	</View>
	);
}

function PlantPicker() {
	const [searchText, setSearchText] = useState('');
	const [filteredPlants, setFilteredPlants] = useState([]);
	const [viewHeight, setViewHeight] = useState(60);

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

		// Ajusta la altura de la View según si hay resultados o no
		setViewHeight(text ? 120 : 60);
	};

	const handlePlantSelection = (plant) => {
		setSearchText(plant.label);
		// Puedes realizar otras acciones con la planta seleccionada
	};

	return (
		<View
			style={{
				height: viewHeight, // Altura dinámica
				elevation: 5,
				marginTop: 20,
				borderRadius: 5,
				backgroundColor: '#fff',
				justifyContent: 'center',
				alignSelf: 'center',
				width: '82%',
			}}
		>
			<TextInput
				style={{ marginLeft: 10, marginVertical: 10, }}
				placeholder="Select your plant"
				value={searchText}
				onChangeText={handleSearch}
			/>
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
				style={{ display: searchText ? 'flex' : 'none' }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 8,
		backgroundColor: '#FFFFFF',
		shadowColor: '#000',
		width: 200,
		height: 120,
		borderRadius: 10,
		marginTop: 10,
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

export default AddPlanty;