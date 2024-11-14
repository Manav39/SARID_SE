import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const SellerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);

  // Fetch orders from Firestore
  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const ordersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Calculate total amount spent
      const total = ordersList.reduce((acc, order) => acc + parseFloat(order.totalPrice || 0), 0);

      setOrders(ordersList);
      setTotalSpent(total);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <View>
          {/* Display Total Amount Spent */}
          <Text style={styles.headingText}>Dashboard</Text>
          <Text style={styles.totalSpentText}>Total Amount Spent: Rs. {totalSpent.toFixed(2)}</Text>
        </View>

        {/* Orders Summary Section */}
        <View style={styles.overallInfo}>
          <View style={styles.innerContain}>
            <View style={styles.orders}>
              <Text>{orders.length}</Text>
              <Text>Orders</Text>
            </View>
            <View style={styles.gross}>
              <Text>Rs. {totalSpent.toFixed(2)}</Text>
              <Text>Gross</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Orders List Section */}
      <ScrollView style={styles.scrollView}>
        <Text style={styles.orderHeading}>All Orders</Text>

        {orders.length > 0 ? (
          orders.map((order) => (
            <View style={styles.orderItem} key={order.id}>
              {/* Buyer's Email */}
              <Text style={styles.emailText}>Buyer: {order.email}</Text>

              {/* List of Items in the Order */}
              {order.items?.map((item, index) => (
                <View key={index} style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.productName}</Text>
                  <Text>Price: Rs. {item.price}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                </View>
              ))}

              {/* Total Price of the Order */}
              <View style={styles.orderTotal}>
                <Text style={{ fontWeight: 'bold' }}>Total Price: Rs. {order.totalPrice}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>No Orders Found</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    paddingHorizontal: 50,
    color: 'white',
  },
  totalSpentText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    paddingHorizontal: 50,
  },
  container: {
    height: 200,
    backgroundColor: '#FC6736',
  },
  overallInfo: {
    marginTop: 5,
    backgroundColor: '#FC6736',
    padding: 25,
    flex: 1,
  },
  innerContain: {
    height: 85,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    gap: 30,
  },
  orders: {
    borderRightWidth: 1,
    borderColor: 'grey',
    paddingRight: 20,
  },
  gross: {
    textAlign: 'center',
    borderRightWidth: 1,
    borderColor: 'grey',
    paddingRight: 20,
    paddingLeft: 10,
  },
  scrollView: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    height: 600,
  },
  orderHeading: {
    color: 'black',
    fontSize: 24,
    paddingBottom: 5,
  },
  orderItem: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
  },
  emailText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  itemDetails: {
    marginVertical: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderTotal: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
});

export default SellerDashboard;
