import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SharedButton from './SharedButtons';

const RequestCard = ({ hospitalName, bloodType, onPress }) => {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.hospitalName}>{hospitalName}</Text>
        <Text style={styles.bloodType}>Blood Type: {bloodType}</Text>
      </View>
      <SharedButton
        text="Urgent"
        buttonStyle={styles.urgentButton}
        textStyle={styles.urgentText}
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
  hospitalName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bloodType: {
    fontSize: 14,
    color: '#555',
  },
  urgentButton: {
    backgroundColor: '#FF4D4D',
  },
  urgentText: {
    color: '#fff',
  },
});

export default RequestCard;
