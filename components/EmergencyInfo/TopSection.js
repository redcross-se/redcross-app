import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const TopSection = ({ heading, subtext }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/EmergencyInfo.png')} // Replace with actual image
        style={styles.image}
      />
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.subtext}>{subtext}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
});

export default TopSection;
