import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AllergyItem from './AllergyItem';

const AllergiesList = () => {
  const [allergies, setAllergies] = useState([
    { id: 1, label: 'Medical', icon: require('../../assets/image3.png') },
    { id: 2, label: 'Medical', icon: require('../../assets/image3.png') },
    { id: 3, label: 'Medical', icon: require('../../assets/image3.png') },
    { id: 4, label: 'Medical', icon: require('../../assets/image3.png') },
    { id: 5, label: 'Medical', icon: require('../../assets/image3.png') },
    { id: 6, label: 'Medical', icon: require('../../assets/image3.png') },
  ]);

  const addAllergy = () => {
    const newAllergy = {
      id: allergies.length + 1,
      label: 'Medical',
      icon: require('../../assets/image3.png'),
    };
    setAllergies([...allergies, newAllergy]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Allergies and reactions</Text>
      <View style={styles.allergyList}>
        {allergies.map((item) => (
          <AllergyItem
            key={item.id}
            label={item.label}
            iconSource={item.icon}
            onPress={() => console.log(`Pressed: ${item.label}`)}
          />
        ))}
        <AllergyItem
          label="+ Add Allergy"
          iconSource={require('../../assets/image3.png')} // Replace with your "add" icon
          onPress={addAllergy}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  allergyList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

export default AllergiesList;
