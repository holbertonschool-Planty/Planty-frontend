import * as ImagePicker from "expo-image-picker";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from "react";
import {
  ActivityIndicator,
  Image,
  Share,
  StyleSheet,
  Text,
  View,
  LogBox,
  TouchableOpacity,
} from "react-native";
import * as Clipboard from "expo-clipboard";

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
          }
    } catch (e) {
        console.log(e);
        alert("Error processing the image, sorry :(");
    }
};

};

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