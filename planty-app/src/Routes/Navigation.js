import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlantsScreen from '../components/Plants';
import HomeScreen from '../components/Home';
import SettingsScreen from '../components/Settings';
import CalendarScreen from '../components/Calendar';
import AddPlantyScreen from '../components/AddPlanty';
import AddDeviceScreen from '../components/AddDevice';
import LoadingScreen from '../components/LoadingScreen';
import LoginUser from '../components/LoginUser';
import RegisterUser from '../components/RegisterUser';
import ConnectDeviceScreen from '../components/ConnectDevice';
import ConnectedDevicesScreen from '../components/ConnectedDevices';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Plants" component={PlantsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ConnectDevice" component={ConnectDeviceScreen} options={{
          title: 'Add your devices',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#252423',
          },
        }} />
        <Stack.Screen name="ConnectedDevices" component={ConnectedDevicesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginUser" component={LoginUser} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterUser" component={RegisterUser} options={{ headerShown: false }} />
        <Stack.Screen name="Add your plant" component={AddPlantyScreen}
          options={{
            title: 'Add your plant',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              color: '#252423',
            },
          }} />
        <Stack.Screen name="Add your device" component={AddDeviceScreen}
          options={{
            title: 'Add your device',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              color: '#252423',
            },
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}