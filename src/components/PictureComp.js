import * as ImagePicker from "expo-image-picker";
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
      } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }

  render() {
    let { image } = this.state;
    return (
      <View style={{ backgroundColor: '#FFF' }}>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          margin: 0
        }}>

        </View>
        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}
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
              width: 120, 
              height: 120,
              marginTop: 10,
              borderRadius: 8,
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    const { image } = this.state;
    const buttonStyle = styles.button;

    if (image) {
      return (
        <View
          style={{
            width: buttonStyle.width,
            height: buttonStyle.height,
            borderRadius: 8,
          }}
        >
          <View
            style={{
              borderRadius: 8,
              overflow: "hidden",
              marginTop: 10,
              elevation: 8,
            }}
          >
            <Image source={{ uri : image }} style={{ width: buttonStyle.width, height: buttonStyle.height, }} />
          </View>
          <Text
            onPress={this._copyToClipboard}
            onLongPress={this._share}
            style={{ paddingVertical: 10, paddingHorizontal: 10 }}
          >
          </Text>
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={buttonStyle} onPress={this._takePhoto}>
          <Icon name="camera" icon="camera" size={36} color="#fff" />
          <Text style={styles.buttonText}>Take a photo</Text>
        </TouchableOpacity>
      );
    }
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
    console.log("A")
    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });



    this._handleImagePicked(pickerResult);
  };



  _handleImagePicked = async (pickerResult) => {
    try {
        if (pickerResult.uri && !pickerResult.canceled) {
            this.setState({ pickerData: pickerResult });
            if (pickerResult.uri) {
                this.setState({ image: pickerResult.uri });
            }
            // Pasar el objeto pickerResult al componente padre
            if (this.props.onPickerResult) {
                this.props.onPickerResult(pickerResult);
            }
        } else {
            alert("Image URL is null or invalid.");
        }
    } catch (e) {
        console.log(e);
        alert("Error processing the image, sorry :(");
    }
};


//   _handleImagePicked = async (pickerResult) => {
//     try {
//       this.setState({ uploading: true });
//       if (pickerResult.uri && !pickerResult.canceled) {
//         // Crea un objeto FormData para enviar la imagen como archivo
//         const formData = new FormData();
//         formData.append('file', {
//           uri: pickerResult.assets[0].uri,
//           type: 'image/jpeg',
//           name: pickerResult.assets[0].uri
//         });

//         // Realizar la solicitud POST al end-point de Django
//         const response = await axios.post('http://api.plantyit.tech/api/plants_info/temp_image/', formData, {
//           headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'multipart/form-data'
//           },
//         }
//         );

//         // // Handling the response here
//         // console.log(response);

//         if (pickerResult.uri) {
//           this.setState({ image: pickerResult.uri });
//         } else {
//           alert("Image URL is null or invalid.");
//         }
//       } else {
//         alert("Image URL is null or invalid.");
//       }
//     } catch (e) {
//       console.log(e);
//       alert("Upload failed, sorry :(");
//     } finally {
//       this.setState({ uploading: false });
//     }
//   };



};
// async function uploadImageAsync(uri) {
//   // Why are we using XMLHttpRequest? See:
//   // https://github.com/expo/expo/issues/2402#issuecomment-443726662
//   const blob = await new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//       resolve(xhr.response);
//     };
//     xhr.onerror = function (e) {
//       console.log(e);
//       reject(new TypeError("Network request failed"));
//     };
//     xhr.responseType = "blob";
//     xhr.open("GET", uri, true);
//     xhr.send(null);
//   });

//   // Define la ruta a la carpeta dentro del bucket donde deseas guardar la imagen
//   const folderName = 'planty_users'; // Reemplaza 'nombre_de_tu_carpeta' con el nombre de tu carpeta
//   const fileRef = ref(getStorage(), `${folderName}/${uuid.v4()}`); // Usamos la carpeta en la referencia

//   const result = await uploadBytes(fileRef, blob);

//   // Cerramos y liberamos el blob
//   blob.close();

//   return await getDownloadURL(fileRef);
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 120,
    height: 120,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#38CE61',
    marginTop: 10,
    marginRight: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default PictureComp;