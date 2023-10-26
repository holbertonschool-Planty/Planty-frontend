import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import NavigationBar from './navigationBar';
import { commonStyles } from './styles';
import LinearGradient from 'react-native-linear-gradient';

const EventCard = ({ navigation }) => {
  return (
    <View style={commonStyles.container}>
      <ScrollView contentContainerStyle={commonStyles.scrollViewContent}>
        <View style={styles.content}>
          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.cardsEvent}
          >
            <Text style={styles.cardsText}>
              Planty
            </Text>
            <Text style={styles.subTitle}>
              Event - Date
            </Text>
            <Image source={require('../img/flower.png')} style={{ alignSelf: 'center', width: 120, height: 120,}} />
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardsText: {
    fontSize: 25,
    alignSelf: 'center',
  },
  subTitle: {
    fontSize: 15,
    alignSelf: 'center',
  },
  cardsEvent: {
    fontSize: 25,
    borderRadius: 10,
    marginLeft: 10,
    width: 180,
    height: 180,
  },
});

export default EventCard;
