import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import NavigationBar from './navigationBar';
import { commonStyles } from './styles';

const connectionScreen = ({ navigation }) => {
  return (
    <View style={commonStyles.container}>
      <ScrollView contentContainerStyle={commonStyles.scrollViewContent}>
        <View style={commonStyles.content}>

        </View>
      </ScrollView>
      <View style={commonStyles.shadowContainer}>
        <View style={commonStyles.topLine}></View>
        <View style={commonStyles.bottomContainer}>
          <NavigationBar user={userData} name="Home" icon="home-variant" text="Home" navigation={navigation} />
          <NavigationBar user={userData} name="Plants" icon="sprout" text="Plants" navigation={navigation} />
          <NavigationBar user={userData} name="Calendar" icon="calendar" text="Calendar" navigation={navigation} />
          <NavigationBar user={userData} name="Settings" icon="cog" text="Settings" active={true} navigation={navigation} />
        </View>
      </View>
    </View>
  );
}

export default connectionScreen;