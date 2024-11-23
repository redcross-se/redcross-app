import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OnBoarding = () => {
  const navigation = useNavigation(); // Get navigation object

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <ImageBackground
          source={require('../assets/image3.png')}
          style={styles.background}
          imageStyle={styles.imageStyle}
        >
          {/* Leave ImageBackground without the text */}
        </ImageBackground>
        <Text style={styles.title}>Together For Humanity</Text> {/* Place text below the cross */}
      </View>
      <View style={styles.bottomView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Profile')} // Navigate to CallAction screen
        >
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    color: 'white',
    textAlign: 'center',
    position: 'absolute', // Position text absolutely
    bottom: 40, // Adjust this value to place the text below the cross
  },
  bottomView: {
    height: '30%',
    backgroundColor: 'black',
    alignItems: 'center',

  },
  button: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
});

export default OnBoarding;
