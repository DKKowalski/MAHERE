import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import MathContext from "../context/MathContext";
import CameraPreview from "../components/CameraPreview";

const axios = require("axios").create({
  baseURL: "https://api.mathpix.com/v3/",
  headers: {
    content_type: "application/json",
    app_id: "sewunakpandana5_gmail_com_7dbc52_3a2ef1",
    app_key: "22781ad9fab9ef14ddbdab5fe7246f4e084cb5afdbd7794d291fe0a20405e505",
  },
});

const CameraScreen = ({ navigation }) => {
  const { addFile } = useContext(MathContext);
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);

  const searchImage = async () => {
    axios
      .post("text", {
        src: `data:image/png;base64,${image}`,
        formats: ["data"],
        data_options: {
          include_asciimath: true,
          include_latex: true,
        },
      })
      .then((response) => addFile(response.data));
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePic = async () => {
    if (camera) {
      const data = await camera.takePictureAsync({ base64: true });
      setImage(data.base64);
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  };

  const goResult = () => {
    navigation.navigate("Result");
  };

  return (
    <View style={styles.container}>
      {image ? (
        <CameraPreview
          photo={image}
          goResultfunc={goResult}
          search={searchImage}
        />
      ) : (
        <Camera
          style={styles.camera}
          type={type}
          ref={(ref) => setCamera(ref)}
          ratio={"1:1"}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                takePic();
              }}
            >
              <Text style={styles.text}> Snap </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
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
  button1: {
    borderWidth: 2,
    borderColor: "blue",
    marginVertical: 15,
    borderRadius: 5,
    padding: 20,
    color: "ash",
    alignSelf: "flex-start",
  },
});
