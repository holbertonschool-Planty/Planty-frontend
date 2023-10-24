import * as ImagePicker from "expo-image-picker";
import { getApps, initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from "react";
import {
  ActivityIndicator,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
  LogBox,
  TouchableOpacity,
} from "react-native";
import axios from 'axios';
import * as Clipboard from "expo-clipboard";
import uuid from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyCbMbKO9eJOKmqqVg51mth-ae4FEeEl67s",
  authDomain: "planty-app-htbn.firebaseapp.com",
  databaseURL: "https://planty-app-htbn-default-rtdb.firebaseio.com/",
  storageBucket: "gs://planty-app-htbn.appspot.com",
  messagingSenderId: "678386882303",
};

// Editing this file with fast refresh will reinitialize the app on every refresh, let's not do that
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);

class PictureComp extends React.Component {
  state = {
    image: null,
    uploading: false,
  };

  async componentDidMount() {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }

  render() {
    let { image } = this.state;

    return (
      <View style={{ backgroundColor: '#FFF' }}>
        {!!image && (
          <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            Example: Upload ImagePicker result
          </Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={this._takePhoto}
        >
          <Icon name="camera" icon="camera" size={36} color="#fff" style={{marginLeft: 2}} />
          <Text style={styles.buttonText}>Take a photo</Text>
        </TouchableOpacity>

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}

        <StatusBar barStyle="default" />
      </View>
    );
  };

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}
      >
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: "rgba(0,0,0,1)",
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: "hidden",
          }}
        >
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>
        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10, }}
        >
          {image}
        </Text>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: "Check out this photo",
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert("Copied image URL to clipboard");
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    console.log({ pickerResult });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async (pickerResult) => {
    try {
      this.setState({ uploading: true });
  
      if (!pickerResult.canceled) {
        // Crea un objeto FormData para enviar la imagen como archivo
        const formData = new FormData();
        formData.append('file', {
          uri: pickerResult.assets[0].uri,
          type: 'image/jpeg', // Asegúrate de que el tipo coincida con el tipo de archivo que estás enviando
          name: pickerResult.assets[0].uri
        });
  
        // Realiza la solicitud POST al punto final de Django
        const response = await axios.post('http://api.plantyit.tech/api/plants_info/temp_image/', formData, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
          },
        }
      );
  
        // Handle the response here
        console.log(response);
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  // Define la ruta a la carpeta dentro del bucket donde deseas guardar la imagen
  const folderName = 'planty_users'; // Reemplaza 'nombre_de_tu_carpeta' con el nombre de tu carpeta
  const fileRef = ref(getStorage(), `${folderName}/${uuid.v4()}`); // Usamos la carpeta en la referencia

  const result = await uploadBytes(fileRef, blob);

  // Cerramos y liberamos el blob
  blob.close();

  return await getDownloadURL(fileRef);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: 120,
    height: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#38CE61',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default PictureComp;