import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const EmergencyCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Emergency?</Text>
      <Text style={styles.cardSubtitle}>
        Hold the SOS button to connect with a responder.
      </Text>
      <View style={styles.sosButtonWrapper}>
        {/* Background layer */}
        <View style={styles.sosBackgroundLayer}>
          <View style={styles.sosButtonBackground}>
            <TouchableOpacity style={styles.sosButton}>
              {/* SOS Icon */}
              <Image 
                source={require('../../assets/EmergencyButtonIcon.png')} // Replace this path with your icon path
                style={styles.iconPlaceholder} 
              />
                            <Text style={styles.sosText}>Hold for</Text>
                            <Text style={styles.sosText}>3 seconds</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15, // Larger card border radius
    padding: 30, // Increased padding for larger card
    marginBottom: 30, // More spacing below the card
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
    alignItems: 'center',
    height: 400, // Larger height for the card
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  cardTitle: {
    fontSize: 28, // Increased font size
    fontWeight: 'bold',
    color: '#E30613',
    marginBottom: 15,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 18, // Increased font size
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
  },
  sosButtonWrapper: {
    alignItems: 'center',
  },
  sosBackgroundLayer: {
    width: 240, // Larger background layer width
    height: 240, // Larger background layer height
    borderRadius: 30, // Proportionally increased border radius
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
  },
  sosButtonBackground: {
    width: 200, // Larger white circular background
    height: 200,
    borderRadius: 100, // Fully circular
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosButton: {
    width: 140, // Larger red button
    height: 140,
    borderRadius: 70,
    backgroundColor: '#E30613',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 50, // Larger placeholder icon size
    height: 50,
    marginBottom: 10, // Space between icon and text
  },
  sosText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default EmergencyCard;
