import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProfileInfo = ({ name, dateOfBirth }) => {
  return (
    <View style={styles.container}>
      {/* Edit Button */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>

      {/* Profile Image */}
      <Image
        source={require('../../assets/Login.png')} // Replace with actual image
        style={styles.profileImage}
      />

      {/* Name and Date of Birth */}
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.dateOfBirth}>{dateOfBirth}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    position: 'relative',
  },
  editButton: {
    position: 'absolute',
    top: 0,
    right: 20,
  },
  editText: {
    color: '#E30613',
    fontSize: 14,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  dateOfBirth: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default ProfileInfo;
