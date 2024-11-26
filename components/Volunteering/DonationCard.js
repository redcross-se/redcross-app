import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SharedButton from './SharedButtons';

const DonationCard = ({ text, onPress }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{text}</Text>
      <SharedButton
        text="Donate"
        buttonStyle={styles.donateButton}
        textStyle={styles.donateText}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
  },
  donateButton: {
    backgroundColor: '#FF4D4D',
  },
  donateText: {
    color: '#fff',
  },
});

export default DonationCard;
