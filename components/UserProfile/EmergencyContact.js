import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

const EmergencyContacts = ({ contacts, isEditing, setUserDetails }) => {
  const [newContact, setNewContact] = useState({ name: "", phone: "" });

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      const updatedContacts = [...contacts, newContact];
      setUserDetails(updatedContacts);
      setNewContact({ name: "", phone: "" });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>
      {contacts.map((contact, index) => (
        <View key={index} style={styles.contactItem}>
          <Text style={styles.contactText}>
            {contact.name} - {contact.phone}
          </Text>
        </View>
      ))}
      {isEditing && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={newContact.name}
            onChangeText={(text) =>
              setNewContact({ ...newContact, name: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={newContact.phone}
            onChangeText={(text) =>
              setNewContact({ ...newContact, phone: text })
            }
          />
          <TouchableOpacity style={styles.addButton} onPress={addContact}>
            <Text style={styles.addButtonText}>+ Add Emergency Contact</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  contactItem: {
    marginVertical: 5,
  },
  contactText: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default EmergencyContacts;
