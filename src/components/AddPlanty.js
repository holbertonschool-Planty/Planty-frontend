import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const paletteColors = ['#AAFBB7', '#F8FFAD', '#E84444', '#FD964B', '#87C290', '#AFEAEA', '#D68FB5', '#B28FD6'];

const ColorPicker = () => {
	const [selectedColor, setSelectedColor] = useState(null);

	const paletteColorsTop = paletteColors.slice(0, 4);
	const paletteColorsBottom = paletteColors.slice(4, 8);

	return (
		<View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
	selectedColorPreview: {
		marginTop: 20,
	},
	selectedColor: {
		width: 64,
		height: 64,
		borderRadius: 50,
	},
});

export default ColorPicker;