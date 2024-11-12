import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install @expo/vector-icons

const QueryBox = ({ subject, useremail, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      className="flex flex-row"
    >
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>{subject}</Text>
      <Text style={{ fontSize: 15 }}>Queried By : {useremail} </Text>
      {/* <Ionicons name="chevron-forward" size={24} color="black" /> */}
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

export default QueryBox;
