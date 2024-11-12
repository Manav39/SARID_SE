import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import DisplayItemList from "./DisplayItemList";
import { AntDesign } from '@expo/vector-icons';

export default function ExploreScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    setProducts("");
    const snap = await getDocs(collection(db, "products"));
    snap.forEach((doc) => {
      setProducts((products) => [...products, doc.data()]);
    });
  };
  const handleProductPress = (product) => {
    navigation.navigate("ProductDetails", { product });
  };
  console.log("Hello ", products);
  return (
    // <View style={styles.container}>
    //   <Text style={styles.heading}>Explore </Text>
    //   {products &&
    //     products.map((product, index) => (
    //       <TouchableOpacity
    //         key={index}
    //         onPress={() => handleProductPress(product)}
    //       >
    //         <View style={styles.card}>
    //           <Image source={{ uri: product.imageURL }} style={styles.image} />
    //           <View style={styles.details}>
    //             <Text style={styles.productName}>{product.productName}</Text>
    //             <Text style={styles.price}>Price: ${product.price}</Text>
    //           </View>
    //         </View>
    //       </TouchableOpacity>
    //     ))}
    // </View>
    <View style={{ marginTop: 60 }}>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 24, alignSelf: "center", marginBottom: 20 }}>Trending Products</Text>
        <AntDesign name="star" size={24} color="black" style={{ marginLeft: 5, marginTop: 5 }}/>
      </View>
      <DisplayItemList itemList={products} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
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
    borderRadius: 8,
  },
  details: {
    flex: 1,
    padding: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: "#888",
  },
});
