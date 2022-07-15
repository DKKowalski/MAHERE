import React, { useState, useContext, useEffect } from "react";
import MathContext from "../context/MathContext";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const axios = require("axios").create({
  baseURL: "https://api.mathpix.com/v3/",
  headers: {
    content_type: "application/json",
    app_id: "sewunakpandana5_gmail_com_7dbc52_3a2ef1",
    app_key: "22781ad9fab9ef14ddbdab5fe7246f4e084cb5afdbd7794d291fe0a20405e505",
  },
});

const UploadScreen = ({ navigation }) => {
  const { addFile } = useContext(MathContext);
  const [image, setImage] = useState(null);

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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.base64);
    }
  };

  return (
    <View style={css.container}>
      <View style={{ marginTop: 250 }}>
        {image && (
          <Image
            source={{ uri: `data:image/png;base64,${image}` }}
            style={{ width: 200, height: 200 }}
          />
        )}
      </View>
      <View>
        <TouchableOpacity onPress={pickImage}>
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>
            Select <AntDesign name="addfile" size={30} color="black" />
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={css.button}
        onPress={() => {
          searchImage();
          navigation.navigate("Result");
        }}
      >
        <Text style={css.text}>Show Answer</Text>
      </TouchableOpacity>
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
    alignSelf: "center",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
