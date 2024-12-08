// AllergyList.js
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import AllergyItem from "./AllergyItem";

const AllergiesList = ({ allergies, onAddAllergy, onRemoveAllergy }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Allergies</Text>
      {allergies.length > 0 ? (
        allergies.map((allergy, index) => (
          <View key={index} style={styles.allergyItemContainer}>
            <AllergyItem allergy={allergy} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => onRemoveAllergy(allergy)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <TouchableOpacity style={styles.addRow} onPress={onAddAllergy}>
          <Text style={styles.addText}>Add an allergy</Text>
        </TouchableOpacity>
      )}
      {allergies.length > 0 && (
        <TouchableOpacity style={styles.editRow} onPress={onAddAllergy}>
          <Text style={styles.addText}>Add Allergy</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFF",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  addRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderColor: "#E30613",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  editRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderColor: "#E30613",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  addText: {
    color: "#E30613",
    marginLeft: 5,
    fontWeight: "bold",
  },
  removeButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: "#E30613",
    borderRadius: 5,
  },
  removeButtonText: {
    color: "#FFF",
    fontSize: 12,
  },
  allergyItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
});

export default AllergiesList;
