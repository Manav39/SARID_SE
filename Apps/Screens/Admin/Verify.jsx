import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import RequestBox from "./verificationBox"; // Import the RequestBox component
import { db } from "../../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

const Verify = () => {
  const navigation = useNavigation();
  // Dummy data for requests (business names)
  const [details, setDetails] = useState([]);
  const requests = [
    { id: 1, businessName: "Business 1" },
    { id: 2, businessName: "Business 2" },
    { id: 3, businessName: "Business 3" },
    { id: 4, businessName: "Business 4" },
    { id: 5, businessName: "Business 5" },
    { id: 6, businessName: "Business 6" },
  ];

  const getVerifyDetails = async () => {
    setDetails("");
    const q = query(collection(db, "verify"));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setDetails((details) => [...details, doc.data()]);
      console.log(doc.data());
    });
  };

  useEffect(() => {
    getVerifyDetails();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Requests</Text>
      <ScrollView style={styles.scrollContainer}>
        {details &&
          details?.map((item) => (
            <RequestBox
              businessName={item.businessName}
              seller={item.userName}
              url={item.imageUrl}
              onPress={() => navigation.navigate("verify-detail", { item })}
            />
          ))}
      </ScrollView>
    </View>
  );
};

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
  scrollContainer: {
    flex: 1,
  },
});

export default Verify;
