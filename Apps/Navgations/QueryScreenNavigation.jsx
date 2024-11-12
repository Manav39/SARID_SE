import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Queries from "../Screens/Admin/Queries";
import QueryDetail from "../Screens/Admin/QueryDetail";

const stack = createNativeStackNavigator();

export default function QueryScreenNavigation() {
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="queries" component={Queries} />
      <stack.Screen
        name="query-detail"
        component={QueryDetail}
        // options={({ route }) => ({ title: route.params.items })}
      />
    </stack.Navigator>
  );
}
