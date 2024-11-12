import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../Components/HomeScreen/Header'
import Slider from '../../Components/HomeScreen/Slider'
import { db } from '../../firebase'
import { getDocs, collection } from 'firebase/firestore'
import Category from '../../Components/HomeScreen/Category'
import { AntDesign } from '@expo/vector-icons'
import StoryList from './Storylist'

export default function HomeScreen() {
  const [sliderList, setSliderList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  useEffect(() => {
    getSliders()
    getCategory()
  }, [])
  const getSliders = async () => {
    setSliderList('')
    const snap = await getDocs(collection(db, 'Sliders'))
    snap.forEach((doc) => {
      setSliderList((sliderList) => [...sliderList, doc.data()])
    })
  }

  const getCategory = async () => {
    setCategoryList('')
    const snap = await getDocs(collection(db, 'Category'))
    snap.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()])
    })
  }

  // const Stories = () => {
  //   return (
  //     <View>
  //       <View>
  //         <Image source={require('../../assests/logo.png')} />
  //         <AntDesign name="message1" size={24} color="black" />
  //       </View>
  //       <ScrollView>
  //         <View style={{ height: 1500, backgroundColor: 'pink' }} />
  //       </ScrollView>
  //     </View>
  //   )
  // }

  return (
    <View className=" px-6 bg-white flex-1">
      <View style={{ marginTop: 15 }}>
        <Header />
        <StoryList />
      </View>
      <Slider sliderList={sliderList} />
      <Category categoryList={categoryList} />
    </View>
  )
}
