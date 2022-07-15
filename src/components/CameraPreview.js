import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";

const CameraPreview = ({ photo, goResultfunc, search }) => {
  return (
    <View
      style={{
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <ImageBackground
        source={{ uri: `data:image/png;base64,${photo}` }}
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            padding: 15,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.button1}
              onPress={() => {
                goResultfunc()
                search()
              }}
            >
              <Text style={styles.text}>Show Answer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CameraPreview;

const styles = StyleSheet.create({
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
    alignSelf: "center",
  },
});
