import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type QuickActionsProps = {
  textColor: string;
  tintText: string;
};

const QuickActions = ({ textColor, tintText }: QuickActionsProps) => {
  const router = useRouter();

  return (
    <View className="px-4  mb-6">
      <View className="flex-row gap-4 space-x-3">
        <TouchableOpacity
          className="flex-1 p-3 rounded-2xl flex-row items-center"
          style={{ backgroundColor: "#FF6B6B20" }}
          onPress={() => router.push("/(main)/(tabs)/SwapCenter")}
        >
          <View
            className="w-10 h-10 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: "#FF6B6B" }}
          >
            <Ionicons name="swap-horizontal" size={20} color="white" />
          </View>
          <View className="flex-1">
            <Text style={{ color: textColor }} className="font-bold text-sm">
              Quick Swap
            </Text>
            <Text style={{ color: tintText }} className="text-xs">
              Find swappers nearby
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 p-4 rounded-2xl flex-row items-center"
          style={{ backgroundColor: "#4ECDC420" }}
          onPress={() => router.push("/(main)/(tabs)/Communities")}
        >
          <View
            className="w-10 h-10 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: "#4ECDC4" }}
          >
            <Ionicons name="people" size={20} color="white" />
          </View>
          <View className="flex-1">
            <Text style={{ color: textColor }} className="font-bold text-sm">
              Join Groups
            </Text>
            <Text style={{ color: tintText }} className="text-xs">
              Connect with communities
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuickActions;
