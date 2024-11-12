import { View, Text } from "react-native";
import React from "react";
import AdminNavigation from "../Navgations/AdminNavigation";
import AdminProfile from "./Admin/AdminProfile";

export default function AdminScreen() {
  return (
    <View className="flex-1">
      <AdminProfile />
      <AdminNavigation />
    </View>
  );
}
