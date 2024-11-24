import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAddressFromCoordinates } from "../../services/locationService";

const HeaderComponent = () => {
  const [location, setLocation] = useState("Fetching location...");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Load user data
    const loadUser = async () => {
      const userStorage = await AsyncStorage.getItem("user");
      setUserData(JSON.parse(userStorage));
    };
    loadUser();

    // Request location and use Google Maps API
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocation("Permission denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      try {
        const address = await getAddressFromCoordinates(latitude, longitude);
        setLocation(address);
      } catch (error) {
        setLocation("Unable to fetch address");
      }
    };
    requestLocationPermission();
  }, []);

  const userName = userData ? `Hello ${userData.fullName}!` : "Hello!";

  return (
    <View style={styles.header}>
      {/* Left Section: Profile Info */}
      <View style={styles.leftSection}>
        <Image
          source={require("../../assets/Login.png")} // Replace with your profile image
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.completeProfile}>Complete profile</Text>
        </View>
      </View>

      {/* Right Section: Location Info */}
      <View style={styles.rightSection}>
        <Text style={styles.currentLocation}>📍 Current location</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row", // Arrange profile and location horizontally
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40, // Adjust size as needed
    height: 40,
    borderRadius: 20, // Make it circular
    marginRight: 10, // Space between image and text
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  completeProfile: {
    color: "#E30613",
    fontWeight: "bold",
    fontSize: 14,
  },
  rightSection: {
    alignItems: "flex-end", // Align text to the right
  },
  currentLocation: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
});

export default HeaderComponent;
