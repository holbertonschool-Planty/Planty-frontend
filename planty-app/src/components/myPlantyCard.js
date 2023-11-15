import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomAlert from './CustomAlert';

function MyPlantyCard({ user, refreshKey, setRefreshKey }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    if (user) {
      console.log('alala');
      // Realiza solicitudes GET para obtener datos de planta para cada usuario
      axios.get(`https://api.plantyit.tech/api/users_planty/${user.id}`)
        .then(response => {
          // Una vez que la solicitud se completa con éxito, actualiza userData con los datos.
          setUserData(response.data);
        })
        .catch(error => {
          if (error.status === 404) {
            setUserData([])
          }
        })
        .finally(() => {
          setLoading(false); // Indica que la carga ha finalizado, independientemente de si fue exitosa o no
        });
    }
  }, [refreshKey, user]);

  const handleTrashIconPress = (userDeviceId) => {
    axios.delete(`https://api.plantyit.tech/api/users_planty/${userDeviceId}/`)
      .then(response => {
        // Una vez que la solicitud se completa con éxito, actualiza userData con los datos.
        setRefreshKey(refreshKey + 1);
        // Mostrar la alerta personalizada
        setAlertMessage('Planty eliminada correctamente');
        setShowAlert(true);
      })
      .catch(error => {
        // Maneja errores, por ejemplo, muestra un mensaje de error al usuario.
        console.error('Error in the request', error);
      });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="green" style={{ justifyContent: 'center', marginTop: '50%' }} />
      ) : (
        userData.map((user, index) => (
          <View key={index} style={styles.squarecards}>
            <View style={{
              backgroundColor: user.color_card,
              alignSelf: 'center',
              flexDirection: 'column',
              borderRadius: 20,
              height: 160,
              width: '100%',
            }}>
              <View style={styles.titlecard}>
                <Text style={styles.titleText}>{user.plant_name}</Text>
                <TouchableOpacity onPress={() => handleTrashIconPress(user.id)} style={styles.IconCards}>
                  <Icon name="trash-can-outline" size={32} color="black" />
                </TouchableOpacity>
              </View>
              <View style={styles.textPlant}>
                <View style={styles.imageProp}>
                  <Image style={styles.imagecard} source={{ uri: user.image_url }} />
                </View>
                <View style={styles.textContainer}>
                  <Text numberOfLines={2} ellipsizeMode="tail" style={styles.plantName}>
                    Scientific Name: {user.planty.plants_info.scientific_name}
                  </Text>
                  <Text numberOfLines={2} ellipsizeMode="tail" style={styles.plantName}>
                    Location: {user.location}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))
      )}
      {/* Coloca el componente CustomAlert fuera del bucle map */}
      <CustomAlert
        visible={showAlert}
        message={alertMessage}
        onClose={() => setShowAlert(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		zIndex: 1,
		marginTop: 10,
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
		justifyContent: 'space-between',
	},

	IconCards: {
		marginRight: 16,
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
		width: 80,
		height: 80,
	},

	imageProp: {
		borderRadius: 10,
		overflow: 'hidden',
		width: 80,
	},

	textPlant: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		height: '50%',
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
		height: 160,
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