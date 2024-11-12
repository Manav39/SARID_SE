import { View, Text, StyleSheet, TouchableOpacity, Image, Button, ScrollView, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { getDocs, collection, query, where, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../context";
import { Feather } from '@expo/vector-icons';

export default function CartScreen() {
  const { email } = useAuth();
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const apiUrl = "upi://pay?pa=saridqureshi299-2@okicici&pn=Sarid&aid=uGICAgICN_bOcDQ";
  const upiOpener = () => {
    Linking.openURL(apiUrl);
   }

  const handlePayment = async () => {
   
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        body: JSON.stringify({ totalPrice }),
      });

      const { clientSecret } = await response.json();

      // Confirm payment using PaymentSheet
      const { error } = await confirmPayment({
        clientSecret,
      });

      if (error) {
        console.error(error);
      // Handle payment error
      } else {
        // Payment successful, clear cart and display success message
      }
    } catch (error) {
      // Handle other errors
    }
  };

  const calculateTotalPrice = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.productName.price * item.quantity;
    });
    return total;
  };

  useEffect(() => {
    getItems();
    const unsubscribe = onSnapshot(collection(db, "carts"), where("email", "==", email), (snapshot) => {
      const updatedItems = [];
      snapshot.forEach((doc) => {
        updatedItems.push(doc.data());
      });
      setItems(updatedItems);
      setTotalPrice(calculateTotalPrice(updatedItems)); // Update total price as well
    });
    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  const getItems = async () => {
    setItems("");
    const q = query(collection(db, "carts"), where("email", "==", email));
    const snap = await getDocs(q);
    let p = 0;
    snap.forEach((doc) => {
      p += doc.data().productName.price * doc.data().quantity;
      setItems((items) => [...items, doc.data()]);
    });
    setTotalPrice(p);
    // console.log(totalPrice);
  };
  return (
    <ScrollView className="mt-20">
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Text style={{ fontSize:35, alignSelf: "center", marginBottom: 30 }}>Cart </Text>
        <Feather style={{ marginTop:15 }} name="shopping-cart" size={24} color="black" />
      </View>
      {items &&
        items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={ styles.container }
            // onPress={() => handleProductPress(product)}
          >
            <View style={ styles.cart }>
              <View>
                <Image
                  source={{
                    uri: item.productName.imageURL,
                  }}
                  style={styles.image}
                  className="w-10 h-2"
                />
              </View>
              <View style={{ marginLeft: 40 }}>
                <Text style={{ fontSize: 24 }}>Name: {item.productName.productName}</Text>
                <Text style={{ fontSize: 18 }}>Qty: {item.quantity}</Text>
                <Text style={{ fontSize: 18 }}>Total Price:  ₹{item.productName.price * item.quantity}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View>
          <Text style={{ fontSize: 22, marginLeft: 30, marginBottom: 20}}>
            Total Price: <Text style={{ fontWeight:"bold" }}>₹{ totalPrice }</Text>
          </Text>
        </View>
        <View style={{ width: 150, alignItems: "center", justifyContent: "center", marginBottom: 30, marginLeft: 20 }}>
          <Button
            color="#FC6736"
            width="40"
            title="Proceed to Pay"
            onPress={upiOpener}
          />
        </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "col",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 25,
    shadowColor: "#FC6736",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: "#FC6736",
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
    marginBottom: 20,
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
  cart: {
    flexDirection: "row",
    // width: "100%",
    // height: 50,
    // marginVertical: 20,
    // paddingLeft: 20,
  },
});
