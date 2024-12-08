// EmergencyContact.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ContactItem from "./ContactItem";
// import { Ionicons } from "@expo/vector-icons";

const EmergencyContacts = ({ contacts, onAddContact, onSaveContacts }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>
      {contacts.length > 0 ? (
        contacts.map((contact, index) => (
          <ContactItem
            key={index}
            name={contact.name}
            phone={contact.phone}
            onEdit={() => onSaveContacts(contacts)}
          />
        ))
      ) : (
        <TouchableOpacity style={styles.addRow} onPress={onAddContact}>
          {/* <Ionicons name="ios-add" size={20} color="#E30613" /> */}
          <Text style={styles.addText}>Add an emergency contact</Text>
        </TouchableOpacity>
      )}
      {contacts.length > 0 && (
        <TouchableOpacity style={styles.editRow} onPress={onAddContact}>
          {/* <Ionicons name="ios-pencil" size={20} color="#E30613" /> */}
          <Text style={styles.addText}>Add Contact</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFF",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  addRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderColor: "#E30613",
    borderWidth: 1,
    borderRadius: 5,
  },
  editRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderColor: "#E30613",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  addText: {
    color: "#E30613",
    marginLeft: 5,
    fontWeight: "bold",
  },
});

export default EmergencyContacts;
