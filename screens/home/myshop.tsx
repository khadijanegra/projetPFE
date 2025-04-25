import React, { useCallback, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const apiUrl = process.env.API_URL;

const Myshop = (props: any) => {
  const [shopsData, setShopsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchUserData = useCallback(async () => {
    if (!props.route.params?.id) {
      console.error("User ID is missing");
      setError(true);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${apiUrl}/shops/user/${props.route.params.id}`
      );
      setShopsData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user shops:", error);
      setError(true);
      setLoading(false);
    }
  }, [props.route.params?.id]);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [fetchUserData])
  );

  const goToMyEstablishment = (shop: any) => {
    props.navigation.navigate("consultshop", {
      shopId: shop._id,
      id: props.route.params.id,
    });
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator size="large" color="#EC4899" />
        <Text style={tw`mt-4 text-gray-600`}>Chargement de vos boutiques...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white p-6`}>
        <Ionicons name="alert-circle" size={48} color="#EF4444" />
        <Text style={tw`text-lg text-gray-800 mt-4 text-center`}>
          Erreur lors du chargement de vos boutiques
        </Text>
        <TouchableOpacity
          style={tw`mt-6 bg-pink-600 px-6 py-3 rounded-full`}
          onPress={fetchUserData}
        >
          <Text style={tw`text-white font-medium`}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (shopsData.length === 0) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white p-6`}>
        <Ionicons name="storefront-outline" size={48} color="#9CA3AF" />
        <Text style={tw`text-xl text-gray-800 mt-4 text-center font-medium`}>
          Vous n'avez pas encore de boutique
        </Text>
        <Text style={tw`text-gray-500 mt-2 text-center`}>
          Créez votre première boutique pour commencer
        </Text>
        <TouchableOpacity
          style={tw`mt-6 bg-pink-600 px-6 py-3 rounded-full`}
          onPress={() => props.navigation.navigate("AddShop")}
        >
          <Text style={tw`text-white font-medium`}>Créer une boutique</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      <View style={tw`px-4 pt-4 pb-2`}>
        <Text style={tw`text-2xl font-bold text-gray-900`}>Mes établissements</Text>
        <Text style={tw`text-gray-500 mt-1`}>
          {shopsData.length} {shopsData.length > 1 ? "établissements" : "établissement"}
        </Text>
      </View>

      <ScrollView contentContainerStyle={tw`pb-6`}>
        <View style={tw`px-4`}>
          {shopsData.map((shop) => (
            <TouchableOpacity
              key={shop._id}
              style={tw`mb-5 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100`}
              onPress={() => goToMyEstablishment(shop)}
              activeOpacity={0.9}
            >
              <Image
                source={{ uri: `${apiUrl}/fetchshopImages/${shop.shopImage}` }}
                style={tw`w-full h-48`}
                resizeMode="cover"
              />
              
              <View style={tw`p-4`}>
                <View style={tw`flex-row justify-between items-start`}>
                  <Text style={tw`text-xl font-bold text-gray-900 flex-1`}>
                    {shop.shop_nom}
                  </Text>
                  <View style={tw`flex-row items-center ml-2`}>
                    <Ionicons name="star" size={16} color="#F59E0B" />
                    <Text style={tw`ml-1 text-gray-700`}>4.8</Text>
                  </View>
                </View>
                
                
                
                
                <View style={tw`mt-4 pt-3 border-t border-gray-100 flex-row justify-between`}>
                  <View style={tw`flex-row items-center`}>
                    <Ionicons name="call-outline" size={16} color="#EC4899" />
                    <Text style={tw`ml-2 text-gray-600`}>{shop.phone || "Non renseigné"}</Text>
                  </View>
                  
                  <TouchableOpacity
                    style={tw`bg-pink-100 px-3 py-1 rounded-full`}
                    onPress={() => goToMyEstablishment(shop)}
                  >
                    <Text style={tw`text-pink-600 text-sm font-medium`}>Voir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={tw`absolute bottom-6 right-6 bg-pink-600 w-14 h-14 rounded-full items-center justify-center shadow-lg`}
        onPress={() => props.navigation.navigate("AddShop")}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Myshop;