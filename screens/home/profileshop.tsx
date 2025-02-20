import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ProfilShop = () => {
  return (
    <ScrollView style={tw`bg-gray-50`}>
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
          <Text style={tw`text-lg font-semibold text-gray-900`}>Description</Text>
          <Text style={tw`mt-2 text-gray-700`}>
            Découvrez le meilleur fast-food de la ville avec des plats délicieux et un service rapide !
          </Text>
        </View>

        {/* Horaires */}
        <View style={tw`p-4 mb-4 bg-gray-100 rounded-lg shadow-sm`}>
          <Text style={tw`text-lg font-semibold text-gray-900`}>Horaires</Text>
          <Text style={tw`mt-2 text-gray-700`}>Lundi - Dimanche : 10h - 22h</Text>
        </View>

        {/* Numéro de téléphone */}
        <View style={tw`flex-row items-center p-4 mb-4 bg-gray-100 rounded-lg shadow-sm`}>
          <MaterialIcons name="phone" size={20} color="black" />
          <Text style={tw`ml-2 text-gray-700`}>+33 6 12 34 56 78</Text>
        </View>

        {/* Adresse et carte Maps */}
        <View style={tw`p-4 bg-gray-100 rounded-lg shadow-sm`}>
          <Text style={tw`text-lg font-semibold text-gray-900`}>Adresse</Text>
          <Text style={tw`mt-2 text-gray-700`}>
            12 Rue de la République, 75001 Paris, France
          </Text>
          <View style={tw`flex items-center justify-center h-32 mt-4 bg-gray-300 rounded-lg`}>
            <Text style={tw`text-gray-500`}>Carte Maps ici</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfilShop;
