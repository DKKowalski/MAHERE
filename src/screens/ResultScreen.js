import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import MathContext from "../context/MathContext";

const ResultScreen = ({ navigation }) => {
  useEffect(() => {
    <Text>Loading...</Text>;
  }, [navigation]);

  const { mathData } = useContext(MathContext);
  return (
    <View style={styles.container}>
      {mathData.data == null ? (
        <Text style={styles.text}> Loading... </Text>
      ) : (
        <FlatList
          data={mathData.data}
          renderItem={({ item }) => {
            return (
              <Text style={styles.text}>
                {item.type}: {item.value}
              </Text>
            );
          }}
        />
      )}

      {mathData.error && (
        <Text style={styles.text1}>{mathData.error} try again !</Text>
      )}
    </View>
  );
};

export default ResultScreen;
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  list: { borderColor: "red", borderWidth: 18 },
  text: { alignSelf: "center", fontSize: 18, fontWeight: "bold" },
  text1: { alignSelf: "center", fontSize: 12 },
});
