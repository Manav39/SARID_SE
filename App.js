import SplashScreen from "./Apps/Screens/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Apps/Screens/LoginScreen";
import SignUpScreen from "./Apps/Screens/SignUpScreen";
import BuyerScreen from "./Apps/Screens/BuyerScreen";
import AdminScreen from "./Apps/Screens/AdminScreen";
import SellerScreen from "./Apps/Screens/SellerScreen";
import { AuthProvider } from "./Apps/context";
import SellerDashboard from "./Apps/Screens/Seller/SellerDashboard";
import SellerAllProducts from "./Apps/Screens/Seller/SellerAllProducts";
import { useEffect } from "react";
const stack = createNativeStackNavigator();
import { LogBox } from "react-native";

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(["Warning: ..."]);
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <stack.Screen name="Splash" component={SplashScreen} />
          <stack.Screen name="Login" component={LoginScreen} />
          <stack.Screen name="SignUp" component={SignUpScreen} />
          <stack.Screen name="Buyer" component={BuyerScreen} />
          <stack.Screen name="Admin" component={AdminScreen} />
          <stack.Screen name="Seller" component={SellerScreen} />
          <stack.Screen name="Dashboard" component={SellerDashboard} />
          <stack.Screen name="ViewProducts" component={SellerAllProducts} />
        </stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
