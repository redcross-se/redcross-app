// Profile.js
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import HeaderComponent from "../components/EmergencyCall/Header";
import ProfileInfoComponent from "../components/UserProfile/ProfileInfo";
import DetailsGridComponent from "../components/UserProfile/DetailsGrid";
import AllergiesList from "../components/UserProfile/AllergyList";
import EmergencyContacts from "../components/UserProfile/EmergencyContact";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateProfile } from "../services/userService";
import { Picker } from "@react-native-picker/picker";

const Profile = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [pickerValue, setPickerValue] = useState("");

  const fetchUserDetails = async () => {
    const userString = await AsyncStorage.getItem("user");
    const user = JSON.parse(userString);

    if (user) {
      // Ensure allergies are stored as a string
      if (user.allergies && Array.isArray(user.allergies)) {
        user.allergies = user.allergies.join(",");
      }

      // Ensure emergencyContacts are stored as an array
      if (
        user.emergencyContacts &&
        typeof user.emergencyContacts === "string"
      ) {
        try {
          user.emergencyContacts = JSON.parse(user.emergencyContacts);
        } catch (e) {
          console.error("Failed to parse emergencyContacts:", e);
          user.emergencyContacts = [];
        }
      }

      setUserDetails({ ...user });
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleSaveProfile = async (updatedDetails) => {
    console.log(updatedDetails);
    try {
      const token = await AsyncStorage.getItem("token");
      await updateProfile(updatedDetails, token);
      Alert.alert("Success", "Profile updated successfully");
      await AsyncStorage.setItem("user", JSON.stringify(updatedDetails));
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
      console.error(error);
    }
  };

  const handleInputChange = (field, value) => {
    setUserDetails((prev) => ({ ...prev, [field]: value }));
    console.log(userDetails);
  };

  const openModalForField = (field) => {
    setEditingField(field);
    if (field === "bloodType") {
      setPickerValue(userDetails?.bloodType || "");
    } else if (field === "allergies") {
      setPickerValue("");
    } else if (field === "emergencyContacts") {
      setInputValue({ name: "", phone: "" });
    } else {
      setInputValue(userDetails?.[field] ? String(userDetails[field]) : "");
    }
    setModalVisible(true);
  };

  const saveFieldValue = () => {
    let val = inputValue;

    if (editingField === "bloodType") {
      val = pickerValue;
    } else if (editingField === "height" || editingField === "weight") {
      if (!/^\d+$/.test(inputValue)) {
        Alert.alert("Invalid Input", "Please enter a valid number");
        return;
      }
      val = Number(inputValue);
    }

    const updatedUserDetails = { ...userDetails, [editingField]: val };
    setUserDetails(updatedUserDetails);
    handleSaveProfile(updatedUserDetails);
    setModalVisible(false);
    setEditingField(null);
  };

  const addAllergy = () => {
    if (pickerValue) {
      let updatedAllergies = userDetails.allergies
        ? [...new Set(userDetails.allergies.split(",").map((a) => a.trim()))]
        : [];
      if (!updatedAllergies.includes(pickerValue)) {
        updatedAllergies.push(pickerValue);
      }

      const updatedAllergiesString = updatedAllergies.join(",");
      handleInputChange("allergies", updatedAllergiesString);
      handleSaveProfile({ ...userDetails, allergies: updatedAllergiesString });
      setModalVisible(false);
      setEditingField(null);
    } else {
      Alert.alert("Invalid Input", "Please select an allergy");
    }
  };

  const removeAllergy = (allergyToRemove) => {
    let updatedAllergies = userDetails.allergies
      ? userDetails.allergies
          .split(",")
          .filter((a) => a.trim() !== allergyToRemove)
      : [];
    const updatedAllergiesString = updatedAllergies.join(",");
    handleInputChange("allergies", updatedAllergiesString);
    handleSaveProfile({ ...userDetails, allergies: updatedAllergiesString });
  };

  const addEmergencyContact = () => {
    const { name, phone } = inputValue;
    if (!name || !phone) {
      Alert.alert("Invalid Input", "Please enter both name and phone number");
      return;
    }

    const updatedContacts = [
      ...(userDetails.emergencyContacts || []),
      { name, phone },
    ];
    handleInputChange("emergencyContacts", updatedContacts);
    handleSaveProfile({ ...userDetails, emergencyContacts: updatedContacts });
    setModalVisible(false);
    setEditingField(null);
  };

  const editEmergencyContact = (index, contact) => {
    const updatedContacts = [...userDetails.emergencyContacts];
    updatedContacts[index] = contact;
    handleInputChange("emergencyContacts", updatedContacts);
    handleSaveProfile({ ...userDetails, emergencyContacts: updatedContacts });
    setModalVisible(false);
    setEditingField(null);
  };

  if (!userDetails) {
    return <Text>Loading...</Text>;
  }

  const details = [
    { label: "Age", value: userDetails.age || "Add your age", field: "age" },
    {
      label: "Blood type",
      value: userDetails.bloodType || "Add your blood type",
      field: "bloodType",
    },
    {
      label: "Height",
      value: userDetails.height
        ? `${userDetails.height} cm`
        : "Add your height",
      field: "height",
    },
    {
      label: "Weight",
      value: userDetails.weight
        ? `${userDetails.weight} kg`
        : "Add your weight",
      field: "weight",
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
          onEditName={() => openModalForField("fullName")}
        />
        <DetailsGridComponent
          details={details}
          onEditField={openModalForField}
        />
        <AllergiesList
          allergies={
            userDetails.allergies ? userDetails.allergies.split(",") : []
          }
          onAddAllergy={() => openModalForField("allergies")}
          onRemoveAllergy={removeAllergy}
        />
        <EmergencyContacts
          contacts={userDetails.emergencyContacts || []}
          onAddContact={() => openModalForField("emergencyContacts")}
          onSaveContacts={(updatedContacts) => {
            handleInputChange("emergencyContacts", updatedContacts);
            handleSaveProfile({
              ...userDetails,
              emergencyContacts: updatedContacts,
            });
          }}
        />
      </ScrollView>
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {editingField === "bloodType" && (
              <>
                <Text style={styles.modalTitle}>Select Blood Type</Text>
                <Picker
                  selectedValue={pickerValue}
                  onValueChange={(itemValue) => setPickerValue(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Blood Type" value="" />
                  <Picker.Item label="A+" value="A+" />
                  <Picker.Item label="A-" value="A-" />
                  <Picker.Item label="B+" value="B+" />
                  <Picker.Item label="B-" value="B-" />
                  <Picker.Item label="AB+" value="AB+" />
                  <Picker.Item label="AB-" value="AB-" />
                  <Picker.Item label="O+" value="O+" />
                  <Picker.Item label="O-" value="O-" />
                </Picker>
              </>
            )}
            {editingField === "allergies" && (
              <>
                <Text style={styles.modalTitle}>Select Allergy</Text>
                <Picker
                  selectedValue={pickerValue}
                  onValueChange={(val) => setPickerValue(val)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Allergy" value="" />
                  <Picker.Item label="Peanuts" value="Peanuts" />
                  <Picker.Item label="Shellfish" value="Shellfish" />
                  <Picker.Item label="Milk" value="Milk" />
                  <Picker.Item label="Eggs" value="Eggs" />
                  <Picker.Item label="Soy" value="Soy" />
                  <Picker.Item label="Wheat" value="Wheat" />
                </Picker>
              </>
            )}
            {editingField === "emergencyContacts" && (
              <>
                <Text style={styles.modalTitle}>Add Emergency Contact</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Name"
                  value={inputValue?.name || ""}
                  onChangeText={(text) =>
                    setInputValue((prev) => ({ ...(prev || {}), name: text }))
                  }
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Phone"
                  value={inputValue?.phone || ""}
                  onChangeText={(text) =>
                    setInputValue((prev) => ({ ...(prev || {}), phone: text }))
                  }
                  keyboardType="phone-pad"
                />
              </>
            )}
            {editingField &&
              editingField !== "bloodType" &&
              editingField !== "allergies" &&
              editingField !== "emergencyContacts" && (
                <>
                  <Text style={styles.modalTitle}>Enter {editingField}</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder={`Enter your ${editingField}`}
                    keyboardType={
                      editingField === "height" || editingField === "weight"
                        ? "numeric"
                        : "default"
                    }
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                  />
                </>
              )}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  setEditingField(null);
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              {editingField === "allergies" ? (
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={addAllergy}
                >
                  <Text style={styles.modalButtonText}>Add</Text>
                </TouchableOpacity>
              ) : editingField === "emergencyContacts" ? (
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={addEmergencyContact}
                >
                  <Text style={styles.modalButtonText}>Add Contact</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={saveFieldValue}
                >
                  <Text style={styles.modalButtonText}>Save</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000066",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#CCC",
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#E30613",
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#FFF",
  },
});

export default Profile;
