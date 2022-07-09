import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePic = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => setCamera(ref)}
        ratio={"1:1"}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => takePic()}>
            <Text style={styles.text}> Snap </Text>
          </TouchableOpacity>
        </View>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ flex: 1, alignSelf: "stretch" }}
          />
        )}
      </Camera>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: "transparent",
    flexDirection: "column",
    alignSelf: "center",
    margin: 20,
    justifyContent: "center",
    marginTop: 650,
    borderWidth: 10,
    borderColor: "white",
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 32,
    color: "white",
  },
});
