import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProfileInfo = ({ name, dateOfBirth }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/Login.png')}
        style={styles.profileImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.dateOfBirth}>{dateOfBirth}</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.editButton}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateOfBirth: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    color: '#E30613',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProfileInfo;
