import React from "react";
import HomeScreen from "../Screens/Buyer/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CartScreen from "../Screens/Buyer/CartScreen";
import ProfileScreen from "../Screens/Buyer/ProfileScreen";
import ExploreScreen from "../Screens/Buyer/ExploreScreen";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Text } from "react-native";
import Dashboard from "../Screens/Admin/Dashboard";
import Verify from "../Screens/Admin/Verify";
import Queries from "../Screens/Admin/Queries";
import Report from "../Screens/Admin/Report";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import VerificationScreenNavigation from "./VerificationScreenNavigation";
import QueryScreenNavigation from "./QueryScreenNavigation";
import ReportScreenNavigation from "./ReportScreenNavigation";
const Tab = createBottomTabNavigator();

export default function AdminNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>
              Dashboard
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Entypo name="bar-graph" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="verify"
        component={VerificationScreenNavigation}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>
              Verification
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Octicons name="unverified" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="queries"
        component={QueryScreenNavigation}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>
              Queries
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="query-stats" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="report"
        component={ReportScreenNavigation}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>
              Reports
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="report" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
