import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import TopSection from "../components/EmergencyInfo/TopSection";
import ThreeButtonGroup from "../components/CallAction/ThreeButtonGroup";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { useSocket } from "../context/SocketContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  Call,
  CallControls,
  CallContent,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { useAuth } from "../context/authContext";
import ChatView from "../components/EmergencyCall/ChatView";
import CustomBottomSheet from "../components/EmergencyCall/CustomBottomSheet";
import { OverlayProvider } from "stream-chat-expo";

const CallAction = () => {
  const { socket, emergency } = useSocket();
  const navigation = useNavigation();
  const [streamClient, setStreamClient] = useState(null);
  const [userCall, setUserCall] = useState(null);
  const roomID = emergency.roomId;

  const { user, token, streamToken } = useAuth();
  console.log("USER", user);
  console.log("USER ID", user.id);
  const userID = { id: user.id.toString() };
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    if (!socket) return;
    console.log("SOCKET CHANGED");

    const handleAmbulanceDispatched = (data) => {
      console.log("Ambulance dispatched", data);
      //update emergency information
      AsyncStorage.setItem("branch", JSON.stringify(data.branch));
      console.log("BRANCH", data.branch);
      AsyncStorage.setItem("emergency", JSON.stringify(emergency));
      console.log("EMERGENCY", emergency);
      if (userCall && streamClient) {
        userCall.leave();
        streamClient.disconnectUser();
      }

      //keep retrying to leave the call until it succeeds
      const retryLeaveCall = () => {
        userCall.leave();
        streamClient.disconnectUser();
      };
      retryLeaveCall();

      navigation.navigate("EmergencyDispatched");
    };

    socket.on("ambulanceDispatched", handleAmbulanceDispatched);

    return () => {
      socket.off("ambulanceDispatched", handleAmbulanceDispatched);
    };
  }, [socket, userCall, streamClient]);

  useEffect(() => {
    if (!user || !token || !streamToken || streamClient) return;
    const myclient = StreamVideoClient.getOrCreateInstance({
      apiKey: "3pkfpxv4cver",
      user: userID,
      token: streamToken,
    });
    const call = myclient.call("default", roomID);
    call.join({ create: true });
    setUserCall(call);
    setStreamClient(myclient);
  }, [user, token, streamToken]);

  const goToHome = () => {
    streamClient.disconnectUser();
    userCall.leave();
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      {streamClient && userCall && (
        <StreamVideo client={streamClient}>
          <OverlayProvider>
            <StreamCall call={userCall}>
              <View style={styles.chatContainer}>
                <CallContent
                  onHangupCallHandler={goToHome}
                  layout="spotlight"
                />
              </View>
            </StreamCall>
            <CustomBottomSheet channelId={roomID} />
          </OverlayProvider>
        </StreamVideo>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 0.85,
  },
});

export default CallAction;
