import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Button, Modal, TextInput } from 'react-native';
import NavigationBar from './navigationBar';
import { commonStyles } from './styles';
import { Calendar } from 'react-native-calendars';
import EventCard from './EventCard';
import LinearGradient from 'react-native-linear-gradient';

const CalendarScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [idIncrement, setIdIncrement] = useState(0);
  const [events, setEvents] = useState([]);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setIsFormVisible(true);
  };

  const saveEventData = () => {
    const selectedDateTime = new Date(selectedDate);
    const month = selectedDateTime.getMonth() + 1;
    const day = selectedDateTime.getDate() + 1; 
    const formattedDate = `${month}/${day}`;
    console.log(selectedDateTime)
    console.log(formattedDate)
    

    console.log(idIncrement);
    const newEvent = {
      date: selectedDate,
      name: selectedPlant,
      event: `Regar - ${formattedDate}`,
      location: "Your location here",
      backgroundColor: ['#0D7028', '#38CE61'],
      image: require('../img/flower.png'),
      id: idIncrement,
    };
    setIdIncrement(idIncrement + 1);

    // Actualiza la lista de eventos
    setEvents([...events, newEvent]);
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
            />
          </View>
        </View>
        <Text style={commonStyles.headings}>
          Events
        </Text>
        <Button title='view list' onPress={() => console.log(events)} />
        <EventCard
          events={events}
        />
      </ScrollView>
      <Modal visible={isFormVisible} animationType="slide">
        <View style={styles.eventForm}>
          <Text>Plant Name:</Text>
          <TextInput
            value={selectedPlant}
            onChangeText={(text) => setSelectedPlant(text)}
            placeholder="Enter plant name"
          />
          <Text>Event:</Text>
          <TextInput
            value={selectedEvent}
            onChangeText={(text) => setSelectedEvent(text)}
            placeholder="Enter event"
          />
          <Button
            title="Save"
            onPress={saveEventData}
          />
        </View>
      </Modal>
      <View style={commonStyles.shadowContainer}>
        <View style={commonStyles.topLine}></View>
        <View style={commonStyles.bottomContainer}>
          <NavigationBar name="Home" icon="home-variant" text="Home" navigation={navigation} />
          <NavigationBar name="Plants" icon="sprout" text="Plants" navigation={navigation} />
          <NavigationBar name="Calendar" icon="calendar" text="Calendar" active={true} navigation={navigation} />
          <NavigationBar name="Settings" icon="cog" text="Settings" navigation={navigation} />
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
});

export default CalendarScreen;