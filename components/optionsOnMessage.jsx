import React, { useState, memo } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";
import { BlurView } from "expo-blur";

export const MessageOptions = ({ isVisible, onClose, options }) => {
  if (!isVisible) return null;

  return (
    <View className="absolute bottom-44 left-16 right-16 bg-zinc-800 rounded-2xl">
      {options.map((option, index) => (
        <TouchableOpacity key={index} onPress={option.onPress}>
          <View className="p-4  border-b border-zinc-700">
            <Text className="text-white font-JakartaSemiBold">
              {option.label}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Memoized Message component for optimal rendering
export const Message = memo(({ content, isUser, timestamp, onLongPress }) => {
  const [scaleAnim] = useState(new Animated.Value(1));

  const bubbleStyle = isUser
    ? "bg-emerald-800 self-end rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"
    : "bg-zinc-800 self-start rounded-tl-2xl rounded-tr-2xl rounded-br-2xl ";
  const textStyle = isUser ? "text-white" : "text-white";
  const timeStyle = isUser ? "text-emerald-300" : "text-zinc-400";

  const handleLongPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    onLongPress();
  };

  return (
    <TouchableWithoutFeedback onLongPress={handleLongPress}>
      <Animated.View
        className={`max-w-[80%]  p-3 ${bubbleStyle}`}
        style={{ transform: [{ scale: scaleAnim }] }}
      >
        <Text className={`${textStyle} font-JakartaBold`}>{content}</Text>
        <Text className={`font-JakartaSemiBold text-[10px] ${timeStyle} mt-1`}>
          {timestamp}
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
});
