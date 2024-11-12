import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Queries from "../Screens/Admin/Queries";
import QueryDetail from "../Screens/Admin/QueryDetail";
import Report from "../Screens/Admin/Report";
import ReportDetail from "../Screens/Admin/ReportDetail";

const stack = createNativeStackNavigator();

export default function ReportScreenNavigation() {
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="report" component={Report} />
      <stack.Screen
        name="report-detail"
        component={ReportDetail}
        // options={({ route }) => ({ title: route.params.items })}
      />
    </stack.Navigator>
  );
}
