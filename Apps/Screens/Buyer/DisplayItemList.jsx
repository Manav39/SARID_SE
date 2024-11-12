import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function DisplayItemList({ itemList }) {
  const handleProductPress = (product) => {
    navigation.navigate("ProductDetails", { product });
  };

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
      <FlatList
        data={itemList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleProductPress(item)}
          >
            <Image
              source={{ uri: item.imageURL }}
              style={styles.image}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.productName}>
                {item.productName}
              </Text>
              <Text style={styles.price}>
                {item.price}
              </Text>
              <Text style={styles.category}>
                {item.category}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      </View>
      
      <View style={ styles.container }>
        <Text>Recommended Products</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 3,
  },
  itemContainer: {
    flex: 1,
    margin: 2,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    objectFit: 'cover',
  },
  infoContainer: {
    padding: 10,
  },
  productName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 2,
    color: '#FC6736', // Orange color for product name
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FC6736', // Orange color for price
  },
  category: {
    color: '#FC6736', // Orange color for category
    backgroundColor: '#FFECB3', // Light orange background for category
    marginTop: 1,
    padding: 2,
    textAlign: 'center',
    borderRadius: 10,
    fontSize: 10,
    width: 70,
  },
});
