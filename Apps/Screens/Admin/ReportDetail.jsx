import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

export default function ReportDetail() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const handleWarning = async () => {
    await addDoc(collection(db, "warnings"), {
      seller: params.item.product.userName,
      productName: params.item.product.productName,
      title: "Warning for admin",
    });
    console.log("Warning Sent");
  };

  return (
    <View className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
      <Text className="text-2xl font-bold mb-4">Report</Text>
      <Text className="text-lg mb-2">Title: {params.item.title}</Text>
      <Image source={{ uri: params?.item?.product?.imageURL }} />
      <Text className="text-lg mb-2">
        Description: {params.item.description}
      </Text>
      <Text className="text-lg mb-2">
        Category: {params.item.product.category}
      </Text>
      <Text className="text-lg mb-2">
        Product Name: {params.item.product.productName}
      </Text>
      <Text className="text-lg mb-2">
        Seller Name: {params.item.product.userName}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleWarning}>
        <Text style={styles.buttonText}>Send Warning</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate("report")}
      >
        <Text style={styles.buttonText}>Discard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  secondaryButton: {
    backgroundColor: "#2ecc71",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
