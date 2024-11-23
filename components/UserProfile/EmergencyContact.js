import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ContactItem from './ContactItem';

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Mom', phone: '+961 03 425 582' },
    { id: 2, name: 'Dad', phone: '+961 03 425 583' },
  ]);

  const addContact = () => {
    const newContact = {
      id: contacts.length + 1,
      name: 'New Contact',
      phone: '+961 03 123 456',
    };
    setContacts([...contacts, newContact]);
  };

  const editContact = (id) => {
    console.log(`Edit contact with id: ${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          name={contact.name}
          phone={contact.phone}
          onEdit={() => editContact(contact.id)}
        />
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addContact}>
        <Text style={styles.addButtonText}>+ Add Emergency Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  addButton: {
    marginTop: 10,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  addButtonText: {
    fontSize: 16,
    color: '#666',
  },
});

export default EmergencyContacts;
