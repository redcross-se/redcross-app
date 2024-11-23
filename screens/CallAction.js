import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopSection from '../components/EmergencyInfo/TopSection';
import ThreeButtonGroup from '../components/CallAction/ThreeButtonGroup';

const CallAction = () => {
  return (
    <View style={styles.container}>
      <TopSection heading="Connected" subtext="00:00" />
      <ThreeButtonGroup />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF5A5F',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 30,
  },
});

export default CallAction;
