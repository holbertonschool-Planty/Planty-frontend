import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function MyPlantyCard() {
	const [searchQuery, setSearchQuery] = useState('');
	const [userData, setUserData] = useState([]);

	useEffect(() => {
	  const userIDs = [
			'76bb808f-d1ec-42c2-be27-694b5747c2c5',
			// Agrega los IDs de usuarios aquí
	  ];

	  // Realiza solicitudes GET para obtener datos de planta para cada usuario
	  const requests = userIDs.map(userID => axios.get(`http://api.plantyit.tech/api/users_planty/${userID}`));
	
	  // Combina los resultados de las solicitudes en una lista de datos
	  Promise.all(requests)
		.then(responses => {
		  const combinedData = responses.map(response => response.data);
		  setUserData(combinedData);
		})
		.catch(error => {
		  console.error('Error al obtener datos de la API:', error);
		});
	}, []);
	
	return (
	  <View style={styles.container}>
		{userData.map((user, index) => (
		  <View key={index} style={styles.squarecards}>
			<View style={{
			  backgroundColor: user.color_card,
			  alignSelf: 'center',
			  flexDirection: 'column',
			  borderRadius: 20,
			  height: 180,
			  width: '100%',
			}}>
			  <View style={styles.titlecard}>
				<Text style={styles.titleText}>{user.plant_name}</Text>
			  </View>
			  <View style={styles.textPlant}>
				<View style={styles.imageProp}>
				  <Image style={styles.imagecard} source={{ uri: user.image_url }} />
				</View>
				<View style={styles.textContainer}>
				  <Text numberOfLines={2} ellipsizeMode="tail" style={styles.plantName}>
					Location: {user.location}
				  </Text>
				  <Text numberOfLines={2} ellipsizeMode="tail" style={styles.plantName}>
					User: {user.user.name}
				  </Text>
				</View>
			  </View>
			</View>
		  </View>
		))}
	  </View>
	);
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
		marginBottom: 20,
		height: 180,
		width: '96%',
	},

	cardContainer: {
		alignSelf: 'center',
		borderRadius: 20,
		width: '96%',
		marginBottom: 10,
		marginTop: 10,
		zIndex: 1,
		color: '#000',
		elevation: 8,
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