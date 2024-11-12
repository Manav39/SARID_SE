import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context";
import * as ImagePicker from 'expo-image-picker';

const AddProduct = () => {
  const { email, userName } = useAuth();
  const [productName, setProductName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddProduct = async () => {
    try {
      await addDoc(collection(db, "products"), {
        productName: productName,
        quantity: quantity,
        imageURL: imageURL,
        category: category,
        ingredients: ingredients,
        email: email,
        userName: userName,
        price: price,
      });

      setSuccessMessage("Product added successfully!");
      clearForm();
    } catch (error) {
      console.error("Error adding product to Firestore: ", error);
    }
  };
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const clearForm = () => {
    setProductName("");
    setQuantity("");
    setImageURL("");
    setDescription("");
    setCategory("");
    setPrice("");
    setImage(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Create a new Product</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name of Product</Text>
          <TextInput
            style={styles.input}
            value={productName}
            borderColor='#FC6736'
            onChangeText={setProductName}
            placeholder="Enter product name"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#FC6736", borderRadius: 8 }]}
          onPress={pickImage}
        >
          <Text style={{ color: "#ffffff", textAlign: "center" }}>Add Images of the Product</Text>
        </TouchableOpacity>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 150, borderRadius: 10, marginVertical: 10 }} />
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <TextInput
            style={styles.input}
            value={category}
            borderColor='#FC6736'
            onChangeText={setCategory}
            placeholder="Enter category"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ingredients of Product</Text>
          <TextInput
            style={[styles.input, { height: 60 }]}
            value={ingredients}
            borderColor='#FC6736'
            onChangeText={setIngredients}
            placeholder="Enter product ingredients"
            multiline
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description of Product</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={description}
            borderColor='#FC6736'
            onChangeText={setDescription}
            placeholder="Enter product description"
            multiline
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            borderColor='#FC6736'
            placeholder="Enter price"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            borderColor='#FC6736'
            onChangeText={setQuantity}
            placeholder="Enter quantity"
            keyboardType="numeric"
          />
        </View>

        <Button title="Add Product" color='#FC6736' onPress={handleAddProduct} />

        {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    marginTop:30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
    padding: 15,
    marginBottom: 10,
  },
  successMessage: {
    color: 'green',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default AddProduct;
