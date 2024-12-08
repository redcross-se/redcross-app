// ProfileInfo.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
import Edit from "../../assets/edit.png";

const ProfileInfo = ({ name, onEditName }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/Login.png")}
        style={styles.profileImage}
      />
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity onPress={onEditName} style={styles.editIcon}>
          <Image source={Edit} style={styles.editIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
    position: "relative",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 8,
  },
  editIcon: {
    width: 15,
    height: 15,
  },
});

export default ProfileInfo;
