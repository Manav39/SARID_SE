import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import DisplayItemList from "./DisplayItemList";

export default function CategoryListItem() {
  const { params } = useRoute();
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    params && getItemListByCategory();
  }, []);

  const getItemListByCategory = async () => {
    setItemList([]);
    setItemList("");
    const q = await query(
      collection(db, "products"),
      where("category", "==", params.category)
    );
    const snap = await getDocs(q);
    snap.forEach((doc) => {
      setItemList((itemList) => [...itemList, doc.data()]);
      console.log(doc.data());
    });
  };
  return (
    <View className="mt-20">
      {itemList ? (
        <DisplayItemList itemList={itemList} />
      ) : (
        <Text>No {params.category} Found</Text>
      )}
    </View>
  );
}
