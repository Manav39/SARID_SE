import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "../../context";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';

export default function Header() {
  const navigation = useNavigation();
  const { email, role, userName } = useAuth();
  return (
    <View>
      <View className="flex flex-row justify-between">
        <View className="py-8 flex flex-row items-center gap-4">
          <Image
            source={require("../../../assets/images/pic.png")}
            className="rounded-full w-12 h-12 mt-5"
          />
          <View className="text-[16px]">
            <Text>Welcome</Text>
            <Text className="text-[20px] font-bold">{userName}</Text>
          </View>
        </View>
        <TouchableOpacity
          className="pt-10"
          onPress={() => navigation.navigate("notify")}
        >
          <AntDesign name="mail" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="pb-3 px-5 flex flex-row gap-2 border-[1px] border-blue-300  rounded-full bg-blue-50">
        <Octicons name="search" size={24} color="gray" />
        <TextInput
          placeholder="Search For Products"
          className="ml-2 text-[18px]"
          onChangeText={(value) => console.log(value)}
        />
        <TouchableOpacity onPress={() =>navigation.navigate("filter")}>
           <FontAwesome5 name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
