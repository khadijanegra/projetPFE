import React, { useCallback, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const apiUrl = process.env.API_URL;

const Myshop= (props: any) => {
  const [shopsData, setShopsData] = useState<any[]>([]);

  const fetchUserData = useCallback(async () => {
    try {
      // Utilise l'URL correcte avec `/shops/shops/user/:user_id`
      const response = await axios.get(
        `${apiUrl}/shops/shops/user/${props.route.params.id}` // URL mise à jour
      );
      
      // Met à jour l'état avec les données des shops
      const userShops = response.data;
      setShopsData(userShops);
      console.log(JSON.stringify(userShops, null, 2));
    } catch (error) {
      console.error("Error fetching user shops:", error);
    }
  }, [props.route.params.id]);

  useFocusEffect(
    React.useCallback(() => {
      console.log("User ID: " + props.route.params.id);
      fetchUserData(); // Appelle la fonction pour récupérer les shops
    }, [fetchUserData])
  );

  return (
    <ScrollView>
      <View>
        {shopsData.map((shop, index) => (
          <View
            key={shop._id}
            style={tw`p-4 m-2 bg-white border border-gray-300 shadow-lg rounded-2xl`}
          >
            <Image
              source={{
                uri: `${apiUrl}/fetchshopImages/${shop.shopImage}`,
              }}
              style={tw`w-full h-40 rounded-xl mb-2`}
            />
            <View style={tw`flex-row items-center mb-1`}>
              <Text
                style={tw`px-2 py-1 text-xs font-bold text-white bg-red-300 rounded-full`}
              >
                {"Kairouan"}
              </Text>
            </View>

            <Text style={tw`mb-1 text-lg font-bold text-gray-800`}>
              {shop.shop_nom}
            </Text>
            <Text style={tw`mb-1 text-md text-gray-500`}>
              {shop.phone}
            </Text>

            <View style={tw`flex-row items-center  mt-2`}>
              <View style={tw`flex-row items-center`}>
                {[...Array(5)].map((_, j) => (
                  <Icon key={j} name="star" size={20} color="#FBBF24" />
                ))}
              </View>
              <Text style={tw`ml-4 text-lg font-bold text-red-300`}>4.9</Text>
            </View>

            <TouchableOpacity>
              <Text style={tw`text-2xl self-end `}>🩷</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Myshop;
