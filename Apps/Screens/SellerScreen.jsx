import { View, Text } from "react-native";
import React from "react";
import SellerNavigation from "../Navgations/SellerNavigation";
export default function SellerScreen() {
  return (
    <View className="flex-1">
      <SellerNavigation />
    </View>
  );
}
 

// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import SellerNavigation from "../Navgations/SellerNavigation";
// const SellerScreen= ({ navigation }) => {
//   // Dummy seller data
//   const sellerName = "John Doe";

//   return (
//     <View style={styles.container}>
//       {/* Greeting and Seller Name */}
//       <View style={styles.greetingContainer}>
//         <Text style={styles.greetingText}>Hello,</Text>
//         <Text style={styles.sellerName}>{sellerName}</Text>
//       </View>

//       {/* Options */}
//       <View style={styles.optionsContainer}>
//         {/* Seller Dashboard Option */}
//         <TouchableOpacity
//           style={styles.optionButton}
//           onPress={() => navigation.navigate('SellerDashboard')}
//         >
//           <Text style={styles.optionText}>Seller Dashboard</Text>
//         </TouchableOpacity>

//         {/* All Products Option */}
//         <TouchableOpacity
//           style={styles.optionButton}
//           onPress={() => navigation.navigate('AllProducts')}
//         >
//           <Text style={styles.optionText}>All Products</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   greetingContainer: {
//     marginBottom: 20,
//   },
//   greetingText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   sellerName: {
//     fontSize: 20,
//     color: "#333",
//   },
//   optionsContainer: {
//     width: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   optionButton: {
//     backgroundColor: "#f0f0f0",
//     width: 200,
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//     alignItems: "center",
//   },
//   optionText: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default SellerScreen;
