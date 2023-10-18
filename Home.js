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

import { useEffect } from "react";
import { Dimensions } from 'react-native';
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Platform } from 'react-native';
import { ScreenStackHeaderSearchBarView } from "react-native-screens";

function HomeScreen() {
  const [todayButtonsEnabled, setTodayButtonsEnabled] = useState([false, false, false, false, false]);
  const [checkButtonsEnabled, setCheckButtonsEnabled] = useState([false, false, false, false, false]);

  const [todayButtonBackgroundColor, setTodayButtonBackgroundColor] = useState('#38CE61');
  const [checkButtonBackgroundColor, setCheckButtonBackgroundColor] = useState('#38CE61');


  const [searchQuery, setSearchQuery] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const { height: screenHeight } = Dimensions.get('window');
  const cardHeight = screenHeight * 0.2;

  const navigation = useNavigation();
  const maxTextLength = 40;
  const originalText = 'planta con muchos caracteresaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
  const truncatedText = originalText.length > maxTextLength
    ? `${originalText.substring(0, maxTextLength)}...`
    : originalText;

  const data = [];

  const filteredData = data.filter(item => {
    return item.text.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ minHeight: screenHeight }}>
        <View style={styles.topcontent}>
          <View style={styles.contimage}>
            <Image
              style={styles.image}
              source={require('./img/Logo_App_Planty1.png')} />
          </View>
          <View style={styles.containertxt}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.Inputext}
                placeholder="Search..."
                onBlur={() => setSearchActive(false)}
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
              <TouchableWithoutFeedback onPress={() => setSearchActive(true)}>
                <Icon
                  name="magnify"
                  size={45}
                  color="#38CE61"
                  style={styles.iconsearch}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>

          <View style={styles.Activitycards}>
            <View style={styles.plantCard}>
              <Text style={styles.textActy}>
                Activity
              </Text>
            </View>
            <View style={styles.Activitycards}>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <View key={index} style={[styles.squarecards, { height: cardHeight }]}>
                    <View style={styles.titlecard}>
                      <Icon name="water-alert" size={40} color="#252423" style={styles.icon} />
                      <Text style={styles.titleText}> {' '}Activity</Text>
                    </View>
                    <View style={styles.textPlant}>
                      <Image
                        style={styles.imagecard}
                        source={item.imageSource}
                      />
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
                          // Copiar el estado actual
                          const updatedButtons = [...todayButtonsEnabled];
                          // Cambiar el estado solo para el elemento actual
                          updatedButtons[index] = !todayButtonsEnabled[index];
                          setTodayButtonsEnabled(updatedButtons);
                        }}
                      >
                        <Icon
                          name={todayButtonsEnabled[index] ? 'clock-alert' : 'clock-outline'}
                          size={30}
                          color={todayButtonsEnabled[index] ? 'green' : 'green'}
                        />
                        <Text
                          style={styles.buttonText}
                        >today</Text>

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
                          // Copiar el estado actual
                          const updatedButtons = [...checkButtonsEnabled];
                          // Cambiar el estado solo para el elemento actual
                          updatedButtons[index] = !checkButtonsEnabled[index];
                          setCheckButtonsEnabled(updatedButtons);
                        }}
                      >

                        <Text
                          style={[
                            styles.buttonText,
                            { color: 'black' },
                          ]}
                        > check</Text>
                        <Icon
                          name={checkButtonsEnabled[index] ? 'clock-check' : 'clock-outline'}
                          size={30}
                          color={checkButtonsEnabled[index] ? 'green' : 'green'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.emptytextcontainer}>
                  <Text style={styles.textemptycards}>Add your first plant!!</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  scrollContent: {
    flexGrow: 1,
    height: '100%',
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
  content: {
    flexGrow: 1,
    minHeight: screenHeight,
  },

  topcontent: {
    flex: 1,
  },

  textemptycards: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
  },
  emptytextcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },

  plantName: {
    fontSize: 20,
  },

  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  home: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    marginBottom: 10,
    fontSize: 14,
  },

  header: {
    width: "10%",
    backgroundColor: 'black',
  },

  contimage: {
    alignItems: 'center',
    marginTop: 20,
  },

  image: {
    marginTop: "10%",
    width: '70%',
  },

  imagecard: {
    backgroundColor: 'green',
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
    height: '40%',
  },

  textContainer: {
    flex: 1,
  },

  containertxt: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '90%',
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
    marginTop: 10,
  },

  Inputext: {
    flex: 1,
    fontSize: 20,
  },

  plantCard: {
    marginBottom: 20,
    alignSelf: 'center',
    width: '80%',
    height: '2%',
  },

  textActy: {
    height: 50,
    color: '#22A546',
    fontSize: 20,
    textAlign: 'left',
    paddingTop: 10,
    marginLeft: -20,
  },

  Activitycards: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '95%',
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
    marginTop: 20,
    marginBottom: 10,
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
  searchContainer: {
    width: '100%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 4,
  },

});

export default HomeScreen;
