import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { BlurView } from "expo-blur";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../constants";
import { useThemeColor } from "@/hooks/useThemeColor";

const ATouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export type Props = {
  onShouldSend: (message: string) => void;
};

const MessageInput = ({ onShouldSend }: Props) => {
  const [message, setMessage] = useState("");
  const { bottom } = useSafeAreaInsets();
  const expanded = useSharedValue(0);
  const inputRef = useRef<TextInput>(null);
  const hasMessage = message.trim().length > 0;
  const TextInputBg = useThemeColor({}, "inputKeyboard");

  const handleCameraPress = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Camera access is required to take photos."
      );
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) {
        // Handle the selected image
        console.log(result.assets[0]);
        // You might want to send this image or do something else with it
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      Alert.alert("Error", "Failed to access the camera. Please try again.");
    }
  };

  const expandItems = () => {
    expanded.value = withTiming(1, { duration: 400 });
  };

  const collapseItems = () => {
    expanded.value = withTiming(0, { duration: 400 });
  };

  const expandButtonStyle = useAnimatedStyle(() => {
    const opacityInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [1, 0],
      Extrapolation.CLAMP
    );
    const widthInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [30, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity: opacityInterpolation,
      width: widthInterpolation,
    };
  });

  const buttonViewStyle = useAnimatedStyle(() => {
    const widthInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [0, 100],
      Extrapolation.CLAMP
    );
    return {
      width: widthInterpolation,
      opacity: expanded.value,
    };
  });

  const onChangeText = (text: string) => {
    collapseItems();
    setMessage(text);
  };

  const onSend = () => {
    onShouldSend(message);
    setMessage("");
  };

  const onSelectCard = (text: string) => {
    onShouldSend(text);
  };

  return (
    <View
      style={{
        paddingBottom: bottom,
        paddingTop: 10,
        backgroundColor: TextInputBg,
      }}
    >
      <View style={styles.row}>
        <ATouchableOpacity
          onPress={expandItems}
          style={[styles.roundBtn, expandButtonStyle]}
        >
          <Ionicons name="add" size={24} color={COLORS.white} />
        </ATouchableOpacity>

        <Animated.View style={[styles.buttonView, buttonViewStyle]}>
          <TouchableOpacity onPress={handleCameraPress}>
            <Ionicons name="camera-outline" size={24} color={COLORS.gray} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => ImagePicker.launchImageLibraryAsync()}
          >
            <Ionicons name="image-outline" size={24} color={COLORS.gray} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => DocumentPicker.getDocumentAsync()}>
            <Ionicons name="folder-outline" size={24} color={COLORS.gray} />
          </TouchableOpacity>
        </Animated.View>

        <TextInput
          ref={inputRef}
          placeholder="Type your message here..."
          style={styles.messageInput}
          placeholderTextColor={"white"}
          onFocus={collapseItems}
          onChangeText={onChangeText}
          value={message}
          multiline
        />
        {hasMessage ? (
          <TouchableOpacity onPress={onSend}>
            <Ionicons name="arrow-up-circle" size={24} color={COLORS.gray} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <FontAwesome5 name="headphones" size={24} color={COLORS.gray} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  messageInput: {
    flex: 1,
    marginHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    padding: 10,
    color: COLORS.white,
    borderColor: COLORS.lightGray,
    backgroundColor: COLORS.primary,
  },
  roundBtn: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
export default MessageInput;
