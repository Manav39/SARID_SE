import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import React from "react";

export default function SplashScreen() {
  const navigation = useNavigation();
  return (
    <View>
      <Image
        source={require("../../assets/images/login.jpeg")}
        className="w-full h-[500px] object-cover"
      />
      <View className="p-8 items-center mt-[-20px] rounded-t-3xl shadown-md">
        <Text className="text-[40px] font-bold items-center text-center">
          Apna Kitchen
        </Text>
        <Text className="text-[18px] text-slate-500 mt-6">
          Ghar jaisa nahi, Ghar ka hi
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          className="w-[200px] p-4 bg-blue-500 mt-8"
          style={{ backgroundColor: "#FC6736", borderRadius: 20 }}
        >
          <Text className="text-white text-center text-[18px]">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
