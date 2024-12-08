import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { updateProfile } from "../services/userService";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState({
    email: "",
    phoneNumber: "",
    fullName: "",
    dob: "",
    bloodType: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    loadUserData();
    requestGalleryPermission();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setProfileImage(parsedUser.profilePicture);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load user data");
    }
  };

  const requestGalleryPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Please grant camera roll permissions"
        );
      }
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      await updateProfile(user, token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to update profile");
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    // Implement password change logic here
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      // Implement profile picture upload logic here
    }
  };

  const renderProfileTab = () => (
    <View style={styles.tabContent}>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={user.fullName}
        onChangeText={(text) => setUser({ ...user, fullName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={user.email}
        onChangeText={(text) => setUser({ ...user, email: text })}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={user.phoneNumber}
        onChangeText={(text) => setUser({ ...user, phoneNumber: text })}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPasswordTab = () => (
    <View style={styles.tabContent}>
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry
        value={passwordData.currentPassword}
        onChangeText={(text) =>
          setPasswordData({ ...passwordData, currentPassword: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={passwordData.newPassword}
        onChangeText={(text) =>
          setPasswordData({ ...passwordData, newPassword: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry
        value={passwordData.confirmPassword}
        onChangeText={(text) =>
          setPasswordData({ ...passwordData, confirmPassword: text })
        }
      />
      <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );

  const renderProfilePictureTab = () => (
    <View style={styles.tabContent}>
      {profileImage && (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      )}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Choose Photo</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "profile" && styles.activeTab]}
          onPress={() => setActiveTab("profile")}
        >
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "password" && styles.activeTab]}
          onPress={() => setActiveTab("password")}
        >
          <Text style={styles.tabText}>Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "picture" && styles.activeTab]}
          onPress={() => setActiveTab("picture")}
        >
          <Text style={styles.tabText}>Picture</Text>
        </TouchableOpacity>
      </View>

      {activeTab === "profile" && renderProfileTab()}
      {activeTab === "password" && renderPasswordTab()}
      {activeTab === "picture" && renderProfilePictureTab()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tabBar: {
    flexDirection: "row",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
  },
  tabText: {
    color: "#007AFF",
  },
  tabContent: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default Settings;
