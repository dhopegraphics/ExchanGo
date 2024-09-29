import { Text, View } from "react-native";
import OnboardingScreen from "./(auth)/index";
import MessageCenter from "./message/messageCenter";
import { Redirect } from "expo-router";

export default function Index() {
  return <OnboardingScreen />;
}
