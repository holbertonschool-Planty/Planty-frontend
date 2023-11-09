import React, { useState } from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { commonStyles } from './styles';


const RegisterUser = ({ navigation }) => {

	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const handleRegisterPress = async () => {
		// Navegar a la pantalla "Home"
		if (!username || !email || !password || !confirmPassword) {
			// Mostrar un mensaje de error al usuario
			alert('All fields are required');
			return;
		};

		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		if (!emailRegex.test(email)) {
			// Mostrar un mensaje de error al usuario
			alert('You need to put a valid email');
			return;
		};

		if (password !== confirmPassword) {
			// Mostrar un mensaje de error al usuario
			alert('Passwords do not match');
			return;
		};

		const user = {
			name: username,
			email,
			password,
		};

		try {
			// Realizar la solicitud POST a la API
			const response = await fetch('https://api.plantyit.tech/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			});

			if (response.status === 201) {
				// Éxito: El usuario se creó correctamente
				alert('User created successfully');
				navigation.navigate('LoginUser'); // O navega a la pantalla de inicio de sesión
			} else {
				// Error: No se pudo crear el usuario
                const data = await response.json();
				alert(data.detail);
			}
		} catch (error) {
			console.error('Error:', error);
			alert('Failed');
		}
	};


	const handleAlreadyRegisteredPress = () => {
		navigation.navigate('LoginUser');
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
					placeholder="Your email"
					style={{ marginLeft: 10, marginVertical: 10, flex: 1, }}
					onChangeText={(text) => setEmail(text)}
				/>
			</View>
			<View style={styles.inputContainers}>
				<Icon name="account-outline" size={24} style={styles.icon} />
				<TextInput
					placeholder="Your user name"
					style={{ marginLeft: 10, marginVertical: 10, flex: 1, }}
					onChangeText={(text) => setUsername(text)}
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
			<View style={styles.inputContainers}>
				<Icon name="lock-outline" size={24} style={styles.icon} />
				<TextInput
					placeholder="Confirm password"
					secureTextEntry={!showPassword}
					style={{ marginLeft: 10, marginVertical: 10, flex: 1, }}
					onChangeText={(text) => setConfirmPassword(text)}
				/>
				<TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
					<Icon
						name={showPassword ? "eye-off" : "eye"}
						size={24}
						style={{ ...styles.icon, color: '#474A47' }}
					/>
				</TouchableOpacity>
			</View>
			<View style={{ marginVertical: 20 }}>
				<Text style={{ textAlign: 'center', color: '#239EF8', textDecorationLine: 'underline' }} onPress={handleAlreadyRegisteredPress}>Already have an account? Log in</Text>
			</View>
			<View style={commonStyles.inputContainersUser}>
				<TouchableOpacity onPress={handleRegisterPress}>
					<Text style={styles.userButton} >Create account</Text>
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

export default RegisterUser;
