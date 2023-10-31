import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

const LoadingScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('RegisterUser');
        }, 3000);
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <Animatable.View animation="zoomIn" duration={3000} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <Image source={require('../img/Logo_App_Planty.png')} style={{ height: 300 }} resizeMode="contain" />
            </Animatable.View>
        </View>
    );
};

export default LoadingScreen;