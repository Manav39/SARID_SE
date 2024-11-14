import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FirebaseAuth } from '../firebase'
import { db } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, addDoc, collection } from 'firebase/firestore'
import { Picker } from '@react-native-picker/picker'

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Buyer");

  const handleSignUp = async () => {
    // Username validation
    if (!username.trim()) {
      alert("Username cannot be empty.");
      return;
    }
  
    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    // Password validation
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    if (!passwordRegex.test(password)) {
      alert("Password must contain at least one special character.");
      return;
    }
  
    // Implement sign-up logic
    await createUserWithEmailAndPassword(FirebaseAuth, email, password)
      .then((cred) => {
        console.log("Success");
      })
      .catch((err) => console.error(err));
  
    try {
      // Get a reference to the 'users' collection
      await addDoc(collection(db, "users"), {
        username: username,
        email: email,
        password: password,  // Store the password (Not recommended for production)
        role: role,
        isApproved: false,
      });
  
      console.log("User added to Firestore successfully!");
      alert("Signup Successful!, Please Login to continue...");
    } catch (error) {
      console.error("Error adding user to Firestore: ", error);
    }
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Role:", role);
    console.log("Password:", password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={{ marginLeft: 50 }}>
          <Image
            source={require("../../assets/images/signup.png")}
            style={styles.image}
          />
        </View>
        <Text style={styles.heading}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Picker
          selectedValue={role}
          onValueChange={setRole}
          style={styles.picker}
        >
          <Picker.Item label="Buyer" value="Buyer" />
          <Picker.Item label="Seller" value="Seller" />
          {/* <Picker.Item label="Admin" value="Admin" /> */}
        </Picker>
        <Button color="#FC6736" title="Sign Up" onPress={handleSignUp} />
        <Text style={styles.footerText}>
          Already a user?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Login")}
          >
            Log in
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  content: {
    width: "80%", // Adjust as needed
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  picker: {
    height: 50,
    marginBottom: 10,
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
