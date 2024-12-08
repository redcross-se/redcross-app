import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const DetailsRow = ({ label, value, isEditing, handleInputChange, field }) => {
  const [inputValue, setInputValue] = useState("");
  let valueStyles = styles.value;
  if (value.includes("Add")) {
    valueStyles = {
      color: "#AAA",
    };
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
      ) : (
        <Text style={valueStyles}>{value}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  input: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
  },
});

export default DetailsRow;
