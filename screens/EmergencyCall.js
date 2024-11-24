import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import HeaderComponent from "../components/EmergencyCall/Header";
import EmergencyCard from "../components/EmergencyCall/EmergencyCard";
import ChatCard from "../components/EmergencyCall/ChatCard";
import BottomNavigation from "../components/EmergencyCall/Bottom";

const EmergencyPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header Section */}
        <HeaderComponent />

        {/* Content Section */}
        <View style={styles.content}>
          <EmergencyCard />
          <View style={styles.chatContainer}>
            <ChatCard />
          </View>
          <EmergencyCard />
          <EmergencyCard />
        </View>
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E8EB",
    position: "relative",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  content: {
    flex: 1,
  },
  chatContainer: {
    marginBottom: 20,
  },
});

export default EmergencyPage;
