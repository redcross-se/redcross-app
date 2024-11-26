import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import RequestCard from '../components/Volunteering/RequestCard';


const Volunteer = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Requests Section */}
        <View style={styles.sectionSpacing}>
          <RequestCard
            hospitalName="X Hospital"
            bloodType="A+, A-"
            onPress={() => console.log('Urgent pressed')}
          />
          <RequestCard
            hospitalName="Y Hospital"
            bloodType="B+, B-"
            onPress={() => console.log('Urgent pressed')}
          />
        <RequestCard
            hospitalName="Y Hospital"
            bloodType="B+, B-"
            onPress={() => console.log('Urgent pressed')}
          />
        <RequestCard
            hospitalName="Y Hospital"
            bloodType="B+, B-"
            onPress={() => console.log('Urgent pressed')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  scrollContent: {
    padding: 16,
  },
  sectionSpacing: {
    marginTop: 24, 
  },
  bottomFixed: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Volunteer;
