import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Button, Modal, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationBar from './navigationBar';
import { commonStyles } from './styles';
import { Calendar } from 'react-native-calendars';
import EventCard from './EventCard';
import GraphCard from './Graphics';
import { getExpoPushToken } from './ExpoNotifications';
import { requestGetAllNotis } from './RequestLogic';
import DateComponent from './CalculateDays';
import NotificationCard from './notificationCard';


const CalendarScreen = ({ navigation, route, cardData, updateCardData }) => {
  const userData = route.params?.user || null;
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [idIncrement, setIdIncrement] = useState(0);
  const [events, setEvents] = useState([]);
  const [dataList, setDataList] = useState({});

  const handleDayPress = (day) => {
    const selectedDateString = day.dateString;
    if (dataList[selectedDateString]) {
      setSelectedDate(selectedDateString);
      setIsFormVisible(true);
    }
  };

  const getPlantsForSelectedDate = () => {
    const plantsArray = Object.values(cardData);

    return plantsArray.filter(plant => {
      return plant.date === selectedDate;
    });
  };

  const convertNotisArrayToDataList = (notisArray) => {
    const dataList = {};

    notisArray.forEach((notis) => {
      if (notis.event_type === "Watering Reminder") {
        const temp = DateComponent({ notis });
        if (!dataList[temp]) {
          dataList[temp] = [];
        }

        const dataItem = {
          id: notis.user_device.id,
          event_type: notis.event_type,
          message: notis.message,
          image: notis.user_device.image_url,
          name_plant: notis.user_device.plant_name,
          scientific_name: notis.user_device.planty.plants_info.scientific_name,
        };

        dataList[temp].push(dataItem);
      }
    });

    return dataList;
  };

  useEffect(() => {
    const element = async () => {
      console.log("AS")
      requestGetAllNotis(userData.id).then(data => {
        const newMarkedDates = data.reduce((accumulator, notis) => {
          const temp = DateComponent({ notis });
          accumulator[temp] = {
            selected: true,
            selectedColor: '#38CE61',
          };
          return accumulator;
        }, {});

        setMarkedDates({ ...markedDates, ...newMarkedDates });

        const dataList = convertNotisArrayToDataList(data);
        setDataList(dataList);
      });
    };

    element();
    //const focusListener = navigation.addListener('focus', () => {
    //  element();
    //});
    //return () => {
    //  focusListener.Remove();
    //};
  }, [navigation, userData]);

  const filterEventsByDate = () => {
    const filteredEvents = [];
    for (const eventId in cardData) {
      if (cardData.hasOwnProperty(eventId) && cardData[eventId].date === selectedDate) {
        filteredEvents.push(cardData[eventId]);
      }
    }
    return filteredEvents;
  };


  const saveEventData = () => {
    const selectedDateTime = new Date(selectedDate);
    const month = selectedDateTime.getMonth() + 1;
    const day = selectedDateTime.getDate() + 1;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedDate = `${formattedMonth}/${formattedDay}`;

    const newEvent = {
      date: selectedDate,
      name: selectedPlant,
      event: `${selectedEvent} - ${formattedDate}`,
      location: "Your location here",
      backgroundColor: ['#0D7028', '#38CE61'],
      image: require('../img/flower.png'),
      id: idIncrement,
    };
    setIdIncrement(idIncrement + 1);

    updateCardData([...cardData, newEvent]);

    setEvents([...events, newEvent]);
    setIsFormVisible(false);
  };

  const closeModal = () => {
    setIsFormVisible(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.calendarhead}>
        <Text style={commonStyles.headings}>
          Calendar
        </Text>
      </View>
      <ScrollView contentContainerStyle={commonStyles.scrollViewContent}>
        <View>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={markedDates}
            />
          </View>
        </View>
        <Text style={commonStyles.headings}>
          Graph
        </Text>
        <GraphCard user={userData} navigation={navigation} />
      </ScrollView>
      <Modal
        visible={isFormVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalCont}>
          <View style={styles.modalView}>
            <View style={styles.headerModal}>
              <Text style={styles.header}>Events of the day {selectedDate}</Text>
              <TouchableOpacity onPress={closeModal} style={{ marginHorizontal: -40, top: -9, left: 10 }}>
                <Icon name="times-circle" size={32} color="#38CE61" />
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', alignContent: "center", borderRadius: 12}}>
              <ScrollView style={{ alignContent: "center", borderRadius: 12}}>
                <EventCard events={dataList[selectedDate]} />
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>

      <View style={commonStyles.shadowContainer}>
        <View style={commonStyles.topLine}></View>
        <View style={commonStyles.bottomContainer}>
          <NavigationBar user={userData} name="Home" icon="home-variant" text="Home" navigation={navigation} />
          <NavigationBar user={userData} name="Plants" icon="sprout" text="Plants" navigation={navigation} />
          <NavigationBar user={userData} name="Calendar" icon="calendar" text="Calendar" active={true} navigation={navigation} />
          <NavigationBar user={userData} name="Settings" icon="cog" text="Settings" navigation={navigation} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  calendarhead: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventForm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventText: {
    fontSize: 20,
    marginBottom: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 12
  },
  EventsInput: {
    elevation: 10,
    backgroundColor: 'white',
    width: 300,
    height: 60,
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttoSave: {
    marginTop: 10,
    width: 250,
    height: 60,
    backgroundColor: '#38CE61',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  modalView: {
    width: '96%',
    margin: 40,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalCont: {
    marginVertical: 60,
  },
  headerModal: {
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    borderBottomWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    height: 60,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252423',
  },
});

export default CalendarScreen;