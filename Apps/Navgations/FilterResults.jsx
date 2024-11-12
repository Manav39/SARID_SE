import React, { useState, useEffect } from 'react';
import jsonData from '../../data.json'; // Assuming 'data.json' contains the product data
import { Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

// Given ingredients for similarity search
const givenIngredients = ["Raw Mango", "Mustard Seeds", "Fenugreek", "Chili Powder", "Salt", "Lime", "Garlic", "Mixed Vegetables", "Green Chilies", "Ginger", "Jaggery"];

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
    const vector1 = givenIngredients.map(ingredient => ingredients1.includes(ingredient) ? 1 : 0);
    const vector2 = givenIngredients.map(ingredient => ingredients2.includes(ingredient) ? 1 : 0);

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

function ProductList() {
    const { params } = useRoute();
    console.log("Hello",params.SelectedValues);
    const [sortedProductIds, setSortedProductIds] = useState([]);

    useEffect(() => {
        // Sort product IDs based on similarity value
        const sortedProductIds = jsonData.sort((a, b) => {
            const similarityA = calculateCosineSimilarity(givenIngredients, a.Ingredients);
            const similarityB = calculateCosineSimilarity(givenIngredients, b.Ingredients);
            return similarityB - similarityA;
        }).map(product => product.product_id);

        setSortedProductIds(sortedProductIds);
    }, []);
    console.log(sortedProductIds);
    return (
        <View>
            {/* Render sorted product IDs */}
            {sortedProductIds.map(productId => (
                <Text key={productId}>{productId}</Text>
            ))}
        </View>
    );
}

export default ProductList;