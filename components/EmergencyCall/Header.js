import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const HeaderComponent = () => {
  const user = {
    name: 'Hello User!',
    location: 'Beirut, Lebanon.',
  };

  return (
    <View style={styles.header}>
      {/* Left Section: Profile Info */}
      <View style={styles.leftSection}>
        <Image
          source={require('../../assets/Login.png')} // Replace with your profile image
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.completeProfile}>Complete profile</Text>
        </View>
      </View>

      {/* Right Section: Location Info */}
      <View style={styles.rightSection}>
        <Text style={styles.currentLocation}>📍 Current location</Text>
        <Text style={styles.location}>{user.location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', // Arrange profile and location horizontally
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40, // Adjust size as needed
    height: 40,
    borderRadius: 20, // Make it circular
    marginRight: 10, // Space between image and text
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  completeProfile: {
    color: '#E30613',
    fontWeight: 'bold',
    fontSize: 14,
  },
  rightSection: {
    alignItems: 'flex-end', // Align text to the right
  },
  currentLocation: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});

export default HeaderComponent;
