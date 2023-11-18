import * as React from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import EmptyCardMessage from "./EmptyMessage";


function NotificationCard({ user, navigation }) {
  const [todayButtonsEnabled, setTodayButtonsEnabled] = useState([false, false, false, false, false]);
  const [checkButtonsEnabled, setCheckButtonsEnabled] = useState([false, false, false, false, false]);
  const [todayButtonBackgroundColor, setTodayButtonBackgroundColor] = useState('#38CE61');
  const [checkButtonBackgroundColor, setCheckButtonBackgroundColor] = useState('#38CE61');
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const [exist_plant, setExist_plant] = useState(false);
  
  React.useEffect(() => {
    const loadData = () => {
      setLoading(true);
      setExist_plant(false);
      if (user && user.id) {
        axios
          .get(`https://api.plantyit.tech/api/users_planty/${user.id}/check_values/`)
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {})
          .finally(() => {
            setLoading(false);
          });
  
        axios
          .get(`https://api.plantyit.tech/api/users_planty/${user.id}`)
          .then((response) => {
            setExist_plant(true);
          })
          .catch((error) => {})
          .finally(() => {
            setLoading(false);
          });
      }
    };
    const focusListener = navigation.addListener('focus', () => {
      loadData();
    });
    return () => {
      focusListener.Remove();
    };
  }, [navigation, user]);
  

  const iconMappings = {
    "The plant needs more light.": () => <EntypoIcons name="light-up" size={30} color="#252423" />,
    "The plant needs less sunlight.": () => <EntypoIcons name="light-down" size={30} color="#252423" />,
    "The temperature is too low": () => <FontAwesome5Icons name="temperature-low" size={30} color="#252423" />,
    "The temperature is too high": () => <FontAwesome5Icons name="temperature-high" size={30} color="#252423" />,
    "The plant needs less watering.": () => <MaterialCommunityIcons name="water-minus-outline" size={30} color="#252423" />,
    "The plant needs more watering.": () => <MaterialCommunityIcons name="water-plus-outline" size={36} color="#252423" />,
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="green" style={{ justifyContent: 'center', marginTop: '50%' }} />
    );
  } else if (exist_plant && (!data || data.length === 0)) {
    return (
      <EmptyCardMessage user={user} message={"No notifications. Your plant is doing well. Keep it up!"} status={0}/>
    );
  } else if (!exist_plant && (!data || data.length === 0)) {
    return (
      <EmptyCardMessage user={user} message={"Add your first plant!"} status={1}/>
    )
  }

  const removeNotification = (index) => {
    // Simulamos la eliminación de la notificación después de 5 segundos
    setTimeout(() => {
      const updatedData = [...data];
      updatedData.splice(index, 1); // Eliminamos la notificación en el índice dado
      setData(updatedData);
    }, 3000);
  };

  return (
    <View>
      {data.map((item, index) => (
        <View key={index} style={styles.cardContainer}>
          <View style={styles.squarecards}>
            <View style={styles.titlecard}>
              {iconMappings[item.info] && iconMappings[item.info]()}
              <Text style={styles.titleText}>{item.name} - {item.info}</Text>
            </View>
            <View style={styles.textPlant}>
              <View style={styles.imageProp}>
                <Image style={styles.imagecard} source={{ uri: item.imageSource }} />
              </View>
              <View style={styles.textContainer}>
                <Text numberOfLines={2} ellipsizeMode="tail" style={styles.plantName}>
                  {item.text}
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
                <MaterialCommunityIcons
                  name={todayButtonsEnabled[index] ? 'clock-alert' : 'clock-outline'}
                  size={24}
                  color={todayButtonsEnabled[index] ? 'green' : 'green'}
                />
                <Text style={[styles.buttonText, { color: 'green' }]}>Today </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonDay,
                  {
                    backgroundColor: checkButtonsEnabled[index]
                      ? checkButtonBackgroundColor
                      : '#F2DF2E',
                  },
                ]}
                onPress={() => {
                  const updatedButtons = [...checkButtonsEnabled];
                  updatedButtons[index] = !checkButtonsEnabled[index];
                  setCheckButtonsEnabled(updatedButtons);

                  removeNotification(index);
                }}
              >
                <Text style={[styles.buttonText, { color: '#fff' }]}> Check</Text>
                <MaterialCommunityIcons
                  name={checkButtonsEnabled[index] ? 'clock-check' : 'clock-outline'}
                  size={24}
                  color={checkButtonsEnabled[index] ? 'white' : 'white'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

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
    marginLeft: 32,
    fontSize: 20,
    fontWeight: '600',
    alignItems: 'center',
    color: '#252423',
  },

  icon: {
    marginLeft: 16,
    marginTop: 0,
  },

  titlecard: {
    fontSize: 22,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 20
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
    fontSize: 18,
  },

  text: {
    marginBottom: 10,
    fontSize: 16,
  },

  imagecard: {
    justifyContent: 'center',
    width: 56,
    height: 56,
  },

  imageProp: {
    borderRadius: 50,
    overflow: 'hidden',
  },

  textPlant: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '30%',
    marginLeft: 10,
  },

  textContainer: {
    width: '65%',
    marginLeft: 16,
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
    alignSelf: 'center',
    justifyContent: 'space-between',
  },

  squarecards: {
    alignSelf: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: "#000",
    elevation: 6,
    height: 180,
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
    padding: 14,
    paddingHorizontal: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonDay: {
    color: '#FFFFFF',
    flexDirection: 'row',
    width: '30%',
    padding: 6,
    borderRadius: 16,
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
    fontSize: 16,
    fontWeight: '600',
    justifyContent: 'center',
    color: '#444',
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