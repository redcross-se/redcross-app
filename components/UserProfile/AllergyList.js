import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Picker } from "react-native";

const AllergiesList = ({ allergies, isEditing, setUserDetails }) => {
  const [newAllergy, setNewAllergy] = useState("");

  const addAllergy = () => {
    if (newAllergy) {
      const updatedAllergies = [...allergies, newAllergy];
      setUserDetails(updatedAllergies);
      setNewAllergy("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Allergies</Text>
      {allergies.map((allergy, index) => (
        <View key={index} style={styles.allergyItem}>
          <Text style={styles.allergyText}>{allergy}</Text>
        </View>
      ))}
      {isEditing && (
        <>
          <Picker
            selectedValue={newAllergy}
            style={styles.input}
            onValueChange={(itemValue) => setNewAllergy(itemValue)}
          >
            <Picker.Item label="Select Allergy" value="" />
            <Picker.Item label="Peanuts" value="Peanuts" />
            <Picker.Item label="Shellfish" value="Shellfish" />
            <Picker.Item label="Milk" value="Milk" />
            <Picker.Item label="Eggs" value="Eggs" />
            <Picker.Item label="Soy" value="Soy" />
            <Picker.Item label="Wheat" value="Wheat" />
          </Picker>
          <TouchableOpacity style={styles.addButton} onPress={addAllergy}>
            <Text style={styles.addButtonText}>+ Add Allergy</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  allergyItem: {
    marginVertical: 5,
  },
  allergyText: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default AllergiesList;
