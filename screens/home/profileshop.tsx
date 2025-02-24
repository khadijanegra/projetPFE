import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
const ProfilShop = () => {
  return (
    <ScrollView style={tw`bg-red-100`}>
      {/* En-tête avec l'image et les détails */}
      <View style={tw`relative`}>
        <Image
          source={require("../../images/profilshop.png")}
          style={tw`w-full h-64`}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={tw`absolute bottom-0 left-0 right-0 h-1/2`}
        />
        <View style={tw`absolute bottom-0 left-0 right-0 p-6`}>
          <Text style={tw`mb-1 text-3xl font-bold text-white`}>
            Texas Fastfood
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
            Découvrez le meilleur fast-food de la ville avec des plats délicieux
            et un service rapide !
          </Text>
        </View>

        {/* Horaires */}
        <View style={tw`p-4 mb-4 bg-gray-100 rounded-lg shadow-sm`}>
          <Text style={tw`text-lg font-semibold text-gray-900`}>Horaires</Text>
          <Text style={tw`mt-2 text-gray-700`}>
            Lundi - vendredi :09:00AM-11:00PM
          </Text>
          <Text style={tw`mt-2 text-gray-700`}>
            samedi - dimanche:09:00AM-02:00AM{" "}
          </Text>
        </View>

        {/* Numéro de téléphone */}
        <View
          style={tw`flex-row items-center p-4 mb-4 bg-gray-100 rounded-lg shadow-sm`}
        >
          <MaterialIcons name="phone" size={20} color="black" />
          <Text style={tw`ml-2 text-gray-700`}>+33 6 12 34 56 78</Text>
        </View>

        {/* Adresse et carte Maps */}
        <View style={tw`p-4 bg-gray-100 rounded-lg shadow-sm mb-6`}>
          <Text style={tw`text-lg font-semibold text-gray-900`}>Adresse</Text>
          <Text style={tw`mt-2 text-gray-700`}>
            12 Rue de la République, 75001 Paris, France
          </Text>
          <View
            style={tw`flex items-center justify-center h-32 mt-4 bg-gray-300 rounded-lg`}
          >
            <Text style={tw`text-gray-500`}>Carte Maps ici</Text>
          </View>
        </View>

        <View style={tw`p-4  rounded-lg shadow-md bg-gray-100`}>
          <Text style={tw`text-lg font-bold mb-2`}>Avis</Text>

          <View style={tw`border-b border-gray-200 mb-2 `} />
          <View style={tw`flex-col items-center mb-10`}>
            <Text style={tw`text-2xl font-bold ml-1`}>4.1</Text>

            <Text style={tw`text-yellow-400`}>★★★★★</Text>
            <Text style={tw`text-sm text-gray-600 ml-2`}>83 avis</Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <View style={tw`items-center`}>
              <Image
                source={require("../../images/service.png")}
                style={tw`w-12 h-12 rounded-full  border-white`}
              />
              <Text style={tw`text-sm font-bold`}>Service</Text>
              <Text style={tw`text-sm text-gray-600`}>4.1</Text>
            </View>
            <View style={tw`items-center`}>
              <Image
                source={require("../../images/ambiance.png")}
                style={tw`w-12 h-12 rounded-full  border-white`}
              />
              <Text style={tw`text-sm font-bold`}>Ambiance</Text>
              <Text style={tw`text-sm text-gray-600`}>4.1</Text>
            </View>
            <View style={tw`items-center`}>
              <Image
                source={require("../../images/cuisine.png")}
                style={tw`w-12 h-12 rounded-full  border-white`}
              />
              <Text style={tw`text-sm font-bold`}>Cuisine</Text>
              <Text style={tw`text-sm text-gray-600 `}>4.1</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
  style={tw`ml-40 py-2 mt-3 mb-5 bg-red-300 rounded-full w-1/2 flex-row items-center justify-center`}
>
  <Icon name="eye" size={20} color="black" style={tw`mr-2`} />
  <Text style={tw`text-lg text-center`}>Voir avis</Text>
</TouchableOpacity>
+
        <TouchableOpacity
          style={tw`w-full py-2  mb-5 bg-red-300 rounded-full px-14 flex-row items-center justify-center`}
        >
          <Icon name="comment" size={20} color="black" style={tw`mr-2`} />
          <Text style={tw`text-lg text-center font-bold`}>
            Donner votre avis
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfilShop;
