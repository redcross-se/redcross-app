import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SharedButton from './SharedButtons';

const VolunteerCard = ({ text, onPress }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{text}</Text>
      <SharedButton
        text="Apply"
        buttonStyle={styles.applyButton}
        textStyle={styles.applyText}
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
  applyButton: {
    width: 100,
    height: 40,
    backgroundColor: '#FF4D4D',
  },
  applyText: {
    color: '#fff',
  },
});

export default VolunteerCard;
