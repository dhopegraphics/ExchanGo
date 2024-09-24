import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import Swiper from "react-native-swiper";
import { useRouter } from "expo-router";
import { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import Svg, { Circle } from "react-native-svg";
import Feather from "@expo/vector-icons/Feather";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const Onboarding = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const swiperRef = useRef(null);
  const progress = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleGetStarted = () => {
    router.replace("/(auth)/Sign-in");
  };

  useEffect(() => {
    Animated.timing(progress, {
      toValue: (activeIndex + 1) / 3, // Assuming there are 3 slides
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [activeIndex]);

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  const circumference = 2 * Math.PI * 28; // 28 is the radius of the circle
  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <>
      <StatusBar style="dark" />
      <View
        className="flex-1 bg-white"
        style={{
          paddingTop: insets.top,
        }}
      >
        <View className="flex flex-col gap-2 justify-end items-end mr-4">
          <TouchableOpacity onPress={handleGetStarted}>
            <Text className=" text-[#f79c41] text-lg font-JakartaSemiBold">
              Skip
            </Text>
          </TouchableOpacity>
        </View>
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
              style={{
                width: 170,
                height: 170,
                marginBottom: 20,
              }}
            />
            <Text className="text-2xl font-JakartaSemiBold">
              Welcome to SkillSwap
            </Text>
            <Text className="text-base text-gray-600 font-JakartaSemiBold mb-5">
              Exchange Talents, Not Money
            </Text>

            <View className="self-stretch mb-10">
              <Text className="text-base text-gray-400 font-JakartaMedium mb-2">
                • Share your skills with others
              </Text>
              <Text className="text-base text-gray-400 font-JakartaMedium mb-2">
                • Learn new talents from experts
              </Text>
              <Text className="text-base text-gray-400 font-JakartaMedium mb-2">
                • Build a community of skilled individuals
              </Text>
            </View>
          </View>

          <View style={styles.slide}>
            <Icon name="list-alt" size={80} color="#0066FF" />

            <View className="flex flex-col gap-2 mt-10">
              <Text className="text-2xl font-JakartaSemiBold">
                Essential Features
              </Text>
              <Text className="text-base text-gray-400 font-JakartaMedium">
                Skill Swap offers a range of essential features to enhance your
                experience.
              </Text>
            </View>
          </View>

          <View style={styles.slide}>
            <Icon name="lock" size={80} color="#0066FF" />
            <Text className="text-2xl  font-JakartaSemiBold">
              Your Privacy Matters
            </Text>
            <Text className="text-base text-gray-400 font-JakartaMedium">
              We prioritize your safety and privacy with top-tier encryption and
              secure storage.
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
              <Text className="text-white text-base font-JakartaBold">
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </Swiper>
        <View className="flex absolute bottom-10 right-10 items-center justify-center">
          <Svg height="64" width="64" viewBox="0 0 64 64">
            <AnimatedCircle
              cx="32"
              cy="32"
              r="28"
              stroke="#f79c41"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="square"
              rotation="-90"
              origin="32, 32"
            />
          </Svg>
          <TouchableOpacity
            className="bg-[#131313] p-2 items-center justify-center w-12 h-12 rounded-full"
            style={{ position: "absolute" }}
          >
            <Feather name="arrow-right" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width,
    height,
    backgroundColor: "#fff",
    borderRadius: 15,
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
  pagination: {
    bottom: 20,
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
    height: 8,
    marginHorizontal: 4,
    backgroundColor: "#f79c41",
    borderRadius: 4,
    marginLeft: -260,
    marginBottom: 30,
  },
});

export default Onboarding;
