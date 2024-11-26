import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

const BottomNavigation = ({ navigation, InitialTab }) => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState(InitialTab);

  const handleTabPress = (tab) => {
    setActiveTab(tab); // Set the active tab
    switch (tab) {
      case "home":
        navigation.navigate("Home"); // Navigate to Home screen
        break;
      case "favorite":
        navigation.navigate("Volunteer"); // Navigate to Volunteer screen
        break;
      case "record":
        navigation.navigate("Content"); // Navigate to Content screen
        break;
      case "settings":
        navigation.navigate("Settings"); // Navigate to Settings screen
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      {/* Home Tab */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleTabPress("home")}
      >
        <Image
          source={require("../../assets/Home.png")}
          style={[
            styles.iconImage,
            { tintColor: activeTab === "home" ? "#E30613" : "#B0B0B0" },
          ]}
        />
        {activeTab === "home" && <View style={styles.indicator} />}
      </TouchableOpacity>

      {/* Favorite Tab */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleTabPress("favorite")}
      >
        <Image
          source={require("../../assets/Vector.png")}
          style={[
            styles.iconImage,
            { tintColor: activeTab === "favorite" ? "#E30613" : "#B0B0B0" },
          ]}
        />
        {activeTab === "favorite" && <View style={styles.indicator} />}
      </TouchableOpacity>

      {/* Record Tab */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleTabPress("record")}
      >
        <Image
          source={require("../../assets/Layer2.png")}
          style={[
            styles.iconImage,
            { tintColor: activeTab === "record" ? "#E30613" : "#B0B0B0" },
          ]}
        />
        {activeTab === "record" && <View style={styles.indicator} />}
      </TouchableOpacity>

      {/* Settings Tab */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleTabPress("settings")}
      >
        <Image
          source={require("../../assets/settings.png")}
          style={[
            styles.iconImage,
            { tintColor: activeTab === "settings" ? "#E30613" : "#B0B0B0" },
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
    height: 100,
    marginBottom: -30,
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
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  indicator: {
    width: 24,
    height: 2,
    backgroundColor: "#E30613",
    marginTop: 5,
  },
});

export default BottomNavigation;
