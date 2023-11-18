import RNBluetoothClassic, { BluetoothEventType } from 'react-native-bluetooth-classic';
import { Alert } from 'react-native';

export async function sendMessage(connectedDevice, txt) {
  console.log("Send message start")
  if (!connectedDevice) {
    console.log("Null pa")
    return null;
  }
  try {
    const success = await RNBluetoothClassic.writeToDevice(
      connectedDevice.address,
      txt
    );
    if (success) {
      let request = null;
      let attempt = 0
      await sleep(2000);
      while ((request == null || request.includes("status_code:4")) && attempt < 7) {
        await sleep(2000);
        request = await RNBluetoothClassic.readFromDevice(connectedDevice.address);
        attempt = attempt + 1;
        console.log(request)
      }
      console.log("Send message finish", request)
      return request;
    } else {
      return null;
    }
  } catch (error) {
    console.log("ERROR PA", error)
    return null;
  }
}

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function connectToDevice(device) {
  try {
    const connection = await RNBluetoothClassic.connectToDevice(device);
    if (connection) {
      return device;
    } else {
      return null;
    }
  } catch (error) {
    Alert.alert("Error al conectar.")
    console.error('error', error);
    return null;
  }
}

export async function fetchPairDevices() {
  const pairDevices = await RNBluetoothClassic.getBondedDevices();
  const filterList = [];
  for (const device of pairDevices) {
    if (device.name.startsWith("Planty-", 0)) {  //For testing I don't use this if 
        filterList.push(device);
      }
  }
  return pairDevices;
}

export async function bluetoothEnabled() {
    enabled = RNBluetoothClassic.requestBluetoothEnabled();
    return enabled;
}

export async function discoverDevices(setAvailableDevices) {
    try {
        let subscription = RNBluetoothClassic.addListener(
            BluetoothEventType.BLUETOOTH_DEVICES_DISCOVERED,
            (event) => {
                setAvailableDevices(event.devices);
            }
        );

        await RNBluetoothClassic.startDiscovery();

        // Devuelve la función de limpieza
        return () => {
            RNBluetoothClassic.cancelDiscovery();
            subscription.remove();
        };

    } catch (error) {
        console.error(`Error descubriendo dispositivos: ${error.message}`);
    }
}
