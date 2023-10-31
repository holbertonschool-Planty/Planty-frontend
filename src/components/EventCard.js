import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { commonStyles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList } from 'react-native';

const EventCard = ({ events }) => {
  // Filtrar eventos que coincidan con la fecha seleccionada
  const filteredEvents = events.filter((event) => event.date );

  const renderItem = ({ item }) => (
    <LinearGradient
      colors={item.backgroundColor}
      style={styles.cardsEvent}
    >
      <View style={styles.textContainer}>
        <Text style={styles.cardsText}>{item.name}</Text>
        <Text style={styles.subTitle}>{item.event}</Text>
      </View>
      <Image
        source={item.image}
        style={styles.image}
      />
    </LinearGradient>
  );

  return (
    <View style={commonStyles.container}>
      <FlatList
        data={filteredEvents}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    paddingHorizontal: 5,
  },
  textContainer: {
    marginBottom: 5,
  },
  cardsEvent: {
    justifyContent: 'center',
    width: 170,
    height: 190,
    borderRadius: 5,
    marginLeft: 10,
  },
  cardsText: {
    fontSize: 20,
    color: '#FFFFFF',
    marginLeft: 20,
  },
  subTitle: {
    fontSize: 13,
    color: '#FFFFFF',
    marginBottom: 2,
    marginLeft: 20,
    marginTop: -4,
  },
  image: {
    alignSelf: 'center',
    width: 145,
    height: 120,
    marginBottom: 5,
  },
});

export default EventCard;