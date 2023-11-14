import React, { useState } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { commonStyles } from './styles';
import CheckBox from '@react-native-community/checkbox';
import { requestPostToken } from './RequestLogic';
import { getExpoPushToken } from './ExpoNotifications';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginUser = ({ navigation }) => {

	const [toggleCheckBox, setToggleCheckBox] = useState(false)
	const [password, setPassword] = React.useState('');
	const [email, setEmail] = useState('');
	const [showPassword, setShowPassword] = useState(false);

  const handleLoginPress = async () => {
    try {
      // Realiza una solicitud a la API para verificar las credenciales
      const response = await fetch('https://api.plantyit.tech/api/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}), // Cambia 'username' a 'identifier'
      });

      if (response.status === 200) {
        const data = await response.json();
        await AsyncStorage.setItem('userData', JSON.stringify(data));
        await AsyncStorage.setItem('userToken', data.token);
        (async () => {
          const token = await getExpoPushToken();
          console.log(token)
          const phoneData = requestPostToken(data.id, token);
        })();
        navigation.navigate('Home', {user: data});
      } else {
        // Las credenciales son incorrectas o el usuario no existe
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to log in');
    }
  };

    const togglePasswordVisibility = () => {
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true);
        }
    };

	return (
		<View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
			<Image style={styles.image} source={require('../img/Logo_App_Planty.png')} />
			<View style={styles.inputContainers}>
				<Icon name="email-outline" size={24} style={styles.icon} />
				<TextInput
					placeholder="Email"
					style={{ marginLeft: 10, marginVertical: 10, flex: 1, }}
					onChangeText={(text) => setEmail(text)}
				/>
			</View>
			<View style={styles.inputContainers}>
				<Icon name="lock-outline" size={24} style={styles.icon} />
				<TextInput
					placeholder="Password"
					secureTextEntry={!showPassword}
					style={{ marginLeft: 10, marginVertical: 10, flex: 1, }}
					onChangeText={(text) => setPassword(text)}
				/>
				<TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
					<Icon
						name={showPassword ? "eye-off" : "eye"}
						size={24}
						style={{ ...styles.icon, color: '#474A47' }}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.checkContainer}>
				<CheckBox
					disabled={false}
					value={toggleCheckBox}
					onValueChange={(newValue) => setToggleCheckBox(newValue)}
					style={styles.icon}
				/>
				<Text style={{ alignSelf: 'center', color: '#989898', marginLeft: 6 }} >Remember me</Text>
			</View>
			<View style={{ marginVertical: 20 }}>
				<Text style={{ textAlign: 'center', color: '#239EF8', textDecorationLine: 'underline' }} >Did you forget your password?</Text>
			</View>
			<View style={commonStyles.inputContainersUser}>
				<TouchableOpacity onPress={handleLoginPress}>
					<Text style={styles.userButton} >Log in</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({

	checkContainer: {
		alignSelf: 'flex-start',
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 20,
		marginLeft: '8%',
		backgroundColor: 'transparent'
	},
	checkbox: {
		width: 24,
		height: 24,
		backgroundColor: 'transparent'
	},

	inputContainers: {
		flexDirection: 'row',
		elevation: 5,
		marginBottom: 32,
		borderRadius: 10,
		backgroundColor: '#fff',
		alignSelf: 'center',
		width: '82%',
		height: 60,
	},

	icon: {
		color: '#22A546',
		position: 'relative',
		marginHorizontal: 10,
		alignSelf: 'center',
		justifyContent: 'center',
	},
	image: {
		alignSelf: 'center',
		marginVertical: '18%',
		width: '70%',
		height: 100,
	},
	userButton: {
		textAlign: 'center',
		color: '#fff',
		fontSize: 20,
	},
});

export default LoginUser;
