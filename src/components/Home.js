import React, { useEffect, useState } from 'react';
import { View, ScrollView, Modal, TouchableOpacity, Text, Button } from 'react-native';
import SearchComp from './SearchComp.js';
import NavigationBar from './navigationBar';
import NotificationCard from './notificationCard';
import { commonStyles } from './styles';

const HomeScreen = ({ navigation }) => {
  const [showSearchResults, setShowSearchResults] = useState(false);

  return (
    <View style={commonStyles.container}>
      <SearchComp onSearch={setShowSearchResults} />
      <ScrollView contentContainerStyle={commonStyles.scrollViewContent}>
        <View style={commonStyles.content}>
          <Text style={commonStyles.homeActivity}>Activity</Text>
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
            <Modal
        animationType="slide"
        transparent={true}
        visible={showSearchResults}
      >
        <View style={commonStyles.modalContainer}>
          <ScrollView style={commonStyles.modalContent}>
            {/* Contenido de los resultados de búsqueda */}
            <TouchableOpacity onPress={() => setShowSearchResults(false)}>
              <Text>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

export default HomeScreen;
