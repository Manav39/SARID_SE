import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal, TextInput, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SellerAllProducts = ({ navigation }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    id: null,
    name: '',
    image: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
  });

  const handlePlusClick = () => {
    navigation.navigate('AddProduct');
  };

  const handleDelete = (productId) => {
    // Implement delete logic here
    console.log('Delete product with ID:', productId);
  };

  const handleEdit = (product) => {
    setEditedProduct(product);
    setEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    // Implement save edit logic here
    console.log('Save edited product:', editedProduct);
    setEditModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>All Products</Text>
        <TouchableOpacity onPress={handlePlusClick}>
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.productList}>
        {/* Sample product items */}
        <View style={styles.productItem}>
          <Image
            style={styles.productImage}
            source={{
              uri: 'https://th.bing.com/th/id/R.f179dd6df41656bb5e7c9c38309c8eb0?rik=dgCNLRCXjD1HtA&riu=http%3a%2f%2fwww.athayurdhamah.com%2fimg%2fLavang.jpg&ehk=7vIKCSc4Xb1Q5%2bWNijAVdtlWjlkhARtiP6T7hr9ONEA%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
            }}
            resizeMode="cover"
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>Lavang</Text>
            <Text style={styles.productDescription}>Good for health</Text>
            <Text style={styles.productPrice}>$140.50</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => handleDelete(1)} style={styles.iconButton}>
              <Icon name="trash" size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEdit({ id: 1, name: 'Lavang', price: '140.50' })} style={styles.iconButton}>
              <Icon name="pencil" size={24} color="blue" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Add more product items as needed */}
      </ScrollView>

      {/* Edit Product Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalView}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalHeaderText}>Edit Product</Text>
            <TextInput
              style={styles.input}
              placeholder="Product Name"
              onChangeText={(text) => setEditedProduct({ ...editedProduct, name: text })}
              value={editedProduct?.name}
            />
            <TextInput
              style={styles.input}
              placeholder="Image URL"
              onChangeText={(text) => setEditedProduct({ ...editedProduct, image: text })}
              value={editedProduct?.image}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              onChangeText={(text) => setEditedProduct({ ...editedProduct, description: text })}
              value={editedProduct?.description}
              multiline
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              onChangeText={(text) => setEditedProduct({ ...editedProduct, price: text })}
              value={editedProduct?.price}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Category"
              onChangeText={(text) => setEditedProduct({ ...editedProduct, category: text })}
              value={editedProduct?.category}
            />
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              onChangeText={(text) => setEditedProduct({ ...editedProduct, quantity: text })}
              value={editedProduct?.quantity}
              keyboardType="numeric"
              />
            
              <View style={styles.buttonContainer}>
                <Button title="Save Changes" onPress={handleSaveEdit} />
                <Button title="Cancel" onPress={() => setEditModalVisible(false)} />
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#f0f0f0',
    },
    headerText: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    addIcon: {
      fontSize: 30,
      color: 'blue',
    },
    productList: {
      flex: 1,
      padding: 10,
    },
    productItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
    },
    productImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 10,
    },
    productInfo: {
      flex: 1,
    },
    productName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    productDescription: {
      fontSize: 15,
      marginBottom: 5,
    },
    productPrice: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconButton: {
      marginLeft: 10,
    },
    modalView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 20,
      width: 350,
      height: 500,
      marginHorizontal: 20,
      maxHeight: '80%',
    },
    modalHeaderText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    },
  });
  
  export default SellerAllProducts;
  