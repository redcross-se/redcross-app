import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const SharedForm = ({ isSignUp, onSubmit, navigation }) => { // Add navigation prop here
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/Login.png')} // Replace with your logo asset
        style={styles.image}
      />
      <Text style={styles.title}>{isSignUp ? 'Sign up' : 'Log in'}</Text>

      {isSignUp && (
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={form.fullName}
          onChangeText={(value) => handleInputChange('fullName', value)}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(value) => handleInputChange('email', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={form.password}
        onChangeText={(value) => handleInputChange('password', value)}
      />

      <TouchableOpacity style={styles.button} onPress={() => onSubmit(form)}>
        <Text style={styles.buttonText}>{isSignUp ? 'Sign up' : 'Log in'}</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleButtonText}>
          <Image
            style={styles.googleIcon}
          />{' '}
          Sign {isSignUp ? 'up' : 'in'} with Google
        </Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        {isSignUp
          ? 'Already have an account? '
          : "Don't have an account? "}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate(isSignUp ? 'Login' : 'SignUp')} // Use navigation prop
        >
          {isSignUp ? 'Log in instead' : 'Sign up'}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E30613', // Red color for the title
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#E30613',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#aaa',
    marginVertical: 15,
  },
  googleButton: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
  linkText: {
    color: '#E30613',
    fontWeight: 'bold',
  },
});

export default SharedForm;
