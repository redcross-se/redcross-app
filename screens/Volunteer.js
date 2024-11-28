import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Banner from "../components/Volunteering/Banner";
import RequestCard from "../components/Volunteering/RequestCard";
import DonationCard from "../components/Volunteering/DonationCard";
import VolunteerCard from "../components/Volunteering/VolunteerCard";
import Bottom from "../components/EmergencyCall/Bottom";
import SectionHeader from "../components/Volunteering/SectionHeader";

const Volunteer = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Banner
          text="Saving Lives is Easy, you can start today!"
          subText="Blood Type: A+"
          imageSource={require("../assets/heart.png")}
        />
        <View style={styles.sectionSpacing}>
          <SectionHeader
            title="Requests"
            onViewAllPress={() => console.log("View all requests")}
          />
          <RequestCard
            hospitalName="X Hospital"
            bloodType="A+, A-"
            onPress={() => console.log("Urgent pressed")}
          />
          <RequestCard
            hospitalName="Y Hospital"
            bloodType="B+, B-"
            onPress={() => console.log("Urgent pressed")}
          />
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
            onPress={() => console.log("Apply pressed")}
          />
        </View>
      </ScrollView>
      {/* Elevated Bottom Navigation */}
      <View style={styles.bottomElevated}>
        <Bottom navigation={navigation} InitialTab={"favorite"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
