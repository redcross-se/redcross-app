import React from 'react';
import { View, StyleSheet } from 'react-native';
import CircleButton from './CircleButton';

const ThreeButtonGroup = () => {
  return (
    <View style={styles.buttonContainer}>
      {/* Video Button */}
      <CircleButton 
        iconSource={require('../../assets/Video.png')} 
        onPress={() => console.log('Video Button Pressed')} 
        size={70} 
        backgroundColor="#4A4A4A" 
        iconSize={35} 
      />

      {/* End Call Button */}
      <CircleButton 
        iconSource={require('../../assets/callHang.png')} 
        onPress={() => console.log('End Call Button Pressed')} 
        size={100} 
        backgroundColor="#FF0000" 
        iconSize={40} 
      />

      {/* Message Button */}
      <CircleButton 
        iconSource={require('../../assets/Message.png')} 
        onPress={() => console.log('Message Button Pressed')} 
        size={70} 
        backgroundColor="#4A4A4A" 
        iconSize={35} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default ThreeButtonGroup;
