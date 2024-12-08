import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const ProfileInfo = ({
  name,
  dateOfBirth,
  isEditing,
  setIsEditing,
  handleInputChange,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(dateOfBirth);
    setShowDatePicker(false);
    handleInputChange("dob", currentDate.toISOString().split("T")[0]);
    // Calculate age
    const age = new Date().getFullYear() - currentDate.getFullYear();
    handleInputChange("age", age.toString());
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setIsEditing(!isEditing)}
      >
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
      <Image
        source={require("../../assets/Login.png")}
        style={styles.profileImage}
      />
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={(text) => handleInputChange("fullName", text)}
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.input}>
              {dateOfBirth || "Select Date of Birth"}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={new Date(dateOfBirth) || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </>
      ) : (
        <>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.dateOfBirth}>{dateOfBirth}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
    position: "relative",
  },
  editButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  editText: {
    color: "#E30613",
    fontSize: 16,
    fontWeight: "bold",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  dateOfBirth: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 0.5,
    marginBottom: 10,
    width: "80%",
    textAlign: "center",
    fontSize: 16,
  },
});

export default ProfileInfo;
