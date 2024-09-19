import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const OnboardingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/exchanGoLogo.jpg")}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to SkillSwap</Text>
      <Text style={styles.subtitle}>Exchange talents, not money</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>• Share your skills with others</Text>
        <Text style={styles.infoText}>• Learn new talents from experts</Text>
        <Text style={styles.infoText}>
          • Build a community of skilled individuals
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("signUp")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("logIn")}>
        <Text style={styles.loginText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 170,
    height: 170,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: "#666",
  },
  infoContainer: {
    alignSelf: "stretch",
    marginBottom: 30,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#444",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    color: "#007AFF",
    fontSize: 16,
  },
});

export default OnboardingScreen;
