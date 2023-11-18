import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const paletteColors = ['#c6f7ce', '#f1f7b2', '#ed5f5f', '#f09662', '#91cc9a', '#b1f0f0', '#dea4c3', '#c39deb'];

function ColorPicker({ onColorSelected }) {
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
							onPress={() => { 
                                setSelectedColor(color);
                                onColorSelected(color);
                            }}
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
							onPress={() => { 
                                setSelectedColor(color);
                                onColorSelected(color);
                            }}
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
		flexDirection: 'row',
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

export default ColorPicker;