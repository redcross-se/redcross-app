import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions, Platform } from "react-native";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { getAddressFromCoordinates } from "../services/locationService";
import BottomSheet from "@gorhom/bottom-sheet";
import FirstAidInstructions from "../components/FirstAidInstructions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EmergencyDispatched = () => {
  const [eta, setEta] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [branchLocation, setBranchLocation] = useState(null);

  useEffect(() => {
    // Get branch location from AsyncStorage and user's current location
    const getBranchAndUserLocation = async () => {
      const branch = JSON.parse(await AsyncStorage.getItem("branch"));
      const emergency = JSON.parse(await AsyncStorage.getItem("emergency"));

      console.log("BRANCH", branch);
      console.log("EMERGENCY", emergency);

      setBranchLocation(branch.location);
      setUserLocation(emergency.location);
      calculateETA(emergency.location, branch.location);
    };

    getBranchAndUserLocation();
  }, []);

  const calculateETA = async (origin, destination) => {
    try {
      const result = await getDirections(origin, destination);
      setEta(result.duration);
    } catch (error) {
      console.error("Error calculating ETA:", error);
    }
  };

  return (
    <View style={styles.container}>
      {userLocation && branchLocation && (
        <MapView
          provider={Platform.OS === "ios" ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={userLocation}
            title="Your Location"
            pinColor="red"
          />
          <Marker
            coordinate={branchLocation}
            title="Ambulance Location"
            pinColor="green"
          />
        </MapView>
      )}

      <BottomSheet
        index={1}
        snapPoints={["25%", "50%", "75%"]}
        backgroundStyle={styles.bottomSheet}
      >
        <View style={styles.etaContainer}>
          <Text style={styles.etaText}>
            Estimated arrival time:{" "}
            {eta ? `${Math.round(eta)} minutes` : "Calculating..."}
          </Text>
        </View>
        <FirstAidInstructions />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  bottomSheet: {
    backgroundColor: "white",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  etaContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  etaText: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default EmergencyDispatched;
