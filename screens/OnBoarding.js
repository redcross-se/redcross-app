import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

const { width: WIDTH } = Dimensions.get("window");

const OnBoarding = () => {
  const navigation = useNavigation(); // Get navigation object

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.redCross}>RED CROSS</Text>
        <Text style={styles.title}>Together For Humanity</Text>
      </View>
      <View style={styles.topView}>
        <ImageBackground
          source={require("../assets/image3.png")}
          style={styles.background}
          imageStyle={styles.imageStyle}
        ></ImageBackground>
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
    zIndex: 0,
  },
  background: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 2,
  },
  redCross: {
    fontSize: 48,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
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
    zIndex: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "black",
  },
});

export default OnBoarding;
