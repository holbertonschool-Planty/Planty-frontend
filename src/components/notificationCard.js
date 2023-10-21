import * as React from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';

import { useState } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function NotificationCard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [todayButtonsEnabled, setTodayButtonsEnabled] = useState([false, false, false, false, false]);
  const [checkButtonsEnabled, setCheckButtonsEnabled] = useState([false, false, false, false, false]);
  const [todayButtonBackgroundColor, setTodayButtonBackgroundColor] = useState('#38CE61');
  const [checkButtonBackgroundColor, setCheckButtonBackgroundColor] = useState('#38CE61');

  const data = [
    {
      id: 1,
      info: 'Secso',
      text: 'Se basa en estar basado y hacer cosas rarasn estar basado y hacer cosas raras',
      imageSource: require('../img/gif2.gif'),
    },
    {
      id: 2,
      info: 'Rega la Plantita Pibe',
      text: 'Amigo que te cuesta darle 2 gotas de agua al cactus por mes????',
      imageSource: require('../img/gif2.gif'),
    },
    {
      id: 3,
      info: 'Tirame la que me crece',
      text: 'Ya no se me ocurre nada gente son las 6am y salio el sol',
      imageSource: require('../img/gif2.gif'),
    },
    {
      id: 4,
      info: 'Tirame la que me crece',
      text: 'Ya no se me ocurre nada gente son las 6am y salio el sol',
      imageSource: require('../img/gif2.gif'),
    },
    {
      id: 5,
      info: 'Tirame la que me crece',
      text: 'Ya no se me ocurre nada gente son las 6am y salio el sol',
      imageSource: require('../img/gif2.gif'),
    },
  ];

  const filteredData = data.filter(item => {
    return item.text.toLowerCase().includes(searchQuery.toLowerCase());
  });
  return (

    filteredData.map((item, index) => (
      <View key={index} style={styles.cardContainer}>
        <View style={styles.squarecards}>
          <View style={styles.titlecard}>
            <Icon name="water-alert" size={32} color="#252423" style={styles.icon} />
            <Text style={styles.titleText}>{item.info}</Text>
          </View>
          <View style={styles.textPlant}>
            <View style={styles.imageProp}>
              <Image style={styles.imagecard} source={item.imageSource} />
            </View>
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
                size={24}
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
                size={24}
                color={checkButtonsEnabled[index] ? 'green' : 'green'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    zIndex: 1,
  },

  scrollContent: {
    zIndex: 1,
  },

  titleText: {
    marginLeft: 24,
    fontSize: 25,
    alignItems: 'center',
    color: '#252423',
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
    justifyContent: 'center',
    width: 48,
    height: 48,
  },

  imageProp: {
    borderRadius: 50,
    overflow: 'hidden',
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
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 3,
    height: 200,
    width: '96%',
  },

  cardContainer: {
    alignSelf: 'center',
    width: '96%',
    marginBottom: 10,
    marginTop: 10,
    zIndex: 1,
  },

  buttonactivity: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonDay: {
    color: '#FFFFFF',
    flexDirection: 'row',
    width: '30%',
    padding: 6,
    borderRadius: 100,
    justifyContent: 'space-around',
  },
  buttonCheck: {
    backgroundColor: '#FFFFFF',
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
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },

  centeredText: {
    fontSize: 24,
    textAlign: 'center',
  },
});

export default NotificationCard;