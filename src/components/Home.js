import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import SearchComp from './SearchComp.js';
import NavigationBar from './navigationBar';
import NotificationCard from './notificationCard';
import { commonStyles } from './styles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={commonStyles.container}>
      <SearchComp />
      <ScrollView contentContainerStyle={commonStyles.scrollViewContent}>
        <View style={commonStyles.content}>
          {/* Contenido específico de la pestaña de Plantas */}
          <NotificationCard />
        </View>
      </ScrollView>
      <View style={commonStyles.shadowContainer}>
        <View style={commonStyles.topLine}></View>
        <View style={commonStyles.bottomContainer}>
          <NavigationBar name="Home" icon="home-variant" text="Home" active={true} navigation={navigation} />
          <NavigationBar name="Plants" icon="sprout" text="Plants" navigation={navigation} />
          <NavigationBar name="Calendar" icon="calendar" text="Calendar" navigation={navigation} />
          <NavigationBar name="Settings" icon="cog" text="Settings" navigation={navigation} />
        </View>
      </View>
    </View>
  );
}

export default HomeScreen;