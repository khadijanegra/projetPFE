import React, { useCallback, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Animated } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
const apiUrl = process.env.API_URL;

const ProfilShop = (props: any) => {
  const [showPhone, setShowPhone] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [showAddress, setShowAddress] = useState(false);
  const [user_id , setuser_id] = useState();


  const [shopData, setShopData] = useState <any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const shopId = props.route.params.shopId;

  const fetchShopData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/shops/${shopId}`);
      const responseData = response.data;
      console.log(responseData);
      console.log("ID utilisateur reçu fil profil shop :"+props.route.params.id);
      console.log("le id de ce shop illi inty d5altlou howa " + shopId);
    
   
      setShopData( responseData);
      //console.log("**********", JSON.stringify(response.data, null, 2)); 
           setLoading(false);
    } catch (error) {
      setError(true);
      console.error("Error fetching shop data:", error);
    }
  }, [shopId]);

  useFocusEffect(
    React.useCallback(() => {
      fetchShopData();
    }, [fetchShopData])
  );
  
  const toggleDescription = () => {
    setShowDescription(prev => !prev);
    Animated.timing(animation, {
      toValue: showDescription ? 0 : 1,
      duration: 300,
      useNativeDriver: false
    }).start();
  };

  const goToReviewForm = () => {
    props.navigation.navigate("reviewform", {
      shop_id: shopId,
      user_id: props.route.params.id
    
    });
  };
  

  const goToReviewShop = () => {
    props.navigation.navigate("reviewshop", {
      shop_id: shopId,
      user_id: props.route.params.id
    });
  };

  return (
<ScrollView style={tw`bg-white`}>
  {shopData && (
    <View style={tw`relative h-80`}>
      <Image
        source={{ uri: `${apiUrl}/fetchshopImages/${shopData.shopImage}` }}
        style={tw`w-full h-full`}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={tw`absolute bottom-0 w-full h-1/3`}
      />
      <View style={tw`absolute bottom-0 w-full p-6`}>
        <Text style={tw`text-3xl font-bold text-white mb-1`}>{shopData.shop_nom}</Text>
        <View style={tw`flex-row items-center`}>
          <Ionicons name="star" size={20} color="#FBBF24" />
          <Text style={tw`ml-2 text-yellow-400 text-sm`}>5.0 (1 avis)</Text>
        </View>
      </View>
    </View>
  )}

  {/* Main content */}
  <View style={tw`px-4 p-5 pt-10 bg-red-50`}>
    {/* Description Section */}
    {shopData && (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={toggleDescription}
        style={tw`mb-4 bg-white rounded-xl p-4 shadow-sm`}
      >
        <View style={tw`flex-row justify-between items-center shadow-xl`}>
          <Text style={tw`text-lg font-semibold text-gray-900`}>Description</Text>
          <Ionicons
            name={showDescription ? "chevron-up" : "chevron-down"}
            size={25}
            color="#EF5350"
          />
        </View>
        {showDescription && (
          <Text style={tw`mt-2 text-gray-600 leading-5`}>{shopData.shop_desc}</Text>
        )}
      </TouchableOpacity>
    )}

    {/* Contact Section */}
    {shopData  && (
      <View style={tw`mb-4 bg-white rounded-xl p-4 shadow-xl`}>
        <TouchableOpacity
          style={tw`flex-row justify-between items-center`}
          onPress={() => setShowPhone(!showPhone)}
        >
          <View style={tw`flex-row items-center`}>
            <MaterialIcons name="phone" size={25} color="#EF5350" />
            <Text style={tw`ml-2 text-gray-700`}>Contact</Text>
          </View>
          <Ionicons
            name={showPhone ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#6B7280"
          />
        </TouchableOpacity>
        {showPhone && (
          <Text style={tw`mt-2 text-lg font-semibold text-gray-900`}>
            {shopData.phone}
          </Text>
        )}
      </View>
    )}

    {/* Hours Section */}
    {shopData  && (
      <View style={tw`mb-4 bg-white rounded-xl p-4 shadow-sm shadow-xl`}>
        <Text style={tw`text-lg font-semibold text-gray-900 mb-3`}>Horaires</Text>
        <View style={tw`flex-row justify-between mb-2`}>
          <Text style={tw`text-gray-600`}>Lundi - Vendredi</Text>
          <Text style={tw`text-gray-800 font-medium`}>
            {shopData.shop_date_ouv} - {shopData.shop_date_ferm}
          </Text>
        </View>
      </View>
    )}

    {/* Address Section */}
    {shopData && shopData.local && (
      <View style={tw`mb-6 bg-white rounded-xl p-4 shadow-lg border border-gray-300`}>
        <Text style={tw`text-lg font-semibold text-gray-900 mb-3`}>Adresse</Text>
        <View style={tw`flex-row items-center mb-4`}>
          <Ionicons name="location-outline" size={25} color="#EF5350" style={tw`mt-1`} />
          <TouchableOpacity onPress={() => setShowAddress(!showAddress)}>
            <Text style={tw`ml-2 text-gray-600 underline`}>
              {showAddress ? shopData.shop_local : "Voir l'adresse"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`h-40 rounded-lg overflow-hidden`}>
          {/* Map integration can go here */}
          <View style={tw`h-40 bg-gray-200 rounded-lg overflow-hidden`} />
        </View>
      </View>
    )}

    {/* Reviews Section */}
    <View style={tw`p-4 bg-white rounded-lg shadow-md`}>
      <Text style={tw`mb-2 text-lg font-bold`}>Avis</Text>
      <View style={tw`mb-2 border-b border-gray-300`} />
      <View style={tw`flex-col items-center mb-10`}>
        <Text style={tw`ml-1 text-2xl font-bold`}>4.1</Text>
        <Text style={tw`text-yellow-400 text-2xl`}>★★★★★</Text>
        <Text style={tw`ml-2 text-sm text-gray-600`}>83 avis</Text>
      </View>
      <View style={tw`flex-row justify-between`}>
        <View style={tw`items-center`}>
          <Image
            source={require("../../images/service.png")}
            style={tw`w-12 h-12 border-white rounded-full`}
          />
          <Text style={tw`text-sm font-bold`}>Service</Text>
          <Text style={tw`text-sm text-gray-600`}>4.1</Text>
        </View>
        <View style={tw`items-center`}>
          <Image
            source={require("../../images/ambiance.png")}
            style={tw`w-12 h-12 border-white rounded-full`}
          />
          <Text style={tw`text-sm font-bold`}>Ambiance</Text>
          <Text style={tw`text-sm text-gray-600`}>4.1</Text>
        </View>
        <View style={tw`items-center`}>
          <Image
            source={require("../../images/cuisine.png")}
            style={tw`w-12 h-12 border-white rounded-full`}
          />
          <Text style={tw`text-sm font-bold`}>Cuisine</Text>
          <Text style={tw`text-sm text-gray-600`}>4.1</Text>
        </View>
      </View>
    </View>

    <TouchableOpacity
      style={tw`flex-row items-center justify-center w-1/2 py-2 mt-3 mb-5 ml-40 bg-red-300 rounded-full`}
      onPress={goToReviewShop}
    >
      <Icon name="eye" size={20} color="black" style={tw`mr-2`} />
      <Text style={tw`text-lg text-center`}>Voir avis</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={tw`flex-row items-center justify-center w-full py-2 mb-5 bg-red-300 rounded-full px-14`}
      onPress={goToReviewForm}
    >
      <Icon name="comment" size={20} color="black" style={tw`mr-2`} />
      <Text style={tw`text-lg font-bold text-center`}>
        Donner votre avis
      </Text>
    </TouchableOpacity>
  </View>
</ScrollView>


  );
};

export default ProfilShop;
