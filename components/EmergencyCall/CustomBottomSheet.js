import { StyleSheet, Text, KeyboardAvoidingView, Platform } from "react-native";
import React, { forwardRef, useMemo } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import ChatView from "./ChatView";

const CustomBottomSheet = forwardRef((props, ref) => {
  const snapPoints = useMemo(() => ["15%", "100%"], []);
  console.log("CHANNEL ID IN SHEET", props.channelId);

  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: "#000" }}
      backgroundStyle={{ backgroundColor: "#fff" }}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.containerHeadline}>Chat</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={130}
          style={{ flex: 1 }}
        >
          <ChatView channelId={props.channelId} />
        </KeyboardAvoidingView>
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingBottom: 40,
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 0,
    textAlign: "center",
  },
});

export default CustomBottomSheet;
