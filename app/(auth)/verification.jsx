import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleVerify = () => {
    const completeOtp = otp.join("");
    // Implement verification logic here
    console.log("Verifying OTP:", completeOtp);
  };

  const handleResendCode = () => {
    // Implement resend code logic here
    console.log("Resending code");
    setTimer(30);
  };

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white p-4 justify-center">
        <Text className="text-2xl font-bold mb-4 text-center">
          OTP Verification
        </Text>
        <Text className="text-gray-600 mb-6 text-center">
          Enter the verification code we sent to your email
        </Text>

        <View className="flex-row justify-center mb-6 p-4">
          <OtpInput
            numberOfDigits={4}
            type="numeric"
            onTextChange={(text) => handleChange(text)}
            theme={{
              pinCodeContainerStyle: {
                width: 58,
                height: 58,
                borderRadius: 15,
              },
            }}
          />
        </View>

        <TouchableOpacity
          className="bg-black rounded-md p-4 mb-6"
          onPress={handleVerify}
        >
          <Text className="text-white text-center font-semibold">Verify</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center items-center">
          <TouchableOpacity onPress={handleResendCode} disabled={timer > 0}>
            <Text
              className={`${
                timer > 0 ? "text-gray-400" : "text-black"
              } font-semibold`}
            >
              Send Code Again
            </Text>
          </TouchableOpacity>
          {timer > 0 && (
            <Text className="ml-2 text-gray-600">
              {timer.toString().padStart(2, "0")}:{timer > 0 ? "00" : "00"}
            </Text>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OTPVerification;
