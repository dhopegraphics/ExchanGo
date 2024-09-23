import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import Swiper from "react-native-swiper";
import { useRouter } from "expo-router";
import { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

const Onboarding = () => {
  const router = useRouter();
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleGetStarted = () => {
    router.replace("/(auth)/Sign-in");
  };

  return (
    <>
      <StatusBar style="dark" />
      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination={true}
        paginationStyle={styles.pagination}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        <View style={styles.slide}>
          <Image
            source={require("../../assets/images/exchanGoLogo.jpg")}
            style={styles.logo}
          />
          <Text style={styles.title}>Welcome to SkillSwap</Text>
          <Text style={styles.subtitle}>Exchange talents, not money</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>• Share your skills with others</Text>
            <Text style={styles.infoText}>
              • Learn new talents from experts
            </Text>
            <Text style={styles.infoText}>
              • Build a community of skilled individuals
            </Text>
          </View>
        </View>

        <View style={styles.slide}>
          <Icon name="list-alt" size={80} color="#0066FF" style={styles.icon} />
          <Text style={styles.title}>Essential Features</Text>
          <Text style={styles.subtitle}>
            SkillSwap offers a range of essential features to enhance your
            experience.
          </Text>
        </View>

        <View style={styles.slide}>
          <Icon name="lock" size={80} color="#0066FF" style={styles.icon} />
          <Text style={styles.title}>Your Privacy Matters</Text>
          <Text style={styles.message}>
            We prioritize your safety and privacy with top-tier encryption and
            secure storage.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width,
    height,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 8,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal: 15,
    fontWeight: "600",
  },
  FeatureMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    fontWeight: "700",
  },
  featureList: {
    marginTop: 20,
  },
  featureItem: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 10,
  },
  featureIcon: {
    marginRight: 15,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#0066FF",
    padding: 15,
    borderRadius: 30,
    marginTop: 40,
    width: "80%",
    alignItems: "center",
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  pagination: {
    bottom: 15,
  },
  dot: {
    width: 10,
    height: 10,
    marginHorizontal: 6,
    backgroundColor: "#E2E8F0",
    borderRadius: 10,
    marginBottom: 30,
  },
  activeDot: {
    width: 32,
    height: 6,
    marginHorizontal: 4,
    backgroundColor: "#0066FF",
    borderRadius: 4,
    marginLeft: -260,
    marginBottom: 30,
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
  logo: {
    width: 170,
    height: 170,
    marginBottom: 20,
  },
});

export default Onboarding;
