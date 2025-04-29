import { Text, View } from "react-native";
import OnboardingScreen from "./(auth)/index";
import { Redirect } from "expo-router";
import CategoriesExpand from "./expandAll/categoriesExpand";
import "../global.css"

export default function Index() {
  return <OnboardingScreen />;
}
