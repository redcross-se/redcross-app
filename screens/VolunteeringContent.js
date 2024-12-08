import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import Banner from "../components/Volunteering/Banner";
import Bottom from "../components/EmergencyCall/Bottom";
import SectionHeader from "../components/Volunteering/SectionHeader";
import { StatusBar, Platform } from "react-native";

const VolunteeringContent = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Banner Section */}
        <Banner
          text="Saving lives starts by learning how to do so."
          imageSource={require("../assets/heart.png")}
        />

        {/* Videos Section */}
        <View style={styles.sectionSpacing}>
          <SectionHeader
            title="Videos"
            onViewAllPress={() => console.log("View all videos")}
          />
          <View style={styles.imageGrid}>
            <Image
              source={require("../assets/image3.png")} // Replace with actual image
              style={styles.cardImage}
            />
            <Image
              source={require("../assets/image3.png")} // Replace with actual image
              style={styles.cardImage}
            />
          </View>
        </View>

        {/* Articles Section */}
        <View style={styles.sectionSpacing}>
          <SectionHeader
            title="Articles"
            onViewAllPress={() => console.log("View all articles")}
          />
          <View style={styles.imageGrid}>
            <Image
              source={require("../assets/image3.png")} // Replace with actual image
              style={styles.cardImage}
            />
            <Image
              source={require("../assets/image3.png")} // Replace with actual image
              style={styles.cardImage}
            />
          </View>
        </View>
      </ScrollView>

      {/* Elevated Bottom Navigation */}
      <View style={styles.bottomElevated}>
        <Bottom navigation={navigation} InitialTab={"record"} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 0,
  },
  scrollContent: {
    padding: 16,
  },
  sectionSpacing: {
    marginTop: 24,
  },
  imageGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  cardImage: {
    width: "48%",
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
    backgroundColor: "#E0E0E0",
  },
  bottomElevated: {
    position: "absolute",
    bottom: 22,
    width: "100%",
    backgroundColor: "#FFFFFF",
    elevation: 6,
  },
});

export default VolunteeringContent;
