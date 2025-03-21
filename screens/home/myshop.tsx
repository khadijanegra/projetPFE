import React, { useCallback, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
const apiUrl = process.env.API_URL;

const Myshop = (props: any) => {
  const [shopsData, setShopsData] = useState<any[]>([]);

  const fetchUserData = useCallback(async () => {
    if (!props.route.params?.id) {
      console.error("User ID is missing");
      return;
    }

    try {
      const response = await axios.get(
        `${apiUrl}/shops/user/${props.route.params.id}`
      );
      setShopsData(response.data);
      console.log("Fetched shops:", response.data);
    } catch (error) {
      console.error("Error fetching user shops:", error);
    }
  }, [props.route.params?.id]);

  useFocusEffect(
    React.useCallback(() => {
      console.log("Fetching shops for User ID:", props.route.params?.id);
      fetchUserData();
    }, [fetchUserData])
  );

  return (
    <ScrollView>
      <View style={tw`p-4`}> 
        {shopsData.map((shop) => (
          <TouchableOpacity
            key={shop._id}
            style={tw`mb-4 bg-white rounded-2xl shadow-xl overflow-hidden`}
          >
            <Image
              source={{ uri: `${apiUrl}/fetchshopImages/${shop.shopImage}` }}
              style={tw`w-full h-48`}
            />
            <View style={tw`p-4`}> 
              <Text style={tw`text-xl font-bold text-gray-800 mb-1`}>
                {shop.shop_nom}
              </Text>
              <View style={tw`flex-row items-center mb-2`}>
                <Icon name="map-marker" size={16} color="#f87171" />
                <Text style={tw`ml-1 text-gray-600`}>Kairouan</Text>
              </View>
              
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Myshop;
