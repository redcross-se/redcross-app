// DetailsRow.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

const DetailsRow = ({ label, value, field, onEditField }) => {
  const isPlaceholder = value.toString().includes("Add your");
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueContainer}>
        <Text style={[styles.value, isPlaceholder && styles.placeholder]}>
          {value}
        </Text>
        <TouchableOpacity onPress={() => onEditField(field)}>
          {/* <Ionicons
            name={isPlaceholder ? "ios-add" : "ios-pencil"}
            size={20}
            color="#E30613"
            style={styles.editIcon}
          /> */}
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  placeholder: {
    color: "#999",
    fontWeight: "normal",
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editIcon: {
    marginLeft: 10,
  },
});

export default DetailsRow;
