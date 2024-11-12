import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BuyerNotify from "../Screens/Buyer/BuyerNotify";
import UserQuery from "../Screens/Buyer/UserQuery";
import ExploreScreen from "../Screens/Buyer/ExploreScreen";
import ProductDetails from "../ProductDetails";

const stack = createNativeStackNavigator();

export default function ExploreScreenNavigationScreen() {
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="explore" component={ExploreScreen} />
      <stack.Screen name="ProductDetails" component={ProductDetails} />
    </stack.Navigator>
  );
}
