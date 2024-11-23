import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const CircleButton = ({ iconSource, onPress, size = 60, backgroundColor = '#FFFFFF', iconSize = 30 }) => {
  return (
    <TouchableOpacity
      style={[styles.circleButton, { width: size, height: size, backgroundColor, borderRadius: size / 2 }]}
      onPress={onPress}
    >
      <Image
        source={iconSource}
        style={{ width: iconSize, height: iconSize, resizeMode: 'contain' }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
});

export default CircleButton;
