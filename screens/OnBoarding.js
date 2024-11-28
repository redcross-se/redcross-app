import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const OnBoarding = () => {
  const navigation = useNavigation(); // Get navigation object

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <ImageBackground
          source={require("../assets/image3.png")}
          style={styles.background}
          imageStyle={styles.imageStyle}
        ></ImageBackground>
        <Text style={styles.title}>Together For Humanity</Text>
      </View>
      <View style={styles.bottomView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={require("../assets/DarkRedGradient.png")}
        style={styles.gradientBackground}
      ></ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  background: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    color: "white",
    textAlign: "center",
    position: "absolute", // Position text absolutely
    bottom: 40, // Adjust this value to place the text below the cross
    zIndex: 2,
  },
  bottomView: {
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  gradientBackground: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    height: "100%",
    zIndex: 1,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    zIndex: 1,
  },
  buttonText: {
    fontSize: 18,
    color: "black",
  },
});

export default OnBoarding;
