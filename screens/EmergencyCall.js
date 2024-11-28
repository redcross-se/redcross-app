import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import HeaderComponent from "../components/EmergencyCall/Header";
import EmergencyCard from "../components/EmergencyCall/EmergencyCard";
import ChatCard from "../components/EmergencyCall/ChatCard";
import BottomNavigation from "../components/EmergencyCall/Bottom";
import { StatusBar, Platform } from "react-native";

const EmergencyPage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <HeaderComponent />
        <View style={styles.content}>
          <EmergencyCard navigation={navigation} />
          <View style={styles.chatContainer}>
            <ChatCard />
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomNavigationContainer}>
        <BottomNavigation navigation={navigation} InitialTab={"home"} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E8EB",
    position: "relative",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 0,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  content: {
    flex: 1,
  },
  bottomNavigationContainer: {
    position: "absolute",
    bottom: 22,
    width: "100%",
    backgroundColor: "#FFFFFF",
    elevation: 6,
  },
});

export default EmergencyPage;
