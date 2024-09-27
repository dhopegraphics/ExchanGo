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
  TouchableWithoutFeedback,
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
import { useThemeColor } from "@/hooks/useThemeColor";

const { width, height } = Dimensions.get("window");

const Onboarding = () => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const swiperRef = useRef(null);
  const progress = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = 4; // Update this if you change the number of slides

  const handleGetStarted = () => {
    router.replace("/(auth)/signUp");
  };

  const handleNextSlide = () => {
    if (activeIndex < totalSlides - 1) {
      swiperRef.current.scrollBy(1);
    } else {
      router.replace("/(auth)/signUp");
    }
  };

  useEffect(() => {
    Animated.timing(progress, {
      toValue: (activeIndex + 1) / 4, // Assuming there are 3 slides
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
      <View
        className="flex-1"
        style={{
          paddingTop: insets.top,
          backgroundColor: backgroundColor,
        }}
      >
        <StatusBar style="auto" />
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
          paginationStyle={{
            bottom: 20,
            backgroundColor: backgroundColor,
          }}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
          onIndexChanged={(index) => setActiveIndex(index)}
        >
          <View style={[styles.slide, { backgroundColor: backgroundColor }]}>
            <Image
              source={require("../../assets/images/exchanGoLogoNoBg.png")}
              style={{
                width: 170,
                height: 170,
                marginBottom: 20,
                tintColor: textColor,
              }}
              resizeMode="contain"
            />
            <Text
              style={{ color: textColor }}
              className="text-2xl font-JakartaSemiBold"
            >
              Welcome to SkillSwap
            </Text>
            <Text className="text-base text-gray-600 font-JakartaSemiBold mb-5">
              Exchange Talents, Not Money
            </Text>

            <View className="self-stretch mb-10">
              <Text
                style={{ color: textColor }}
                className="text-base text-gray-400 font-JakartaMedium mb-2"
              >
                • Share your skills with others
              </Text>
              <Text
                style={{ color: textColor }}
                className="text-base text-gray-400 font-JakartaMedium mb-2"
              >
                • Learn new talents from experts
              </Text>
              <Text
                style={{ color: textColor }}
                className="text-base text-gray-400 font-JakartaMedium mb-2"
              >
                • Build a community of skilled individuals
              </Text>
            </View>
          </View>

          <View style={[styles.slide, { backgroundColor: backgroundColor }]}>
            <Image
              source={require("../../assets/images/exchanGoLogoNoBg.png")}
              style={{
                width: 200,
                height: 200,
                tintColor: textColor,
              }}
            />

            <View className="flex flex-col gap-2 mt-10">
              <Text
                style={{ color: textColor }}
                className="text-2xl font-JakartaSemiBold"
              >
                Teach & Learn Anytime, Anywhere
              </Text>
              <Text
                style={{ color: textColor }}
                className="text-base text-gray-400 font-JakartaMedium"
              >
                Discover a world of knowledge at your fingertips. Connect with
                others and start your journey today by learning and teaching.
              </Text>
            </View>
          </View>

          <View style={[styles.slide, { backgroundColor: backgroundColor }]}>
            <Image
              source={require("../../assets/images/exchanGoLogoNoBg.png")}
              resizeMode="contain"
              style={{
                width: 200,
                height: 200,
                tintColor: textColor,
              }}
            />

            <View className="flex flex-col gap-2 mt-10">
              <Text
                style={{ color: textColor }}
                className="text-2xl font-JakartaSemiBold"
              >
                Ready To Dive In ?
              </Text>
              <Text
                style={{ color: textColor }}
                className="text-base text-gray-400 font-JakartaMedium"
              >
                Skill Swap offers a range of essential features to enhance your
                experience.
              </Text>
            </View>
          </View>

          <View style={[styles.slide, { backgroundColor: backgroundColor }]}>
            <Image
              source={require("../../assets/images/exchanGoLogoNoBg.png")}
              resizeMode="contain"
              style={{
                width: 200,
                height: 200,
                tintColor: textColor,
              }}
            />

            <Text
              style={{ color: textColor }}
              className="text-2xl mr-12  font-JakartaSemiBold"
            >
              Skill and Service Trading Platform
            </Text>
            <Text
              style={{ color: textColor }}
              className="text-base text-gray-400 font-JakartaMedium"
            >
              Users exchange talents and skills instead of money
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
              <Text className="text-white text-base font-JakartaBold">
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </Swiper>
        <View className="flex absolute bottom-16 right-10 items-center justify-center">
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
            onPress={handleNextSlide}
            activeOpacity={0.8}
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
    borderRadius: 15,
  },
  button: {
    backgroundColor: "#f79c41",
    padding: 15,
    borderRadius: 30,
    marginTop: 40,
    width: "80%",
    alignItems: "center",
    shadowColor: "#f79c41",
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
