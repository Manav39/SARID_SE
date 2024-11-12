import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
  ToastAndroid,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function QueryDetail() {
  const { params } = useRoute();
  const [response, setResponse] = useState("");
  const email = params.item.useremail;
  const subject = params.item.subject;
  const text = params.item.description;

  const handleSend = async () => {
    try {
      await addDoc(collection(db, "adminanswers"), {
        subject: params.item.subject,
        description: params.item.description,
        useremail: params.item.useremail,
        adminreply: response,
      });

      Linking.openURL(
        `mailto:${email}?subject=${subject.replace(
          " ",
          "+"
        )}&body=${text.replace(" ", "+")}`
      );

      if (Platform.OS === "android") {
        ToastAndroid.show("Message sent successfully", ToastAndroid.SHORT);
      } else {
        Alert.alert("Success", "Message sent successfully");
      }
      console.log("Query answered successfully");
    } catch (error) {
      console.error("Error while answering query: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subject}>Subject - {params.item.subject}</Text>
      <Text style={styles.description}>
        Description - {params.item.description}
      </Text>
      <Text style={styles.user}>Queried by: {params.item.useremail}</Text>
      <TextInput
        style={styles.responseInput}
        placeholder="Write your response here..."
        multiline
        numberOfLines={4}
        value={response}
        onChangeText={setResponse}
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subject: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  user: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
  responseInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    minHeight: 100,
  },
  sendButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
