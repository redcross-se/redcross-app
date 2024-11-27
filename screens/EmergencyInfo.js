import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import TopSection from "../components/EmergencyInfo/TopSection";
import HelpSelection from "../components/EmergencyInfo/HelpSection";
import CancelButton from "../components/EmergencyInfo/CancelButton";
import { useSocket } from "../context/SocketContext";

const EmergencyInfo = ({ navigation }) => {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on("emergencyAccepting", (data) => {
      console.log("Emergency accepting", data);
      navigation.navigate("CallAction");

      // Clean up the event listener on component unmount
      return () => {
        socket.off("emergencyAccepting");
      };
    });
  }, [socket]);

  return (
    <View style={styles.container}>
      {/* Top Image and Text Section */}
      <TopSection
        heading="Connecting with responder..."
        subtext="Please stand by, we are currently requesting for help. Nearby rescue services will see your call for help."
      />
      <HelpSelection
        title="Who needs help?"
        options={[
          { text: "Me", isActive: false },
          { text: "Someone else", isActive: false },
        ]}
      />
      <HelpSelection
        title="What happened?"
        options={[
          { text: "Accident", isActive: false },
          { text: "Allergic Reaction", isActive: false },
          { text: "Other", isActive: false },
        ]}
      />
      <CancelButton navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF5A5F",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingVertical: 30,
  },
});

export default EmergencyInfo;
