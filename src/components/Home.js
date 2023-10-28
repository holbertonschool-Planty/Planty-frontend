import React, { useEffect, useState } from 'react';
import { View, ScrollView, Modal, TouchableOpacity, Text, Button } from 'react-native';
import SearchComp from './SearchComp.js';
import NavigationBar from './navigationBar';
import NotificationCard from './notificationCard';
import { commonStyles } from './styles';
import { GoogleSignin, GoogleSigninButton,statusCodes} from '@react-native-google-signin/google-signin';


const HomeScreen = ({ navigation }) => {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [actualUser, SetActualUser] = useState();
  const [infoUser, SetInfoUser] = useState();



  getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    SetActualUser({ currentUser });
    console.log("a", currentUser);
  };

  signOut = async () => {
    try {
      await GoogleSignin.signOut();
      SetInfoUser({ user: null }); // Remember to remove the user from your app's state as well
      console.log("b")
    } catch (error) {
      console.error(error);
    }
  };
  
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      SetInfoUser(userInfo);
      console.log("A")
      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("ERROR CANCELLED")
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("ERROR INPROGRESS")
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("ERROR SERVICES")
    } else {
        console.log("ERROR NIDEA\n", JSON.stringify(error, null, 2));
        
      }
    }
  };

  useEffect(() => {
    request = GoogleSignin.configure({
        webClientId: "678386882303-r4tvvhp3cf5imko6qa9fvfuqv4u4l8c9.apps.googleusercontent.com"
    });
    service = GoogleSignin.hasPlayServices();
    console.log(request);
    console.log(service);
}, []);

  return (
    <View style={commonStyles.container}>
      <SearchComp onSearch={setShowSearchResults} />
      <ScrollView contentContainerStyle={commonStyles.scrollViewContent}>
        <View style={commonStyles.content}>
          <Text style={commonStyles.homeActivity}>Activity</Text>
            <Button title='Sign'  onPress={signIn}/>
            <Button title='Unsign'  onPress={signOut}/>
            <Button title='User?'  onPress={getCurrentUser}/>
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
