import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CancelButton = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>Cancel Request</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textDecorationLine: 'underline',
  },
});

export default CancelButton;
