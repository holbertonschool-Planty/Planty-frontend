import * as React from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  useState
}
  from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topcontent}>
        <View style={styles.contimage}>
          <Image
            style={styles.image}
            source={require('./img/Logo_App_Planty1.png')} />
        </View>

        <View style={styles.containertxt}>
          <TextInput
            style={styles.Inputext}
            placeholder='Search...'
          />
          <Icon name="magnify" size={45} color="#38CE61" style={styles.iconsearch} />
        </View >
        <View style={styles.plantCard}>
          <Text style={styles.textActy}>
            Activity
          </Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.home}>
          <Icon name="home" size={40} color="#38CE61" />
          <Text style={styles.text}>
            Home
          </Text>
        </View>

        <TouchableWithoutFeedback onPress={() => navigation.navigate('Plants')}>
          <View style={styles.home}>
            <Icon name="sprout" size={40} color="#252423" />
            <Text style={styles.text}>
              Plants
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => navigation.navigate('Calendar')}>

          <View style={styles.home}>
            <Icon name="calendar" size={40} color="#252423" />
            <Text style={styles.text}>
              Calendar
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => navigation.navigate('Settings')}>
          <View style={styles.home}>
            <Icon name="cog" size={40} color="#252423" />
            <Text style={styles.text}>
              Settings
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  bottomContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  topcontent: {
    flex: 1,
  },
  header: {
    width: "10%",
    backgroundColor: 'black',
  },
  home: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 10,
    fontSize: 14,
  },
  contimage: {
    alignItems: 'center',
    paddingTop: "10%",
  },
  image: {
    width: '70%',
  },
  containertxt: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '80%',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  Inputext: {
    flex: 1,
    height: 40,
    fontSize: 20,
  },
  plantCard: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: "gray",
    width: '80%',
    height: '10%',
  },
  textActy: {
    fontSize: 20,
  }
});

export default HomeScreen;