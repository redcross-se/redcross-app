import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { getAddressFromCoordinates } from "../services/locationService";
import FirstAidInstructions from "../components/FirstAidInstructions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getDirections } from "../services/locationService";
import { useNavigation } from "@react-navigation/native";

const EmergencyDispatched = () => {
  const navigation = useNavigation();
  const [eta, setEta] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [branchLocation, setBranchLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState(null);
  console.log("BRANCH LOCATION", branchLocation);
  console.log("USER LOCATION", userLocation);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  useEffect(() => {
    // Get branch location from AsyncStorage and user's current location
    const getBranchAndUserLocation = async () => {
      const branch = JSON.parse(await AsyncStorage.getItem("branch"));
      const emergency = JSON.parse(await AsyncStorage.getItem("emergency"));

      console.log("BRANCH", branch);
      const branchLocation = {
        latitude: branch.latitude,
        longitude: branch.longtitude,
      };
      setBranchLocation(branchLocation);
      setUserLocation(emergency.location);
      calculateETA(emergency.location, branchLocation);
    };

    getBranchAndUserLocation();
  }, []);

  const calculateETA = async (origin, destination) => {
    try {
      const result = await getDirections(origin, destination);
      setEta(result.duration);
      const points = decodePolyline(result.polyline);
      setRouteCoordinates(points);
    } catch (error) {
      console.error("Error calculating ETA:", error);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {userLocation && branchLocation && (
          <MapView
            provider={Platform.OS === "android" ? "google" : undefined}
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
            {routeCoordinates && (
              <Polyline
                coordinates={routeCoordinates}
                strokeColor="#0066ff"
                strokeWidth={4}
              />
            )}
          </MapView>
        )}

        <View style={styles.contentContainer}>
          <View style={styles.etaContainer}>
            <Text style={styles.etaText}>
              Estimated arrival time:{" "}
              {eta ? `${Math.round(eta)} minutes` : "Calculating..."}
            </Text>
          </View>
          <FirstAidInstructions />
          <Button
            title="Exit to Home"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const decodePolyline = (encoded) => {
  const points = [];
  let index = 0,
    len = encoded.length;
  let lat = 0,
    lng = 0;

  while (index < len) {
    let shift = 0,
      result = 0;
    let byte;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    let dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    let dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    points.push({
      latitude: lat / 1e5,
      longitude: lng / 1e5,
    });
  }
  return points;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.6,
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
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
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 16,
    alignItems: "center",
  },
  etaText: {
    fontSize: 18,
    fontWeight: "600",
  },
  handleIndicator: {
    backgroundColor: "#000",
    width: 40,
    height: 4,
    borderRadius: 2,
  },
});

export default EmergencyDispatched;
