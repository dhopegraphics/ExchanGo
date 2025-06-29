import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useJoin } from "@/Context/CommunityJoinContext";
import { Query } from "react-native-appwrite";
import { useAppwrite } from "@/Context/useAppwrite";
import {
  usersDatabaseId,
  communityRulesCollectionId,
} from "@/constants/queryIdsExport";

const Rules = () => {
  const insets = useSafeAreaInsets();
  const { communityId, communityName } = useLocalSearchParams();
  const { joinCommunity } = useJoin();
  const { getDocuments } = useAppwrite();
  const [rules, setRules] = React.useState([]);
  const handleAgreeAndJoin = () => {
    joinCommunity(communityId);
    router.back();
  };
  const fetchCommunityRules = async (communityId) => {
    const res = await getDocuments(
      usersDatabaseId,
      communityRulesCollectionId,
      [Query.equal("communityId", communityId)]
    );
    return res.documents || [];
  };

  React.useEffect(() => {
    fetchCommunityRules(communityId).then(setRules);
  }, [communityId]);

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Join Community</Text>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 p-4">
        <Text className="text-lg font-JakartaBold mb-2">
          The community rules to join in {communityName}
        </Text>
        <Text className="text-sm font-JakartaMedium text-gray-600 mb-6">
          These are set and enforced by community admins and are in addition to
          our rules.
        </Text>

        <View className="bg-gray-100 p-4 border border-gray-200 rounded-lg mb-4">
          <Text className="text-xl font-semibold mb-2">Rules</Text>
          <Text className="text-sm font-JakartaSemiBold text-gray-700 mb-4">
            Community rules are enforced by Community leaders, and are in
            addition to our rules.
          </Text>

          <View className="space-y-4">
            {rules.map((r, i) => (
              <BulletPoint key={i} text={r.rule} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="p-4">
        <TouchableOpacity
          onPress={handleAgreeAndJoin}
          className="bg-orange-500 rounded-full py-3 items-center"
        >
          <Text className="text-white font-JakartaSemiBold text-lg">
            Agree & Join
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BulletPoint = ({ text }) => (
  <View className="flex-row">
    <Text className="text-gray-700 mr-2">•</Text>
    <Text className="text-sm font-JakartaMedium text-gray-700 flex-1">
      {text}
    </Text>
  </View>
);

export default Rules;
