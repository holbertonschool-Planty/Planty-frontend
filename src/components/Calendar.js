import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, Button } from 'react-native';
import NavigationBar from './navigationBar';
import { commonStyles } from './styles';
import { Calendar } from 'react-native-calendars';


const CalendarScreen = ({ navigation }) => {
  const [selected, setSelected] = useState('');
  const handleDayPress = (day) => {
    setSelected(day.dateString);
    console.log('selected day', day);
  };

  const reminders = {
    '2023-10-25': { event: 'sexo' },
    '2023-10-24': { event: 'sexo en familia' },
  };

  const markedDates = {};

  for (let date in reminders) {
    markedDates[date] = { selected: true, marked: true, selectedColor: '' }
  }

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
      </ScrollView>
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

  calendarTextcont: {
    fontSize: 20
  },
});

export default CalendarScreen;
