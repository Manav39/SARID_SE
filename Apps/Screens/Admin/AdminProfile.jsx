import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useAuth } from "../../context";
import { Octicons } from "@expo/vector-icons";

export default function AdminProfile() {
  const { email, role, userName } = useAuth();
  return (
    <View>
      <View style={{padding:10, marginTop: 20, marginLeft: 5}} className="py-8 flex flex-row items-center gap-4">
        <Image
          source={require("../../../assets/images/pic.png")}
          className="rounded-full w-12 h-12 mt-5"
        />
        <View className="text-[16px]">
          <Text>Welcome</Text>
          <Text className="text-[20px] font-bold">Admin</Text>
        </View>
      </View>
    </View>
  );
}


