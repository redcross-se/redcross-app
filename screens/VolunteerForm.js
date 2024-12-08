import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
// import * as DocumentPicker from "expo-document-picker";

const VolunteerForm = ({ route, navigation }) => {
  const { userData } = route.params;
  const [formData, setFormData] = useState({
    fullName: userData?.fullName || "",
    age: userData?.age?.toString() || "",
    gender: "",
    cv: null,
  });

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.type === "success") {
        setFormData((prev) => ({ ...prev, cv: result }));
      }
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Volunteer Application</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={formData.fullName}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, fullName: text }))
          }
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={formData.age}
          keyboardType="numeric"
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, age: text }))
          }
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Gender</Text>
        <Picker
          selectedValue={formData.gender}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, gender: value }))
          }
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Upload CV (PDF)</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
          <Text style={styles.uploadButtonText}>
            {formData.cv ? "Change CV" : "Select CV"}
          </Text>
        </TouchableOpacity>
        {formData.cv && <Text style={styles.fileName}>{formData.cv.name}</Text>}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Application</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
  },
  uploadButton: {
    backgroundColor: "#e7e7e7",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#333",
  },
  fileName: {
    marginTop: 5,
    color: "#666",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default VolunteerForm;
