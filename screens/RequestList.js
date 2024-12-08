import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getBloodRequests } from "../services/userService";
import RequestCard from "../components/Volunteering/RequestCard";

const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [userBloodType, setUserBloodType] = useState(null);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userData = JSON.parse(await AsyncStorage.getItem("user"));
      setUserBloodType(userData.bloodType);

      const requestsData = await getBloodRequests(token);
      setRequests(requestsData);
    } catch (error) {
      console.error("Error loading requests:", error);
    }
  };

  if (requests.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={requests}
      renderItem={({ item }) => (
        <RequestCard
          hospitalName={item.hospital}
          bloodType={item.bloodTypes.join(", ")}
          onPress={() => {
            /* Handle request details */
          }}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
});

export default RequestsList;
