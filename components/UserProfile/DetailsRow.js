import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

const DetailsRow = ({ label, value, isEditing, handleInputChange, field }) => {
  const [inputValue, setInputValue] = useState(value);

  const validateInput = (text) => {
    if (field === "weight" || field === "height") {
      return /^\d+$/.test(text) ? text : inputValue;
    }
    return text;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {isEditing ? (
        field === "bloodType" ? (
          <Picker
            selectedValue={inputValue}
            style={styles.input}
            onValueChange={(itemValue) => handleInputChange(field, itemValue)}
          >
            <Picker.Item label="Select Blood Type" value="" />
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="AB+" value="AB+" />
            <Picker.Item label="AB-" value="AB-" />
            <Picker.Item label="O+" value="O+" />
            <Picker.Item label="O-" value="O-" />
          </Picker>
        ) : (
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={(text) => setInputValue(validateInput(text))}
            onBlur={() => handleInputChange(field, inputValue)}
          />
        )
      ) : (
        <Text style={styles.value}>{value}</Text>
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
