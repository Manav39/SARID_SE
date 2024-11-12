import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

export default function ViewQueryAnswer() {
  const { params } = useRoute();
  return (
    <View
      style={[styles.statBox, { width: "90%", alignSelf: "center" }]}
      className="mt-[100px]"
    >
      <TouchableOpacity
        style={[styles.statValue, { alignSelf: "center" }]}
        onPress={() => navigation.navigate("query")}
      >
        <Text style={styles.statLabel}>{params.item.subject}</Text>
        <Text style={styles.statLabel}>Admin Reply</Text>
        <Text>{params.item.adminreply}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statBox: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007bff",
  },
});
