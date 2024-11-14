import { View, Text, StyleSheet, TouchableOpacity, Image, Button, ScrollView, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { addDoc, getDocs, collection, query, where, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../context";
import { Feather } from '@expo/vector-icons';


export default function CartScreen() {
  const { email } = useAuth();
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const clearCart = async () => {
    const q = query(collection(db, "carts"), where("email", "==", email));
    const snap = await getDocs(q);

    snap.forEach(async (docItem) => {
      await deleteDoc(doc(db, "carts", docItem.id));
    });

    setItems([]);
    setTotalPrice(0);
  };

  const saveOrder = async () => {
    try {
      const orderData = {
        email: email,
        items: items.map((item) => ({
          productName: item.productName.productName,
          quantity: item.quantity,
          price: item.productName.price,
        })),
        totalPrice: totalPrice,
      };
  
      await addDoc(collection(db, "orders"), orderData);
      console.log("Order saved successfully!");
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const apiUrl = "upi://pay?pa=saridqureshi299-2@okicici&pn=Sarid&aid=uGICAgICN_bOcDQ";
  const upiOpener = () => {
    Linking.openURL(apiUrl);
    setTimeout(async () => {
      await saveOrder();
      await clearCart();
      alert("Order Success!!!");
    }, 2000);
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

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      const itemRef = doc(db, "carts", itemId);
      await updateDoc(itemRef, {
        quantity: newQuantity
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const itemRef = doc(db, "carts", itemId);
      await deleteDoc(itemRef);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  useEffect(() => {
    getItems();
    const unsubscribe = onSnapshot(collection(db, "carts"), where("email", "==", email), (snapshot) => {
      const updatedItems = [];
      snapshot.forEach((doc) => {
        updatedItems.push({ id: doc.id, ...doc.data() });
      });
      setItems(updatedItems);
      setTotalPrice(calculateTotalPrice(updatedItems)); // Update total price as well
    });
    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, [email]);

  const getItems = async () => {
    setItems([]);
    const q = query(collection(db, "carts"), where("email", "==", email));
    const snap = await getDocs(q);
    let p = 0;
    snap.forEach((doc) => {
      p += doc.data().productName.price * doc.data().quantity;
      setItems((items) => [...items, { id: doc.id, ...doc.data() }]);
    });
    setTotalPrice(p);
  };

  return (
    <ScrollView className="mt-20">
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Text style={{ fontSize: 35, alignSelf: "center", marginBottom: 30 }}>Cart </Text>
        <Feather style={{ marginTop: 15 }} name="shopping-cart" size={24} color="black" />
      </View>
  
      {/* Check if the cart is empty */}
      {items.length === 0 ? (
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Text style={{ fontSize: 24, color: "#888" }}>Your cart is empty.</Text>
        </View>
      ) : (
        items.map((item, index) => (
          <View key={index} style={styles.container}>
            <View style={styles.cart}>
              <View>
                <Image
                  source={{ uri: item.productName.imageURL }}
                  style={styles.image}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 20 }}>
                <Text style={{ fontSize: 24 }}>Name: {item.productName.productName}</Text>
                <Text style={{ fontSize: 18 }}>Qty: {item.quantity}</Text>
                <Text style={{ fontSize: 18, marginBottom: 10 }}>
                  Total Price: ₹{item.productName.price * item.quantity}
                </Text>
                {/* Quantity Adjustment and Remove Buttons */}
                <View style={styles.actions}>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.actionText}>-</Text>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 18, marginHorizontal: 10 }}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.actionText}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
                    <Text style={styles.removeText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))
      )}
  
      {/* Total Price and Proceed to Pay Button */}
      {items.length > 0 && (
        <>
          <View>
            <Text style={{ fontSize: 22, marginLeft: 30, marginBottom: 20 }}>
              Total Price: <Text style={{ fontWeight: "bold" }}>₹{totalPrice}</Text>
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
        </>
      )}
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 20,
  },
  cart: {
    flexDirection: "row",
  },
  actions: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 20,
  },
  actionText: {
    fontSize: 16,
    color: "#FC6736",
    marginHorizontal: 10,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#FC6736",
    borderRadius: 5,
  },
  actionText: {
    fontSize: 20,
    color: "#FC6736",
  },
  removeButton: {
    marginLeft: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#FC6736",
    borderRadius: 5,
  },
  removeText: {
    color: "#FC6736",
    fontSize: 16,
  },
});
