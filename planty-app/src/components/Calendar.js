import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Button, Modal, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationBar from './navigationBar';
import { commonStyles } from './styles';
import { Calendar } from 'react-native-calendars';
import EventCard from './EventCard';
import LinearGradient from 'react-native-linear-gradient';
import GraphCard from './Graphics';

const CalendarScreen = ({ navigation, route }) => {
  const userData = route.params?.user || null;
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [idIncrement, setIdIncrement] = useState(0);
  const [events, setEvents] = useState([]);

  const handleDayPress = (day) => {
    const selectedDateString = day.dateString;
    setSelectedDate(selectedDateString);
    setIsFormVisible(true);

    const selectedDateMarked = {
      [selectedDateString]: {
        selected: true,
        selectedColor: 'blue',
      },
    };
    setMarkedDates({ ...markedDates, ...selectedDateMarked });
  };



  const saveEventData = () => {
    const selectedDateTime = new Date(selectedDate);
    const month = selectedDateTime.getMonth() + 1;
    const day = selectedDateTime.getDate() + 1;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedDate = `${formattedMonth}/${formattedDay}`;

    console.log(selectedDateTime);
    console.log(formattedDate);

    console.log(idIncrement);
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
          Events
        </Text>
        <EventCard
          events={events}
        />
        <Text style={commonStyles.headings}>
          Graph
        </Text>
        <GraphCard />
      </ScrollView>
      <Modal visible={isFormVisible} animationType="slide">
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={closeModal}>
            <Icon name="times-circle" size={50} color="#38CE61" />
          </TouchableOpacity>
        </View>
        <View style={styles.eventForm}>
          <Text style={styles.eventText}>Plant Name:</Text>
          <TextInput
            value={selectedPlant}
            style={styles.EventsInput}
            onChangeText={(text) => setSelectedPlant(text)}
            placeholder="Enter plant name"
          />
          <Text style={styles.eventText}>Event:</Text>
          <TextInput
            value={selectedEvent}
            style={styles.EventsInput}
            onChangeText={(text) => setSelectedEvent(text)}
            placeholder="Enter event"
          />
          <View style={styles.buttoSave}>
            <TouchableOpacity onPress={saveEventData} style={styles.customButton}>
              <Text style={styles.buttonText}>Create Event</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={commonStyles.headings}>
          Events
        </Text>
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
    backgroundColor: '#fff'
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
  }
});

export default CalendarScreen;
