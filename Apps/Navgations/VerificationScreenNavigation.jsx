import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Verify from "../Screens/Admin/Verify";
import VerifyDetail from "../Screens/Admin/VerifyDetail";

const stack = createNativeStackNavigator();

export default function VerificationScreenNavigation() {
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="verify" component={Verify} />
      <stack.Screen
        name="verify-detail"
        component={VerifyDetail}
        options={({ route }) => ({ title: route.params.items })}
      />
    </stack.Navigator>
  );
}
