import React, { useCallback, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
const apiUrl = process.env.API_URL;

const TaskCard = (props: any) => {
  const [shopsData, setShopsData] = useState<any[]>([]);

  const fetchUserData = useCallback(async () => {
    /** chne5dhou mil bil userid chne5shou mil user ken il favorite khw il favorite deha il 
     shop details puisque il favorite bil id_shop donc c'est logique et automatiquement chyo5rjou il favorites shop data */

    //puisque il favorissssss fehaa ken il shop id , donc mayo5rjou ken les data mte3 les shop adhoukom khw
    try {
      const response = await axios.get(
        `${apiUrl}/user/favorites/${props.route.params.id}`); // il id user chne5dhou min les donnness mte3ou lkoll ken les favoriisss
      // w puisque les favoriii fihon=m les shop id donc chnal9aw les shop dataa fihomm
      const userData = response.data;
      setShopsData(userData);
      console.log(JSON.stringify(userData, null, 2));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [props.route.params.id]);

  useFocusEffect(
    React.useCallback(() => {
      console.log(
        "user ID  : " + props.route.params.id + "*******************");
      fetchUserData();
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

            {/* Localisation */}
            <View style={tw`flex-row items-center mb-1`}>
              <Text
                style={tw`px-2 py-1 text-xs font-bold text-white bg-red-300 rounded-full`}
              >
                {"Kairouan"}
              </Text>
            </View>

            {/* Titre du restaurant */}
            <Text style={tw`mb-1 text-lg font-bold text-gray-800`}>
              {shop.shop_nom} 
            </Text>
            <Text style={tw`mb-1 text-md text-gray-500`}>
              {shop.phone} 
            </Text>

            {/* Note et avis */}
            <View style={tw`flex-row items-center  mt-2`}>
              <View style={tw`flex-row items-center`}>
                {[...Array(5)].map((_, j) => (
                  <Icon key={j} name="star" size={20} color="#FBBF24" />
                ))}
              </View>
              <Text style={tw`ml-4 text-lg font-bold text-red-300`}>4.9</Text>
            </View>

            {/* Icône favoris */}
            <TouchableOpacity>
              <Text style={tw`text-2xl self-end `}>🩷   </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default TaskCard;
