import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const AllergyItem = ({ label, iconSource, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconWrapper}>
        <Image source={iconSource} style={styles.icon} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EEE',
    margin: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    width: '30%',
  },
  iconWrapper: {
    backgroundColor: '#DFF4A8', // Light green background
    borderRadius: 15,
    padding: 5,
    marginRight: 5,
    
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
});

export default AllergyItem;
