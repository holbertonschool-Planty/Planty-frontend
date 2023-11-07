import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { requestCheckToken } from './RequestLogic';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          const userData = await AsyncStorage.getItem('userData');
          const userDataJSON = JSON.parse(userData);
          const response = await requestCheckToken(userToken);
          if (response.status === 200) {
            navigation.navigate('Home', { user: userDataJSON });
          }
        } else {
          setTimeout(() => {
            navigation.navigate('RegisterUser');
          }, 3000);
        }
      } catch (error) {
        console.error("Error al verificar el token:", error);
        alert("Ocurrió un error al verificar el token");
      }
    };

    fetchData();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Animatable.View animation="zoomIn" duration={3000} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <Image source={require('../img/Logo_App_Planty.png')} style={{ height: 300 }} resizeMode="contain" />
      </Animatable.View>
    </View>
  );
};

export default LoadingScreen;