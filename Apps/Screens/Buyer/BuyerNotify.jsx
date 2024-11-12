import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { useAuth } from "../../context";
import { Feather } from "@expo/vector-icons";

const BuyerNotify = () => {
  const { email } = useAuth();
  const [answers, setAnswers] = useState([]);
  const navigation = useNavigation();
  // Dummy data for statistics

  const getNotifications = async () => {
    setAnswers("");
    const q = query(
      collection(db, "adminanswers"),
      where("useremail", "==", email)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      setAnswers((answers) => [...answers, doc.data()]);
      console.log(doc.data());
    });
    console.log("World");
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <Text className="mt-10" style={styles.heading}>
        Notifications
      </Text>
      {/* <View style={styles.statsContainer}>
      {statsData.map((item, index) => (
        <View style={styles.statBox} key={index}>
          <Text style={styles.statLabel}>{item.label}</Text>
          <Text style={styles.statValue}>{item.value}</Text>
        </View>
      ))}
    </View> */}

      {answers &&
        answers.map((item) => (
          <View style={[styles.statBox, { width: "90%", alignSelf: "center" }]}>
            <TouchableOpacity
              style={[styles.statValue, { alignSelf: "center" }]}
              onPress={() => navigation.navigate("answer", { item })}
            >
              {/* <Feather name="check-circle" size={30} color="green" /> */}
              <View className="flex flex-row gap-1">
                <Feather name="check-circle" size={30} color="green" />
                <Text className="text-[16px] mt-[20px]">
                  Your Query has been Answered by Admin
                </Text>
              </View>
              <Text style={styles.statLabel} className="text-center">
                Question : {item.subject}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

      <View style={[styles.statBox, { width: "90%", alignSelf: "center" }]}>
        <TouchableOpacity
          style={[styles.statValue, { alignSelf: "center" }]}
          onPress={() => navigation.navigate("query")}
        >
          <Text style={styles.statLabel}>Have any queries</Text>
        </TouchableOpacity>
      </View>
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

export default BuyerNotify;
