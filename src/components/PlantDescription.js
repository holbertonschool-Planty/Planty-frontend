import React, { useState } from 'react';
import { View, StyleSheet, TextInput, } from 'react-native';
import { commonStyles } from './styles';


export default function PlantDescription() {

	return (
			<View style={commonStyles.inputContainers}>
				<TextInput placeholder="Write a description..." style={{ marginLeft: 10, marginVertical: 10, }} />
			</View>

	);
}