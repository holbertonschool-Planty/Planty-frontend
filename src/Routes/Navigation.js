import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlantsScreen from '../components/Plants';
import HomeScreen from '../components/Home';
import SettingsScreen from '../components/Settings';
import CalendarScreen from '../components/Calendar';
import ColorPicker from '../components/AddPlanty';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Plants" component={PlantsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ColorPicker" component={ColorPicker} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}