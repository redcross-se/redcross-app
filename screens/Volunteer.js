import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import Banner from "../components/Volunteering/Banner";
import RequestCard from "../components/Volunteering/RequestCard";
import DonationCard from "../components/Volunteering/DonationCard";
import VolunteerCard from "../components/Volunteering/VolunteerCard";
import Bottom from "../components/EmergencyCall/Bottom";
import SectionHeader from "../components/Volunteering/SectionHeader";
import { StatusBar, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getBloodRequests } from "../services/userService";

const Volunteer = ({ navigation }) => {
  const [requests, setRequests] = useState([]);
  const [userBloodType, setUserBloodType] = useState(null);
  const [userData, setUserData] = useState(null);

  function isCompatible(userBloodType, requestBloodType) {
    const compatibilityMap = {
      O: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
      A: ["A-", "A+", "AB-", "AB+"],
      B: ["B-", "B+", "AB-", "AB+"],
      AB: ["AB-", "AB+"],
    };
    //Request blood types is a JSON array of strings
    for (let i = 0; i < requestBloodType.length; i++) {
      if (
        compatibilityMap[userBloodType.charAt(0)].includes(requestBloodType[i])
      ) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    loadUserAndRequests();
  }, [navigation]);

  const loadUserAndRequests = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userData = JSON.parse(await AsyncStorage.getItem("user"));
      setUserBloodType(userData.bloodType);
      setUserData(userData);

      const requestsData = await getBloodRequests(token);
      const compatibleRequests = requestsData.filter((request) =>
        isCompatible(userData.bloodType, request.bloodTypes)
      );
      setRequests(compatibleRequests.slice(0, 3)); // Get top 3 compatible requests
    } catch (error) {
      console.error("Error loading requests:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Banner
          text="Saving Lives is Easy, you can start today!"
          subText={`Blood Type: ${userBloodType || ""}`}
          imageSource={require("../assets/Volunteering.png")}
        />
        <View style={styles.sectionSpacing}>
          <SectionHeader
            title="Requests"
            onViewAllPress={() => navigation.navigate("RequestsList")}
          />
          {requests.map((request, index) => (
            <RequestCard
              key={request.id || index}
              hospitalName={request.hospital}
              bloodType={request.bloodTypes.join(", ")}
              onPress={() => navigation.navigate("RequestDetails", { request })}
            />
          ))}
        </View>
        <View style={styles.sectionSpacing}>
          <SectionHeader title="Donations" />
          <DonationCard
            text="Every dollar counts!"
            onPress={() => console.log("Donate pressed")}
          />
        </View>

        {/* Volunteering Section */}
        <View style={styles.sectionSpacing}>
          <SectionHeader title="Volunteering" />
          <VolunteerCard
            text="Start saving lives"
            onPress={() => navigation.navigate("VolunteerForm", { userData })}
          />
        </View>
      </ScrollView>
      {/* Elevated Bottom Navigation */}
      <View style={styles.bottomElevated}>
        <Bottom navigation={navigation} InitialTab={"favorite"} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E8EB",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 0,
  },
  scrollContent: {
    padding: 16,
  },
  sectionSpacing: {
    marginTop: 24,
  },
  bottomElevated: {
    position: "absolute",
    bottom: 22,
    width: "100%",
    backgroundColor: "#FFFFFF",
    elevation: 6,
  },
});

export default Volunteer;
