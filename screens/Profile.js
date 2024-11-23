import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import HeaderComponent from '../components/EmergencyCall/Header';
import ProfileInfoComponent from '../components/UserProfile/ProfileInfo';
import DetailsGridComponent from '../components/UserProfile/DetailsGrid';

const Profile = () => {
  const userDetails = [
    { label: 'Age', value: '32 years' },
    { label: 'Blood type', value: 'A+' },
    { label: 'Height', value: '172 cm' },
    { label: 'Weight', value: '85 kg' },
  ];

  return (
    <ScrollView style={styles.container}>
      <HeaderComponent />
      <ProfileInfoComponent name="John Doe" dateOfBirth="16 November 1994" />
      <DetailsGridComponent details={userDetails} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default Profile;
