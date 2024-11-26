import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import HeaderComponent from "../components/EmergencyCall/Header";
import EmergencyCard from "../components/EmergencyCall/EmergencyCard";
import ChatCard from "../components/EmergencyCall/ChatCard";
import BottomNavigation from "../components/EmergencyCall/Bottom";

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
      <BottomNavigation navigation={navigation} InitialTab={"home"}/>
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
