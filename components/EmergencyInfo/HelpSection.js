import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HelpSelection = ({ title, options }) => {
  const [activeIndex, setActiveIndex] = useState(null); // State to track the active option index

  const handleOptionPress = (index) => {
    setActiveIndex(index); // Set the active option index
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              activeIndex === index ? styles.activeOption : styles.inactiveOption,
            ]}
            onPress={() => handleOptionPress(index)} // Update active option on press
          >
            <Text
              style={[
                styles.optionText,
                activeIndex === index ? styles.activeOptionText : styles.inactiveOptionText,
              ]}
            >
              {option.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  option: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  activeOption: {
    backgroundColor: '#FF5A5F',
  },
  inactiveOption: {
    backgroundColor: '#F5F5F5',
  },
  activeOptionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  inactiveOptionText: {
    color: '#666',
  },
});

export default HelpSelection;
