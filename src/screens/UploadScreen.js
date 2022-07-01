import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const UploadScreen = () => {
  const [fileResponse, setFileResponse] = useState(null);

  const handleDocSelection = async () => {
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!response.cancelled) {
      setFileResponse(response.uri);
    }
  };
  return (
    <View style={css.container}>
      {fileResponse && (
        <Image
          source={{ uri: fileResponse }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <TouchableOpacity onPress={handleDocSelection}>
        <Text style={{ fontSize: 40, fontWeight: "bold" }}>
          Select <AntDesign name="addfile" size={30} color="black" />
        </Text>
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
    justifyContent: "center",
  },
});
