import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const FirstAidInstructions = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>First Aid Instructions</Text>
      <View style={styles.instructionBlock}>
        <Text style={styles.subtitle}>Basic Steps:</Text>
        <Text style={styles.instruction}>1. Check the scene is safe</Text>
        <Text style={styles.instruction}>2. Check consciousness</Text>
        <Text style={styles.instruction}>3. Call for help if needed</Text>
        <Text style={styles.instruction}>4. Check breathing</Text>
        <Text style={styles.instruction}>5. Check for bleeding</Text>
      </View>
      {/* Add more instruction blocks as needed */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  instructionBlock: {
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  instruction: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default FirstAidInstructions;
