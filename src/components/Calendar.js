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
  const [events, setEvents] = useState([]);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setIsFormVisible(true);
  };

  const saveEventData = () => {
    const selectedDateTime = new Date(selectedDate);
    const options = { day: 'numeric', month: 'numeric' };
    const formattedDate = selectedDateTime.toLocaleDateString(undefined, options);

    const newEvent = {
      date: selectedDate,
      name: selectedPlant,
      event: `regar - ${formattedDate}`,
      location: "Your location here",
      backgroundColor: ['#0D7028', '#38CE61'],
      image: require('../img/flower.png'),
    };

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
        <EventCard
          selectedDate={selectedDate}
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
