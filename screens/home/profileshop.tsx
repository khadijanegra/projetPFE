import React, { useCallback, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

 

const ProfilShop = (props : any) => {
  const [shop_nom, setShop_nom] = useState("");
  const [shop_desc, setShop_desc] = useState("");
  const [shop_local, setShopLocal] = useState("");
  const [shop_date_ferm, setShopDateFrem] = useState("");
  const [shop_date_ouv, setShopDateOuve] = useState("");
  const [phone, setPhone] = useState("")
  const [shopImage , setShopImage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const shopdata = props.route.params.shopData;
  
  console.log("ID de shop *** reçu :", shopdata._id);
  const fetchShopData = useCallback(async () => {
    try {
      
      setLoading(true);
      const response = await axios.get(`http://10.0.2.2:3000/shops/${shopdata._id}`);
      console.log(JSON.stringify(response, null, 2));      setShop_nom(shopdata.shop_nom);
      setShop_desc(shopdata.shop_desc);
      setShopLocal(shopdata.shop_local);
      setShopDateFrem(shopdata.shop_date_ferm);
      setShopDateOuve(shopdata.shop_date_ouv);
      setPhone(shopdata.phone);
      setShopImage(shopdata.shopImage)
      setLoading(false);
    } catch (error) {
      setError(true);
      console.error("Error fetching user data:", error);
    }
    
  }, [shopdata]);

  
  console.log( props.route.params.shopData._id , props.route.params.shopData.user_id._id )

  // Exécuter la récupération des données quand l'écran est focalisé
  useFocusEffect(
    React.useCallback(() => {
      fetchShopData(); 
    }, [fetchShopData]) 
  );
  const gotoreviewform = () => {
    props.navigation.navigate("reviewform", { 
      shop_id: props.route.params.shopData._id,  
      user_id: props.route.params.shopData.user_id._id 
    });
  };
  const gotoreviewshop = () => {
    props.navigation.navigate("reviewshop", { 
      shop_id: props.route.params.shopData._id,  
      user_id: props.route.params.shopData.user_id._id 
      
    });
  };

  return (
    <ScrollView style={tw`bg-red-100`}>
      {/* En-tête avec l'image et les détails */}
      <View style={tw`relative`}>
        <Image
           source={{ uri: shopImage }} // t3ayet lil api mte3 getshsopimage w testa3mel URL/getshopimage/ism l'image 
           style={tw`w-full h-64`}
           resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={tw`absolute bottom-0 left-0 right-0 h-1/2`}
        />
        <View style={tw`absolute bottom-0 left-0 right-0 p-6`}>
          <Text style={tw`mb-1 text-3xl font-bold text-white`}>
            {shop_nom}
          </Text>
          <View style={tw`flex-row items-center`}>
            <Ionicons name="star" size={20} color="#FBBF24" />
            <Text style={tw`ml-2 font-medium text-yellow-400`}>
              5.0 (1 avis)
            </Text>
            <Text style={tw`ml-4 text-gray-300`}>•</Text>
          </View>
        </View>
      </View>

      {/* Contenu principal */}
      <View style={tw`p-6 mt-6 bg-white shadow-lg rounded-t-3xl`}>
        {/* Description */}
        <View style={tw`p-4 mb-4 bg-gray-100 rounded-lg shadow-sm`}>
          <Text style={tw`text-lg font-semibold text-gray-900`}>
            Description
          </Text>
          <Text style={tw`mt-2 text-gray-700`}>
           {shop_desc}
          </Text>
        </View>

        {/* Horaires */}
        <View style={tw`p-4 mb-4 bg-gray-100 rounded-lg shadow-sm`}>
          <Text style={tw`text-lg font-semibold text-gray-900`}>Horaires</Text>
          <Text style={tw`mt-2 text-gray-700`}>
            Lundi - vendredi : {shop_date_ferm}  {shop_date_ouv}
          </Text>
          <Text style={tw`mt-2 text-gray-700`}>
            samedi - dimanche: {shop_date_ferm}  {shop_date_ouv}
          </Text>
        </View>

        {/* Numéro de téléphone */}
        <View
          style={tw`flex-row items-center p-4 mb-4 bg-gray-100 rounded-lg shadow-sm`}
        >
          <MaterialIcons name="phone" size={20} color="black" />
          <Text style={tw`ml-2 text-gray-700`}>{phone}</Text>
        </View>

        {/* Adresse et carte Maps */}
        <View style={tw`p-4 mb-6 bg-gray-100 rounded-lg shadow-sm`}>
          <Text style={tw`text-lg font-semibold text-gray-900`}>Adresse</Text>
          <Text style={tw`mt-2 text-gray-700`}>
            {shop_local}
          </Text>
          <View
            style={tw`flex items-center justify-center h-32 mt-4 bg-gray-300 rounded-lg`}
          >
            <Text style={tw`text-gray-500`}>Carte Maps ici</Text>
          </View>
        </View>

        <View style={tw`p-4 bg-gray-100 rounded-lg shadow-md`}>
          <Text style={tw`mb-2 text-lg font-bold`}>Avis</Text>

          <View style={tw`mb-2 border-b border-gray-200 `} />
          <View style={tw`flex-col items-center mb-10`}>
            <Text style={tw`ml-1 text-2xl font-bold`}>4.1</Text>

            <Text style={tw`text-yellow-400`}>★★★★★</Text>
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
              <Text style={tw`text-sm text-gray-600 `}>4.1</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
  style={tw`flex-row items-center justify-center w-1/2 py-2 mt-3 mb-5 ml-40 bg-red-300 rounded-full`}
  onPress={ gotoreviewshop}
>
  <Icon name="eye" size={20} color="black" style={tw`mr-2`} />
  <Text style={tw`text-lg text-center`}>Voir avis</Text>
</TouchableOpacity>
+
        <TouchableOpacity
          style={tw`flex-row items-center justify-center w-full py-2 mb-5 bg-red-300 rounded-full px-14`}
          onPress={gotoreviewform}
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
