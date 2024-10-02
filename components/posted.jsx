import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { calculateTimeElapsed } from "../utils/postCreatedAt";

const CommunityPostCard = ({ post, comments, users, likes }) => {
  const user = users.find((user) => user.id === post.userId);
  const userProfileImage = user?.profileImage || "default_image_url"; // Fallback to a default image
  const userName = user?.name || "Unknown User"; // Fallback name if user is undefined
  const postComments = comments.filter((comment) => comment.postId === post.id); // Retrieve comments using post id
  // Filter likes based on the post id
  const postLikes = likes.filter((like) => like.postId === post.id);

  return (
    <View className="bg-gray-100 p-4 rounded-lg mb-4">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <Image
            source={{ uri: userProfileImage }}
            className="w-10 h-10 rounded-full mr-2"
          />
          <View>
            <Text className="font-semibold">{userName}</Text>
            <Text className="text-gray-500 text-xs">
              {calculateTimeElapsed(post.createdAt)}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Feather name="more-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {post.postImage && (
        <Image
          key={post.id}
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
        <Text className="text-gray-500 text-xs">{postLikes.length} likes</Text>
      </View>

      {postComments.length > 0 && (
        <View key={postComments.id} className="mt-2">
          <Text className="font-semibold mb-1">Comments</Text>
          {postComments.slice(0, 2).map((comment) => (
            <View key={comment.id} className="mb-1">
              {/* Ensure this matches your comment structure */}
              <Text className="text-xs">
                <Text className="font-semibold">
                  {users.find((user) => user.id === comment.userId)?.name ||
                    "Unknown User"}
                </Text>{" "}
                {comment.text}
              </Text>
            </View>
          ))}
          {postComments.length > 2 && (
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
