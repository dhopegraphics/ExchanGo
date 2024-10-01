import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { useThemeColor } from "@/hooks/useThemeColor";
import { imageDataURL } from "../constants/ImageData";

const calculateTimeElapsed = (postDate, postTime) => {
  const now = new Date();
  const [day, month, year] = postDate.split("/").map(Number);
  const [time, period] = postTime.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  // Convert to 24-hour format
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  const postDateTime = new Date(year, month - 1, day, hours, minutes);
  const diffInSeconds = Math.floor((postDateTime - now) / 1000);

  if (diffInSeconds < 0) {
    // Past date
    return calculatePastTime(Math.abs(diffInSeconds));
  } else {
    // Future date
    return calculateFutureTime(diffInSeconds);
  }
};

const calculatePastTime = (diffInSeconds) => {
  if (diffInSeconds < 60)
    return `${diffInSeconds} sec${diffInSeconds !== 1 ? "s" : ""} ago`;
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} min${Math.floor(diffInSeconds / 60) !== 1 ? "s" : ""} ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hour${Math.floor(diffInSeconds / 3600) !== 1 ? "s" : ""} ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} day${Math.floor(diffInSeconds / 86400) !== 1 ? "s" : ""} ago`;
  if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 2592000)} month${Math.floor(diffInSeconds / 2592000) !== 1 ? "s" : ""} ago`;
  return `${Math.floor(diffInSeconds / 31536000)} year${Math.floor(diffInSeconds / 31536000) !== 1 ? "s" : ""} ago`;
};

const calculateFutureTime = (diffInSeconds) => {
  if (diffInSeconds < 60)
    return `in ${diffInSeconds} sec${diffInSeconds !== 1 ? "s" : ""}`;
  if (diffInSeconds < 3600)
    return `in ${Math.floor(diffInSeconds / 60)} min${Math.floor(diffInSeconds / 60) !== 1 ? "s" : ""}`;
  if (diffInSeconds < 86400)
    return `in ${Math.floor(diffInSeconds / 3600)} hour${Math.floor(diffInSeconds / 3600) !== 1 ? "s" : ""}`;
  if (diffInSeconds < 2592000)
    return `in ${Math.floor(diffInSeconds / 86400)} day${Math.floor(diffInSeconds / 86400) !== 1 ? "s" : ""}`;
  if (diffInSeconds < 31536000)
    return `in ${Math.floor(diffInSeconds / 2592000)} month${Math.floor(diffInSeconds / 2592000) !== 1 ? "s" : ""}`;
  return `in ${Math.floor(diffInSeconds / 31536000)} year${Math.floor(diffInSeconds / 31536000) !== 1 ? "s" : ""}`;
};

const CommunityPostCard = ({ post }) => {
  return (
    <View className="bg-gray-100 p-4 rounded-lg mb-4">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <Image
            source={{ uri: post.userProfileImage }}
            className="w-10 h-10 rounded-full mr-2"
          />
          <View>
            <Text className="font-semibold">{post.userName}</Text>
            <Text className="text-gray-500 text-xs">
              {calculateTimeElapsed(post.postDate, post.postTime)}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Feather name="more-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {post.postImage && (
        <Image
          source={{ uri: post.postImage }}
          className="w-full h-44 rounded-lg mb-2"
        />
      )}

      <Text className="text-gray-950 text-sm font-medium mb-2">
        {post.postText}
      </Text>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-4">
            <Feather name="heart" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="message-circle" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <Text className="text-gray-500 text-xs">{post.likes} likes</Text>
      </View>

      {post.comments.length > 0 && (
        <View className="mt-2">
          <Text className="font-semibold mb-1">Comments</Text>
          {post.comments.slice(0, 2).map((comment) => (
            <View key={comment.id} className="mb-1">
              <Text className="text-xs">
                <Text className="font-semibold">{comment.userName}</Text>{" "}
                {comment.text}
              </Text>
            </View>
          ))}
          {post.comments.length > 2 && (
            <TouchableOpacity>
              <Text className="text-gray-500 text-xs">View all comments</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default CommunityPostCard;
