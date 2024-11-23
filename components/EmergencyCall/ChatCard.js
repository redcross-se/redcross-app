import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ChatCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Not sure what to do?</Text>
      <Text style={styles.cardSubtitle}>
        Chat with a volunteer instead.
      </Text>
      <TouchableOpacity style={styles.chatButton}>
        <Text style={styles.chatText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    alignItems: 'center', // Center content horizontally
    marginHorizontal: 10, // Adjust for spacing around card
  },
  cardTitle: {
    fontSize: 24, // Bold text size
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 5, // Space between title and subtitle
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20, // Space between subtitle and button
  },
  chatButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12, // Increased border radius for smoother corners
    width: '100%', // Make the button take 80% of the card's width
    paddingVertical: 14, // Slightly increased vertical padding
    alignItems: 'center',
    justifyContent: 'center', // Center the text vertically
  },
  chatText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
});

export default ChatCard;
