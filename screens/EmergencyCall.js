import React from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderComponent from '../components/EmergencyCall/Header';
import EmergencyCard from '../components/EmergencyCall/EmergencyCard';
import ChatCard from '../components/EmergencyCall/ChatCard';
import BottomNavigation from '../components/EmergencyCall/Bottom';

const EmergencyPage = () => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <HeaderComponent />

      {/* Content Section */}
      <View style={styles.content}>
        <EmergencyCard />
        <View style={styles.chatContainer}>
          <ChatCard />
        </View>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F9F9F9',
  },
  content: {
    flex: 1, // Allow content to grow and fill available space
  },
  chatContainer: { // Add small space between EmergencyCard and ChatCard
    marginBottom: 20, // Ensure more space before BottomNavigation
  },
});

export default EmergencyPage;
