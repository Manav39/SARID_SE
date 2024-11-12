import React, { useState } from 'react'
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'
import { useAuth } from '../../context'
import { useNavigation } from '@react-navigation/native'

const UserQuery = () => {
  const navigation = useNavigation()
  const { email } = useAuth()
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async () => {
    await addDoc(collection(db, 'userquery'), {
      subject: subject,
      description: description,
      useremail: email,
    })
    navigation.navigate('home')
  }

  return (
    <View style={{ marginTop: 200, padding: 20, alignItems: 'center' }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 24,
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        Enter Your Query
      </Text>
      <TextInput
        placeholder="Subject"
        onChangeText={(text) => setSubject(text)}
        value={subject}
        style={{
          marginBottom: 20,
          paddingHorizontal: 15,
          paddingVertical: 10,
          width: '100%',
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
        }}
      />
      <TextInput
        placeholder="Description"
        onChangeText={(text) => setDescription(text)}
        value={description}
        multiline
        numberOfLines={4}
        style={{
          marginBottom: 20,
          paddingHorizontal: 15,
          paddingVertical: 10,
          width: '100%',
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
          textAlignVertical: 'top', // Align the text to the top in multiline mode
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#FC6736',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 5,
        }}
        onPress={handleSubmit}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

export default UserQuery
