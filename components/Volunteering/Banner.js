import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Banner = ({ text, subText, imageSource }) => {
  return (
    <View style={styles.bannerContainer}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.subText}>{subText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginHorizontal: 8,
    marginVertical: 4,
    overflow: "hidden",
  },
  image: {
    width: 190,
    height: 160,
    resizeMode: "contain",
    marginRight: 16,
    position: "relative",
    top: 20,
    left: -30,
  },
  textContainer: {
    flex: 1,
    position: "relative",
    top: 20,
    left: -30,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: "#888",
  },
});

export default Banner;
