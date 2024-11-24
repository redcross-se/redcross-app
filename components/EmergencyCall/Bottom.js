import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

const BottomNavigation = () => {
  // State to track the active icon
  const [activeTab, setActiveTab] = useState("home"); // Default active tab is 'home'

  return (
    <View style={styles.container}>
      {/* Home Tab */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => setActiveTab("home")} // Set active tab to 'home'
      >
        <Image
          source={require("../../assets/Home.png")} // Single image for all states
          style={[
            styles.iconImage,
            { tintColor: activeTab === "home" ? "#E30613" : "#B0B0B0" }, // Dynamic color
          ]}
        />
        {activeTab === "home" && <View style={styles.indicator} />}
      </TouchableOpacity>

      {/* Favorite Tab */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => setActiveTab("favorite")} // Set active tab to 'favorite'
      >
        <Image
          source={require("../../assets/Vector.png")} // Single image for all states
          style={[
            styles.iconImage,
            { tintColor: activeTab === "favorite" ? "#E30613" : "#B0B0B0" }, // Dynamic color
          ]}
        />
        {activeTab === "favorite" && <View style={styles.indicator} />}
      </TouchableOpacity>

      {/* Record Tab */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => setActiveTab("record")} // Set active tab to 'record'
      >
        <Image
          source={require("../../assets/Layer2.png")} // Single image for all states
          style={[
            styles.iconImage,
            { tintColor: activeTab === "record" ? "#E30613" : "#B0B0B0" }, // Dynamic color
          ]}
        />
        {activeTab === "record" && <View style={styles.indicator} />}
      </TouchableOpacity>

      {/* Settings Tab */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => setActiveTab("settings")} // Set active tab to 'settings'
      >
        <Image
          source={require("../../assets/settings.png")} // Single image for all states
          style={[
            styles.iconImage,
            { tintColor: activeTab === "settings" ? "#E30613" : "#B0B0B0" }, // Dynamic color
          ]}
        />
        {activeTab === "settings" && <View style={styles.indicator} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    height: 100, // Adjusted height for a slightly larger navigation bar
    marginBottom: -30, // Elevated from the bottom of the screen
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: -2 },
    elevation: 3,

    width: "100%",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
  },
  iconImage: {
    width: 32, // Match icon size to design
    height: 32,
    resizeMode: "contain", // Ensure image scales correctly
  },
  indicator: {
    width: 24, // Match width to the indicator in the design
    height: 2,
    backgroundColor: "#E30613", // Red for active indicator
    marginTop: 5, // Add space between icon and indicator
  },
});

export default BottomNavigation;
