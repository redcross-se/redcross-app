import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import io from "socket.io-client";
import { getAddressFromCoordinates } from "../../services/locationService";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EmergencyCard = ({ navigation }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("https://ninety-bottles-smell.loca.lt");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleLongPress = async () => {
    console.log("Long press detected");
    try {
      const location = await Location.getCurrentPositionAsync({});
      const user = await AsyncStorage.getItem("user");
      const userData = JSON.parse(user);
      const { latitude, longitude } = location.coords;
      const address = await getAddressFromCoordinates(latitude, longitude);
  
      socket.emit("initiateEmergency", {
        userId: userData.id,
        location: { latitude, longitude, address },
        status: "pending",
      });
      console.log("Emergency initiated");
  
      // Navigate to EmergencyInfo with parameters
      navigation.navigate("EmergencyInfo", {
        location: { latitude, longitude, address },
        userId: userData.id,
      });
    } catch (error) {
      console.error("Error initiating emergency:", error);
    }
  };
  

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Emergency?</Text>
      <Text style={styles.cardSubtitle}>
        Hold the SOS button to connect with a responder.
      </Text>
      <View style={styles.sosButtonWrapper}>
        <View style={styles.sosBackgroundLayer}>
          <ImageBackground
            source={require("../../assets/EmergencyEllipse.svg")}
            style={styles.sosButtonBackground}
          >
            <TouchableOpacity
              style={styles.sosButton}
              onLongPress={handleLongPress}
            >
              <Image
                source={require("../../assets/EmergencyButtonIcon.png")}
                style={styles.iconPlaceholder}
              />
              <Text style={styles.sosText}>Hold for</Text>
              <Text style={styles.sosText}>3 seconds</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 30,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
    alignItems: "center",
    height: 400,
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E30613",
    marginBottom: 15,
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
  },
  sosButtonWrapper: {
    alignItems: "center",
  },
  sosBackgroundLayer: {
    width: 330,
    height: 240,
    borderRadius: 30,
    backgroundColor: "#F5F5FA",
    borderColor: "#D8D8D8",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
  },
  sosButtonBackground: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#FFF5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  sosButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#E30613",
    justifyContent: "center",
    alignItems: "center",
  },
  iconPlaceholder: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  sosText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default EmergencyCard;
