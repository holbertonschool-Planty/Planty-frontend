import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import NavigationBar from './navigationBar';
import { commonStyles } from './styles';

const CalendarScreen = ({ navigation }) => {
  return (
    <View style={commonStyles.container}>
      <ScrollView contentContainerStyle={commonStyles.scrollViewContent}>
        <View style={commonStyles.content}>
          {/* Contenido específico de la pestaña de Plantas */}
        </View>
      </ScrollView>
      <View style={commonStyles.shadowContainer}>
        <View style={commonStyles.topLine}></View>
        <View style={commonStyles.bottomContainer}>
          <NavigationBar name="Home" icon="home-variant" text="Home" navigation={navigation} />
          <NavigationBar name="Plants" icon="sprout" text="Plants" navigation={navigation} />
          <NavigationBar name="Calendar" icon="calendar" text="Calendar" active={true} navigation={navigation} />
          <NavigationBar name="Settings" icon="cog" text="Settings" navigation={navigation} />
        </View>
      </View>
    </View>
  );
}

export default CalendarScreen;