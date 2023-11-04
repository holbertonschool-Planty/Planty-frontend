import * as Notifications from 'expo-notifications';

export async function getExpoPushToken() {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
  
      if (finalStatus !== 'granted') {
        return;
      }
  
      // notificación Expo
      const expoPushToken = (await Notifications.getExpoPushTokenAsync({projectId: '94d683af-b5c6-43a7-a1d4-2869ea8ea177'})).data;
      return expoPushToken;
    } catch (error) {
      console.error('Error al obtener el Expo Push Token:', error);
      return null;
    }
  }