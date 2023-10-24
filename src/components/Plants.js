import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from 'react-native';
import NavigationBar from './navigationBar';
import { commonStyles } from './styles';

const PlantsScreen = ({ navigation }) => {
  const navigateToColorPicker = () => {
    navigation.navigate('ColorPicker'); // Asegúrate de que 'ColorPicker' sea el nombre de tu pantalla.
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.headings}>Add your plant</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      </ScrollView>
      <Button title='Add a Plant' onPress={navigateToColorPicker}></Button>
      <View style={commonStyles.shadowContainer}>
        <View style={commonStyles.topLine}></View>
        <View style={commonStyles.bottomContainer}>
          <NavigationBar name="Home" icon="home-variant" text="Home" navigation={navigation} />
          <NavigationBar name="Plants" icon="sprout" text="Plants" active={true} navigation={navigation} />
          <NavigationBar name="Calendar" icon="calendar" text="Calendar" navigation={navigation} />
          <NavigationBar name="Settings" icon="cog" text="Settings" navigation={navigation} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default PlantsScreen;
