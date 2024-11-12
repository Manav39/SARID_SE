import React, { useState, useEffect } from "react";
import HomeScreen from "../Screens/Buyer/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CartScreen from "../Screens/Buyer/CartScreen";
import ProfileScreen from "../Screens/Seller/ProfileScreen";
import ExploreScreen from "../Screens/Buyer/ExploreScreen";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Text } from "react-native";
import AddProduct from "../Screens/Seller/AddProduct";
const Tab = createBottomTabNavigator();
import { useAuth } from "../context";
// import SellerDashboard  from "../Screens/Seller/SellerDashboard";
import SellerProfileAfterAuth from "../Screens/Seller/SellerProfileAfterAuth";

export default function SellerNavigation() {
  const [approved, setApproved] = useState(false);
  const [initialRoute, setInitialRoute] = useState("");
  const { isApproved } = useAuth();

  useEffect(() => {
    setApproved(isApproved);
  }, [])

  return (
    <Tab.Navigator 
    initialRouteName = {isApproved ? "home" : "profile"}
    screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="home"
        component={isApproved ? HomeScreen : ProfileScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: isApproved ? color : "grey", fontSize: 12, marginBottom: 3 }}>
              Home
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={isApproved ? color : "grey"} />
          ),
        }}
      />
      <Tab.Screen
        name="explore"
        component={isApproved ? ExploreScreen : ProfileScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: isApproved ? color : "grey", fontSize: 12, marginBottom: 3 }}>
              Explore
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={isApproved ? color : "grey"} />
          ),
        }}
      />
      <Tab.Screen
        name="addprod"
        component={isApproved ? AddProduct : ProfileScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: isApproved ? color : "grey", fontSize: 12, marginBottom: 3 }}>
              Add Product
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={isApproved ? color : "grey"} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={isApproved ? SellerProfileAfterAuth: ProfileScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: isApproved ? color : "blue", fontSize: 12, marginBottom: 3 }}>
              Profile
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-sharp" size={size} color={isApproved ? color : "blue"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
