import "../global.css";
import { Redirect } from "expo-router";
import "react-native-url-polyfill/auto";

export default function Index() {
  return <Redirect href="/(auth)" />;
}
