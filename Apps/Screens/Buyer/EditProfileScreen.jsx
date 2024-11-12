import { View, Text, TextInput, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { useAuth } from '../../context'

export default function ProfileScreen() {
  const [username, setUsername] = useState('')
  const [businessName, setBusinessName] = useState('')
  const handleSubmit = async () => { 
    console.log("Buyer Registered")
  }

  return (
    <View style={{ padding: 20 }} className="mt-[100px]">
      <Text style={{ fontWeight: 'bold', fontSize: 26, marginLeft: '25%' }}>
        Edit Profile
      </Text>
      <Text style={{ fontSize: 20, marginBottom: 10, marginTop: 60 }}>
        Enter Old UserName
      </Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
          borderRadius: 10,
        }}
        placeholder="Name"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Enter Email</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
          borderRadius: 10,
        }}
        placeholder="Email"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Text style={{ fontSize: 20, marginBottom: 10, }}>
        Enter New UserName
      </Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
          borderRadius: 10,
        }}
        placeholder="Name"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#FC6736',
          // paddingHorizontal: 20,
          // paddingVertical: 10,
          marginTop: 25,
          padding: 15,
          borderRadius: 25,
          width: '50%',
          // height:200,
          marginLeft: '25%',
          alignItems: 'center',
        }}
        onPress={handleSubmit}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  )
}
