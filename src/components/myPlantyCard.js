import React, { useState } from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function MyPlantyCard() {
	const [searchQuery, setSearchQuery] = useState('');

	const data = [
		{
			id: 1,
			color: '#AFEAEA',
			info: 'Menta',
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			imageSource: require('../img/flower.png'),
		},
		{
			id: 2,
			color: '#F8FFAD',
			info: 'Girasol',
			text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
			imageSource: require('../img/Nature.png'),
		},
		{
			id: 3,
			color: '#B28FD6',
			info: 'Rosa',
			text: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
			imageSource: require('../img/Womanholdingasunflower.png'),
		},
	];

	const filteredData = data.filter(item => {
		return item.text.toLowerCase().includes(searchQuery.toLowerCase());
	});
	return (

		filteredData.map((item, index) => (
			<View key={index} style={styles.cardContainer}>
				<View style={{
					backgroundColor: item.color,
					alignSelf: 'center',
					flexDirection: 'column',
					borderRadius: 20,
					shadowColor: "#000",
					elevation: 3,
					height: 180,
					width: '96%',
				}}>
					<View style={styles.titlecard}>
						<Text style={styles.titleText}>{item.info}</Text>
					</View>
					<View style={styles.textPlant}>
						<View style={styles.imageProp}>
							<Image style={styles.imagecard} source={item.imageSource} />
						</View>
						<View style={styles.textContainer}>
							<Text numberOfLines={2} ellipsizeMode="tail" style={styles.plantName}>
								{item.text}
							</Text>
						</View>
					</View>
				</View>
			</View>
		)));
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		zIndex: 1,
	},

	scrollContent: {
		zIndex: 1,
	},

	titleText: {
		marginLeft: 22,
		fontSize: 24,
		fontWeight: '600',
		alignItems: 'center',
		color: '#252423',
	},

	icon: {
		marginLeft: 16,
		marginTop: 0,
	},

	titlecard: {
		fontSize: 22,
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 12,
	},

	textemptycards: {
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 24,
	},

	centeredTextContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	plantName: {
		fontSize: 18,
	},

	text: {
		marginBottom: 10,
		fontSize: 16,
	},

	imagecard: {
		justifyContent: 'center',
		width: 48,
		height: 48,
	},

	imageProp: {
		borderRadius: 50,
		overflow: 'hidden',
	},

	textPlant: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		height: '30%',
		marginLeft: 10,
	},

	textContainer: {
		width: '65%',
		marginLeft: 16,
	},


	plantCard: {
		marginBottom: 20,
		alignSelf: 'center',
		width: '80%',
	},

	textActy: {
		color: '#22A546',
		fontSize: 20,
		textAlign: 'left',
		paddingTop: 10,
	},

	Activitycards: {
		alignSelf: 'center',
		justifyContent: 'space-between',
	},

	squarecards: {
		alignSelf: 'center',
		flexDirection: 'column',
		backgroundColor: '#FFFFFF',
		borderRadius: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.43,
		shadowRadius: 9.51,
		elevation: 3,
		height: 180,
		width: '96%',
	},

	cardContainer: {
		alignSelf: 'center',
		width: '96%',
		marginBottom: 10,
		marginTop: 10,
		zIndex: 1,
	},

	buttonactivity: {
		padding: 18,
		paddingHorizontal: 9,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	buttonDay: {
		color: '#FFFFFF',
		flexDirection: 'row',
		width: '30%',
		padding: 6,
		borderRadius: 16,
		justifyContent: 'space-around',
	},
	buttonCheck: {
		backgroundColor: '#FFFFFF',
		flexDirection: 'row',
		width: '30%',
		padding: 10,
		borderRadius: 20,
		justifyContent: 'space-around',
	},
	buttonText: {
		fontSize: 16,
		fontWeight: '600',
		justifyContent: 'center',
		color: '#444',
	},

	centeredTextContainer: {
		height: 300,
		justifyContent: 'center',
		alignItems: 'center',
	},

	centeredText: {
		fontSize: 24,
		textAlign: 'center',
	},
});

export default MyPlantyCard;