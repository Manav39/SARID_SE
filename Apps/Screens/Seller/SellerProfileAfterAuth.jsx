import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function SellerProfileAfterAuth() {
  const navigation = useNavigation();

  const handleDashboard = () => {
    // Redirect to Dashboard screen
    navigation.navigate('Dashboard');
  }

  const handleViewProducts = () => {
    // Redirect to View Products screen
    navigation.navigate('ViewProducts');
  }

  return (
    <View style={{ padding: 20 }} className="mt-[100px]" >
      <Text style={{ fontWeight: 'bold', fontSize: 26, marginLeft: '30%' }}>
        Your Profile
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#FC6736',
          marginTop: 25,
          padding: 15,
          borderRadius: 25,
          width: '50%',
          marginLeft: '25%',
          alignItems: 'center',
        }}
        onPress={handleDashboard}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#FC6736',
          marginTop: 25,
          padding: 15,
          borderRadius: 25,
          width: '50%',
          marginLeft: '25%',
          alignItems: 'center',
        }}
        onPress={handleViewProducts}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>View Your Products</Text>
      </TouchableOpacity>
    </View>
  );
}
