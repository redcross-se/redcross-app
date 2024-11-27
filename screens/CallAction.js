import React from "react";
import { View, StyleSheet } from "react-native";
import TopSection from "../components/EmergencyInfo/TopSection";
import ThreeButtonGroup from "../components/CallAction/ThreeButtonGroup";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { useSocket } from "../context/SocketContext";
import Peer from "peerjs";
const CallAction = () => {
  const { socket, emergency } = useSocket();
  const navigation = useNavigation();
  const [peerId, setPeerId] = useState(null);
  const [remotePeerId, setRemotePeerId] = useState(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    if (!socket) return;
    const peer = new Peer();
    peer.on("open", (id) => {
      setPeerId(id);
      socket.emit("registerInitiatorPeer", {
        peerId,
        emergencyId: emergency.id,
      });
    });

    peer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
          });
        })
        .catch((err) => console.error("Failed to get local stream", err));
    });

    socket.on("peerId", ({ peerId }) => {
      setRemotePeerId(peerId);
    });

    if (remotePeerId) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          const call = peer.call(remotePeerId, stream);
          call.on("stream", (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
          });
        })
        .catch((err) => console.error("Failed to get local stream", err));
    }

    return () => {
      peer.destroy();
    };
  }, [socket, emergency.roomId]);

  return (
    <View style={styles.container}>
      <TopSection heading="Connected" subtext="00:00" />
      <ThreeButtonGroup />
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

export default CallAction;
