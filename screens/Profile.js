// Profile.js
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import HeaderComponent from "../components/EmergencyCall/Header";
import ProfileInfoComponent from "../components/UserProfile/ProfileInfo";
import DetailsGridComponent from "../components/UserProfile/DetailsGrid";
import AllergiesList from "../components/UserProfile/AllergyList";
import EmergencyContacts from "../components/UserProfile/EmergencyContact";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateProfile } from "../services/userService";

const Profile = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      setUserDetails(user);
    };
    fetchUserDetails();
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      await updateProfile(userDetails, token);
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
      console.error(error);
    }
  };

  const handleInputChange = (field, value) => {
    setUserDetails({ ...userDetails, [field]: value });
  };

  if (!userDetails) {
    return <Text>Loading...</Text>;
  }

  const details = [
    { label: "Age", value: userDetails.age || "Add your age" },
    {
      label: "Blood type",
      value: userDetails.bloodType || "Add your blood type",
    },
    {
      label: "Height",
      value: userDetails.height
        ? `${userDetails.height} cm`
        : "Add your height",
    },
    {
      label: "Weight",
      value: userDetails.weight
        ? `${userDetails.weight} kg`
        : "Add your weight",
    },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
    >
      <ScrollView style={styles.container}>
        <ProfileInfoComponent
          name={userDetails.fullName}
          dateOfBirth={userDetails.dob || "Add Date of Birth"}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleInputChange={handleInputChange}
        />
        <DetailsGridComponent
          details={details}
          isEditing={isEditing}
          handleInputChange={handleInputChange}
        />
        <AllergiesList
          allergies={userDetails.allergies || []}
          isEditing={isEditing}
          setUserDetails={(updatedAllergies) =>
            handleInputChange("allergies", updatedAllergies)
          }
        />
        <EmergencyContacts
          contacts={userDetails.emergencyContacts || []}
          isEditing={isEditing}
          setUserDetails={(updatedContacts) =>
            handleInputChange("emergencyContacts", updatedContacts)
          }
        />
        {isEditing ? (
          <Button title="Save Profile" onPress={handleSaveProfile} />
        ) : (
          <Button title="Edit Profile" onPress={handleEditProfile} />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});

export default Profile;
