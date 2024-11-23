import React from 'react';
import { View, StyleSheet } from 'react-native';
import DetailsRowComponent from './DetailsRow';

const DetailsGrid = ({ details }) => {
  return (
    <View style={styles.gridContainer}>
      {details.map((item, index) => (
        <DetailsRowComponent key={index} label={item.label} value={item.value} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});

export default DetailsGrid;
