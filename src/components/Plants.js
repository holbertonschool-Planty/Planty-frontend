import React from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import NavigationBar from './navigationBar';
import { commonStyles } from './styles';

const PlantsScreen = ({ navigation }) => {
  const navigateToPlantAddition = () => {
    navigation.navigate('Add your plant');
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.headings}>My plants</Text>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      </ScrollView>
      <View style={commonStyles.addButton} >
        <Button title='Add a Plant' onPress={navigateToPlantAddition} style={{ borderRadius: 20 }} />
      </View>
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

export default PlantsScreen;
