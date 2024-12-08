import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

const ProfileInfo = ({
  name,
  dateOfBirth,
  isEditing,
  setIsEditing,
  handleInputChange,
}) => {
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
          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            value={dateOfBirth}
            onChangeText={(text) => handleInputChange("dob", text)}
          />
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
