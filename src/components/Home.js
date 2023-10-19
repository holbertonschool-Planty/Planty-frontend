import * as React from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  screenHeight,
  TouchableOpacity,
  ViewBase,
} from 'react-native';

import { Dimensions } from 'react-native';
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchComp from "./searchBar";
import NavigationBar from './navigationBar';

function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [todayButtonsEnabled, setTodayButtonsEnabled] = useState([false, false, false, false, false]);
  const [checkButtonsEnabled, setCheckButtonsEnabled] = useState([false, false, false, false, false]);
  const [todayButtonBackgroundColor, setTodayButtonBackgroundColor] = useState('#38CE61');
  const [checkButtonBackgroundColor, setCheckButtonBackgroundColor] = useState('#38CE61');

  const [searchActive, setSearchActive] = useState(false);

  const navigation = useNavigation();

  const data = [
    {
      id: 1,
      text: 'Plant 1',
      imageSource: require('../img/gif2.gif'),
    },
    {
      id: 1,
      text: 'Plant 2',
      imageSource: require('../img/gif2.gif'),
    },
    {
      id: 1,
      text: 'Plant 2',
      imageSource: require('../img/gif2.gif'),
    },
  ];

  const filteredData = data.filter(item => {
    return item.text.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <SearchComp/>
      <ScrollView style={styles.scrollContent} contentContainerStyle={filteredData.length > 0}>
        {filteredData.length > 0 ? (
          <View style={styles.plantCard}>
            <Text style={styles.textActy}>Activity</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.topcontent}>
          <View style={styles.contimage}>
            <Image
              style={styles.image}
              source={require('../img/Logo_App_Planty1.png')} />
          </View>
        ) : (
          <View style={styles.centeredTextContainer}>
            <Text style={styles.centeredText}>Add your first plant!!</Text>
          </View>
        )}
        {filteredData.map((item, index) => (
          <View key={index} style={styles.cardContainer}>
            <View style={styles.squarecards}>
              <View style={styles.titlecard}>
                <Icon name="water-alert" size={40} color="#252423" style={styles.icon} />
                <Text style={styles.titleText}> {' '}Activity</Text>
              </View>
              <View style={styles.textPlant}>
                <Image style={styles.imagecard} source={item.imageSource} />
                <View style={styles.textContainer}>
                  <Text numberOfLines={2} ellipsizeMode="tail" style={styles.plantName}>
                    {'  '}{item.text}
                  </Text>
                </View>
              </View>
              <View style={styles.buttonactivity}>
                <TouchableOpacity
                  style={[
                    styles.buttonDay,
                    {
                      backgroundColor: todayButtonsEnabled[index]
                        ? todayButtonBackgroundColor
                        : '#38CE61',
                    },
                  ]}
                  onPress={() => {
                    const updatedButtons = [...todayButtonsEnabled];
                    updatedButtons[index] = !todayButtonsEnabled[index];
                    setTodayButtonsEnabled(updatedButtons);
                  }}
                >
                  <Icon
                    name={todayButtonsEnabled[index] ? 'clock-alert' : 'clock-outline'}
                    size={30}
                    color={todayButtonsEnabled[index] ? 'green' : 'green'}
                  />
                  <Text style={styles.buttonText}>today</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.buttonDay,
                    {
                      backgroundColor: checkButtonsEnabled[index]
                        ? checkButtonBackgroundColor
                        : '#38CE61',
                    },
                  ]}
                  onPress={() => {
                    const updatedButtons = [...checkButtonsEnabled];
                    updatedButtons[index] = !checkButtonsEnabled[index];
                    setCheckButtonsEnabled(updatedButtons);
                  }}
                >
                  <Text style={[styles.buttonText, { color: 'black' }]}> check</Text>
                  <Icon
                    name={checkButtonsEnabled[index] ? 'clock-check' : 'clock-outline'}
                    size={30}
                    color={checkButtonsEnabled[index] ? 'green' : 'green'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <NavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  scrollContent: {
    flex: 1,
  },

  titleText: {
    fontSize: 25,
    alignItems: 'center',
  },

  icon: {
    alignItems: 'flex-end',
    marginLeft: '2%',
  },

  titlecard: {
    marginTop: '2%',
    fontSize: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },

  textemptycards: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
  },

  centeredTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  plantName: {
    fontSize: 20,
  },


  text: {
    marginBottom: 10,
    fontSize: 14,
  },

  imagecard: {
    marginLeft: '2%',
    justifyContent: 'center',
    width: '12%',
    height: '60%',
    borderRadius: 50,
  },

  textPlant: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '35%',
  },

  textContainer: {
    width: '80%',
  },


  plantCard: {
    marginBottom: 20,
    alignSelf: 'center',
    width: '80%',
  },

  textActy: {
    color: '#22A546',
    fontSize: 20,
    textAlign: 'left',
    paddingTop: 10,
    marginLeft: -25,
  },

  Activitycards: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },

  squarecards: {
    alignSelf: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
    height: 220,
  },

  cardContainer: {
    marginBottom: 20,
  },

  buttonactivity: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonDay: {
    color: 'black',
    flexDirection: 'row',
    width: '30%',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'space-around',
  },
  buttonCheck: {
    backgroundColor: '#F2DF2E',
    flexDirection: 'row',
    width: '30%',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'space-around',
  },
  buttonText: {
    borderRadius: 10,
    alignSelf: 'flex-start',
    fontSize: 20,
    justifyContent: 'center',
  },

  centeredTextContainer: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },

  centeredText: {
    fontSize: 24,
    textAlign: 'center',
  },


});

export default HomeScreen;
