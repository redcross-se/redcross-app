// AllergyItem.js
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const AllergyItem = ({ allergy }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/Home.png")} style={styles.icon} />
      <Text style={styles.text}>{allergy}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#EEE",
    marginVertical: 5,
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
    flexShrink: 1,
  },
});

export default AllergyItem;
