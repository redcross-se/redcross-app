import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";

const SharedForm = ({ isSignUp, onSubmit, navigation }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    const { fullName, email, phoneNumber, password } = form;
    if (isSignUp && (!fullName || !phoneNumber || !email || !password)) {
      alert("Please fill in all fields.");
      return;
    }
    if (!isSignUp && (!email || !password)) {
      alert("Please fill in all fields.");
      return;
    }
    onSubmit(form);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.innerContainer}>
        <Image
          source={require("../../assets/Login.png")} 
          style={styles.image}
        />
        <Text style={styles.title}>{isSignUp ? "Sign up" : "Log in"}</Text>

        {isSignUp && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={form.fullName}
              onChangeText={(value) => handleInputChange("fullName", value)}
            />
            <PhoneInput
              defaultCode="LB"
              value={form.phoneNumber}
              layout="first"
              textContainerStyle={styles.phoneInput}
              containerStyle={styles.phoneInputContainer}
              textInputProps={{
                placeholder: "Phone Number",
                style: styles.phoneInput,
              }}
              onChangeFormattedText={(value) =>
                handleInputChange("phoneNumber", value)
              }
            />
          </>
        )}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={form.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            value={form.password}
            onChangeText={(value) => handleInputChange("password", value)}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIconContainer}
          >
            <Text style={styles.eyeIcon}>
              {passwordVisible ? "🙈" : "👁️"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {isSignUp ? "Sign up" : "Log in"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.orText}>OR</Text>

        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require("../../assets/google.png")} 
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>
            Sign {isSignUp ? "up" : "in"} with Google
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate(isSignUp ? "Login" : "SignUp")}
          >
            {isSignUp ? "Log in instead" : "Sign up"}
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E30613",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    height: 60,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    height: 60,
  },
  passwordInput: {
    flex: 1,
    borderWidth: 0,
    height: "100%",
  },
  eyeIconContainer: {
    padding: 10,
  },
  eyeIcon: {
    fontSize: 20,
  },
  button: {
    backgroundColor: "#E30613",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    color: "#aaa",
    marginVertical: 15,
  },
  googleButton: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
  },
  linkText: {
    color: "#E30613",
    fontWeight: "bold",
  },
  phoneInputContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
  },
  phoneInput: {
    fontSize: 16,
    backgroundColor: "transparent",
  },
});

export default SharedForm;
