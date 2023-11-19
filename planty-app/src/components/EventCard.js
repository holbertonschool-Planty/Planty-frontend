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
    colors={["#014466", "#0267ab", "#167eba"]}
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
    width: 'auto',
    height: 195,
    marginVertical: 24,
    marginHorizontal: 12,
    borderRadius: 12
  },
  cardsText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 18,
    marginRight: 8,
    width: 'auto',
  },
  subTitle: {
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: 2,
    marginLeft: 18
    },
  image: {
    alignSelf: 'center',
    width: 128,
    height: 128,
    marginHorizontal: 16,
    borderRadius: 8
  },
});

export default EventCard;