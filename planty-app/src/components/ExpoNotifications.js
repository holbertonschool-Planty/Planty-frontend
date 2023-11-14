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
      const expoPushToken = (await Notifications.getExpoPushTokenAsync({projectId: '4e66a6b9-bbc2-4429-9128-375e94fdd332'})).data;
      return expoPushToken;
    } catch (error) {
      console.error('Error al obtener el Expo Push Token:', error);
      return null;
    }
  }