import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { useSocket } from "../../context/SocketContext";
import { getAddressFromCoordinates } from "../../services/locationService";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  cancelAnimation,
  runOnJS,
} from "react-native-reanimated";

const EmergencyCard = ({ navigation }) => {
  const { socket, setEmergency } = useSocket();

  const [countdown, setCountdown] = useState("Hold for\n3 seconds");
  const timerRef = useRef(null);

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handleLongPress = async () => {
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

      socket.on("newEmergency", (data) => {
        setEmergency(data);
        navigation.navigate("EmergencyInfo", {
          location: { latitude, longitude, address },
          userId: userData.id,
        });
      });
    } catch (error) {
      console.error("Error initiating emergency:", error);
    }
  };

  const handlePressIn = () => {
    // Reset countdown in case it was in another state
    setCountdown("3");

    // Start a timeout to trigger emergency after exactly 3 seconds
    const emergencyTimeout = setTimeout(() => {
      handleLongPress();
    }, 3000);

    // Store the timeout reference so we can clear it if needed
    timerRef.current = {
      countdownInterval: null,
      emergencyTimeout,
    };

    // Animate scale up over 3 seconds
    scale.value = withTiming(1.2, {
      duration: 3000,
      easing: Easing.linear,
    });

    // Start the countdown visually
    let secondsRemaining = 3;
    timerRef.current.countdownInterval = setInterval(() => {
      secondsRemaining -= 1;
      if (secondsRemaining > 0) {
        setCountdown(String(secondsRemaining));
      } else {
        clearInterval(timerRef.current.countdownInterval);
      }
    }, 1000);
  };

  const handlePressOut = () => {
    // If user releases early, cancel everything
    if (timerRef.current) {
      clearInterval(timerRef.current.countdownInterval);
      clearTimeout(timerRef.current.emergencyTimeout);
      timerRef.current = null;
    }

    // Reset countdown text
    setCountdown("Hold for\n3 seconds");

    // Cancel animation
    cancelAnimation(scale);
    scale.value = withTiming(1, {
      duration: 200,
      easing: Easing.out(Easing.ease),
    });
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
            source={require("../../assets/Emergency.svg")}
            style={styles.sosButtonBackground}
          >
            <TouchableWithoutFeedback
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <Animated.View style={[styles.sosButton, animatedStyle]}>
                <Image
                  source={require("../../assets/EmergencyButtonIcon.png")}
                  style={styles.iconPlaceholder}
                />
                <Text style={styles.sosText}>{countdown}</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
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
