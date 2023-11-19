import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { commonStyles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList } from 'react-native';

const EventCard = ({ events }) => {
  if (!events) {
    return null;
  }

  const filteredEvents = events.filter((event) => event.event_type);

  const renderItem = ({ item }) => (
    <LinearGradient
    colors={["#5fc4ff", "#0064D4", "#002978"]}
    style={styles.cardsEvent}
    >
      <View style={styles.textContainer}>
        <Text style={styles.cardsText}>{item.name_plant}</Text>
        <Text style={styles.subTitle}>{item.event_type}</Text>
        <Image
        source={{ uri: item.image }}
        style={styles.image}
      />
      </View>
    </LinearGradient>
  );

  return (
    <View style={{ borderRadius: 12, justifyContent: "center", alignItems:"center", ...commonStyles.container}}>
      <FlatList
        data={filteredEvents}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContent: {
  },
  textContainer: {
    marginBottom: 5,
    borderRadius: 12
  },
  cardsEvent: {
    justifyContent: "center",
    width: 170,
    height: 195,
    marginVertical: 24,
    marginHorizontal: 12,
    borderRadius: 12
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
    marginLeft: 20
    },
  image: {
    alignSelf: 'center',
    width: 130,
    height: 130,
    marginBottom: 5,
    borderRadius: 10
  },
});

export default EventCard;