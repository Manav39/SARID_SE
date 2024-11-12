// import React from 'react'
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// import { Ionicons } from '@expo/vector-icons' // Make sure to install @expo/vector-icons

// const ReportBox = ({ businessName, onPress }) => {
//   return (
//     <TouchableOpacity
//       style={styles.container}
//       onPress={onPress}
//       className="flex flex-row"
//     >
//       <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{businessName}</Text>
//       <Text style={{ fontSize: 15 }}>Reported By - ....buyer </Text>
//       {/* <Ionicons name="chevron-forward" size={24} color="black" /> */}
//     </TouchableOpacity>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'col',
//     alignItems: 'flex-start',
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
// })

// export default ReportBox

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install @expo/vector-icons

const ReportBox = ({ title, buyer, id, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      className="flex flex-row"
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ justifyContent: "center", marginTop: 12 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>{title}</Text>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={{ fontSize: 15, marginRight: 10 }}>
              Reported By : {id}{" "}
            </Text>
            <Text style={{ color: "grey" }}>1 min ago</Text>
          </View>
        </View>

        <View
          style={{
            marginLeft: 55,
            height: 25,
            width: 25,
            padding: 4,
            alignItems: "flex-end",
            borderRadius: 20,
            backgroundColor: "#007bff",
          }}
        >
          <Ionicons name="chevron-forward" size={18} color="#ffffff" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#007bff",
    flexDirection: "col",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    height: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  QueryName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ReportBox;
