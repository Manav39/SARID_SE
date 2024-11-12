import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import QueryBox from "./QueryBox"; // Import the RequestBox component
import { db } from "../../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const Queries = () => {
  // Dummy data for requests (business names)
  const navigation = useNavigation();
  const [queryDetails, setQueryDetails] = useState([]);
  const queries = [
    { id: 1, QueryName: "QueryName 1" },
    { id: 2, QueryName: "QueryName 2" },
    { id: 3, QueryName: "QueryName 3" },
    { id: 4, QueryName: "QueryName 4" },
    { id: 5, QueryName: "QueryName 5" },
    { id: 6, QueryName: "QueryName 6" },
  ];

  const getQueryDetails = async () => {
    setQueryDetails("");
    const q = query(collection(db, "userquery"));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setQueryDetails((queryDetails) => [...queryDetails, doc.data()]);
      console.log(doc.data());
    });
  };

  useEffect(() => {
    getQueryDetails();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Queries</Text>
      <ScrollView style={styles.scrollContainer}>
        {queryDetails &&
          queryDetails.map((item) => (
            <QueryBox
              subject={item.subject}
              useremail={item.useremail}
              onPress={() => navigation.navigate("query-detail", { item })}
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
    backgroundColor: "#ffffff",
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

export default Queries;
