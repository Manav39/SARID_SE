import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ReportBox from "./ReportBox";
import { db } from "../../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const Report = () => {
  const [reportDetails, setReportDetails] = useState([]);
  // Dummy data for requests (business names)
  const navigation = useNavigation();

  const handleReportPress = (businessName) => {
    // Handle press for a request (e.g., navigate to details screen)
    console.log("Pressed on request:", businessName);
  };

  const getReports = async () => {
    setReportDetails("");
    const q = query(collection(db, "reports"));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setReportDetails((reportDetails) => [...reportDetails, doc.data()]);
      console.log(doc.data());
    });
  };

  useEffect(() => {
    getReports();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reports</Text>
      <ScrollView style={styles.scrollContainer}>
        {reportDetails &&
          reportDetails.map((item) => (
            <ReportBox
              buyer={item.email}
              title={item.title}
              id={item.id}
              onPress={() => navigation.navigate("report-detail", { item })}
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

export default Report;
