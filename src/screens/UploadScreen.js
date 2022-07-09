import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ModalScreen from "../../components/ModalScreen";

const axios = require("axios").create({
  baseURL: "https://api.mathpix.com/v3/",
  headers: {
    content_type: "application/json",
    app_id: "sewunakpandana5_gmail_com_7dbc52_3a2ef1",
    app_key: "22781ad9fab9ef14ddbdab5fe7246f4e084cb5afdbd7794d291fe0a20405e505",
  },
});

const UploadScreen = () => {
  const [fileResponse, setFileResponse] = useState(null);
  const [data, setData] = useState([]);

  const searchImage = async () => {
    axios
      .post("tet", {
        src: "https://mathpix-ocr-examples.s3.amazonaws.com/cases_hw.jpg",
        formats: ["text", "html", "json"],
        data_options: {
          include_asciimath: true,
          include_latex: true,
        },
      })
      .then((response) => console.log(response.data));
  };

  const handleDocSelection = async () => {
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!response.cancelled) {
      setFileResponse(response);
    }
  };

  useEffect(() => {
    searchImage();
  }, []);

  return (
    <View style={css.container}>
      <View style={{ marginTop: 250 }}>
        {fileResponse && (
          <Image
            source={{ uri: `data:image/png;base64,${fileResponse.base64}` }}
            style={{ width: 200, height: 200 }}
            alt="image"
          />
        )}
      </View>
      <View>
        <TouchableOpacity onPress={handleDocSelection}>
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>
            Select <AntDesign name="addfile" size={30} color="black" />
          </Text>
        </TouchableOpacity>
      </View>
      <ModalScreen />
    </View>
  );
};

export default UploadScreen;
const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  button: {
    borderWidth: 2,
    borderColor: "blue",
    marginVertical: 15,
    borderRadius: 5,
    padding: 20,
    color: "ash",
    alignSelf: "flex-end",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
