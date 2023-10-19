import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  screenHeight,
  TouchableWithoutFeedback,
} from 'react-native';

import { useNavigation } from "@react-navigation/native";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NavigationBar() {

  const navigation = useNavigation();

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.home}>
        <Icon name="home" size={40} color="#38CE61" />
        <Text style={styles.text}>
          Home
        </Text>
      </View>

      <TouchableWithoutFeedback onPress={() => navigation.navigate('Plants')}>
        <View style={styles.home}>
          <Icon name="sprout" size={40} color="#252423" />
          <Text style={styles.text}>
            Plants
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Calendar')}>
        <View style={styles.home}>
          <Icon name="calendar" size={40} color="#252423" />
          <Text style={styles.text}>
            Calendar
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => navigation.navigate('Settings')}>
        <View style={styles.home}>
          <Icon name="cog" size={40} color="#252423" />
          <Text style={styles.text}>
            Settings
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 25,
    alignItems: 'center',
  },

  icon: {
    alignItems: 'flex-end',
    marginLeft: '2%',
  },

  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  home: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    marginBottom: 10,
    fontSize: 14,
  },
});