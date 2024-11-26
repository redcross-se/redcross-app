import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SectionHeader = ({ title, onViewAllPress }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{title}</Text>
      {onViewAllPress && (
        <TouchableOpacity onPress={onViewAllPress}>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    fontSize: 14,
    color: 'black',
  },
});

export default SectionHeader;
