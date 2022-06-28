import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={css.container}>
      <Text style={css.text}>Welcome !</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Upload")}
        style={css.button}
      >
        <Text style={css.text}>Upload</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Camera")}
        style={css.button}
      >
        <Text style={css.text}>Camera</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const css = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderWidth: 2,
    borderColor: "blue",
    marginVertical: 15,
    borderRadius: 5,
    padding: 20,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
