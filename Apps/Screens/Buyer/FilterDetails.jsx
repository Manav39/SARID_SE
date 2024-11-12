import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet,ScrollView, TextInput } from 'react-native';
import jsonData from '../../../data.json'; // Assuming 'data.json' contains the product data
import MultiSelect from "react-native-multiselect-view";


// Given ingredients for similarity search
const givenIngredients = [
  'Raw Mango',
  'Mustard Seeds',
  'Fenugreek',
  'Chili Powder',
  'Salt',
  'Lime',
  'Garlic',
  'Mixed Vegetables',
  'Green Chilies',
  'Ginger',
  'Jaggery',
];

// Function to calculate dot product of two vectors
function dotProduct(vector1, vector2) {
  return vector1.reduce((acc, val, index) => acc + val * vector2[index], 0);
}

// Function to calculate magnitude of a vector
function magnitude(vector) {
  return Math.sqrt(vector.reduce((acc, val) => acc + val * val, 0));
}

// Function to calculate cosine similarity
function calculateCosineSimilarity(ingredients1, ingredients2) {
  // Count occurrences of each ingredient in ingredients1 and ingredients2
  const vector1 = givenIngredients.map((ingredient) =>
    ingredients1.includes(ingredient) ? 1 : 0
  );
  const vector2 = givenIngredients.map((ingredient) =>
    ingredients2.includes(ingredient) ? 1 : 0
  );

  // Calculate dot product and magnitudes
  const dotProductValue = dotProduct(vector1, vector2);
  const magnitude1 = magnitude(vector1);
  const magnitude2 = magnitude(vector2);

  // Handle division by zero
  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0;
  }

  // Calculate cosine similarity
  const similarity = dotProductValue / (magnitude1 * magnitude2);
  return similarity;
}

const App = () => {
    const [searchQuery, setSearchQuery] = useState("");
  const [uniqueIngredients, setUniqueIngredients] = useState([
    "Cumin",
    "Coriander",
    "Cardamom",
    "Cinnamon",
    "Cloves",
    "Raw Mango",
    "Mustard Seeds",
    "Fenugreek",
    "Chili Powder",
    "Salt",
    "Potatoes",
    "Peas",
    "Spices",
    "Pastry Dough",
    "Ginger",
    "Black Pepper",
    "Lime",
    "Onions",
    "Chickpea Flour",
    "Oil",
    "Turmeric",
    "Mixed Vegetables",
    "Puffed Rice",
    "Sev",
    "Chutneys",
    "Tomatoes",
    "Bell Peppers",
    "Paneer",
    "Marinade",
    "Garlic",
    "Lemon",
    "Green Chilies",
    "Jaggery",
    "Puris",
    "Spiced Water",
    "Tamarind Chutney"
  ]);

  // Filter ingredients based on search query
  const filteredIngredients = uniqueIngredients.filter(ingredient =>
    ingredient.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [sortedProductIds, setSortedProductIds] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Sort product IDs based on similarity value
    const sortedIds = jsonData
      .sort((a, b) => {
        const similarityA = calculateCosineSimilarity(
          givenIngredients,
          a.Ingredients
        );
        const similarityB = calculateCosineSimilarity(
          givenIngredients,
          b.Ingredients
        );
        return similarityB - similarityA;
      })
      .map((product) => product.product_id);

    setSortedProductIds(sortedIds);
  }, []);

  useEffect(() => {
    // Filter data based on sorted product IDs
    const filteredData = jsonData.filter((product) =>
      sortedProductIds.includes(product.product_id)
    );
      setFilteredData(filteredData);
      console.log(filteredData);
  }, [sortedProductIds]);
    
  return (
    <ScrollView>
          {/* Render filtered product data */}
          <View style={styles.container}>
      <Text style={styles.heading}>Filtering based on Ingredients</Text>
      <TextInput
        style={styles.input}
        placeholder="Search Ingredients"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.ingredientsContainer}>
        {filteredIngredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>{ingredient}</Text>
        ))}
      </View>
    </View>
      {filteredData.map((product) => (
        <View style={styles.card}>
      <Image source={{ uri: product.Image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{product.UserName}</Text>
        <Text style={styles.category}>{product.Category}</Text>
        <Text style={styles.price}>Price: ${product.Price}</Text>
        {/* Render other product details as needed */}
      </View>
    </View>
      ))}
    </ScrollView>
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
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  ingredientsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  ingredient: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  content: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 16,
    color: '#888',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default App;


