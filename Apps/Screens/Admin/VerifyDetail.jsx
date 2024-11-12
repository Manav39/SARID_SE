import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function VerifyDetail() {
  const { params } = useRoute();

  const handleAccept = () => {
    // Handle accept logic
    console.log("Accepted:", params.item.userName);
  };

  const handleReject = () => {
    // Handle reject logic
    console.log("Rejected:", params.item.userName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.userCard}>
        <View style={styles.userInfo}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.info}>{params.item.userName}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>{params.item.email}</Text>

          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.info}>{params.item.phoneNumber}</Text>

          <Text style={styles.label}>Business Name:</Text>
          <Text style={styles.info}>{params.item.businessName}</Text>

          <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 10 }}>Verification Document:</Text>
          <Image
            source={{ uri: params.item.imageUrl }}
            style={styles.userImage}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleAccept}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={handleReject}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  userCard: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    elevation: 3,
  },
  userImage: {
    width: 200,
    height: 200,
  },
  userInfo: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "100%",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
  },
  rejectButton: {
    backgroundColor: "#F44336",
  },
});
