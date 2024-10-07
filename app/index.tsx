import { Text, View } from "react-native";
import OnboardingScreen from "./(auth)/index";
import { Redirect } from "expo-router";
import CategoriesExpand from "./expandAll/categoriesExpand";

export default function Index() {
  return <CategoriesExpand />;
}
