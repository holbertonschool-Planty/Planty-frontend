import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import NavigationBar from './navigationBar';
import { commonStyles } from './styles';
import ColorPicker from './AddPlanty';
import PictureComp from './PictureComp';

const PlantsScreen = ({ navigation }) => {
  return (
    <View style={commonStyles.container}>
      <PictureComp />
      <ColorPicker />
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
