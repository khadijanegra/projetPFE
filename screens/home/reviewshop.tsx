import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome";

const ReviewShop = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity 
      onPress={() => setExpanded(!expanded)}
      style={tw`p-4 m-2 bg-white border border-gray-300 shadow-lg rounded-2xl`}
    >
      {/* Nom de l'utilisateur */}
      <Text style={tw`text-lg font-bold text-gray-800 mb-1`}>Maram</Text>

      {/* Avis de l'utilisateur */}
      <Text style={tw`text-gray-600 mb-2`}>
        Superbe expérience ! Le cadre est magnifique et le service chaleureux.
      </Text>

      {/* Note et avis */}
      <View style={tw`flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center`}>
          <Icon name="star" size={20} color="#FBBF24" />
          <Icon name="star" size={20} color="#FBBF24" />
          <Icon name="star" size={20} color="#FBBF24" />
          <Icon name="star" size={20} color="#FBBF24" />
          <Icon name="star" size={20} color="#FBBF24" />
          <Text style={tw`ml-1 text-lg font-bold text-red-300`}>4.9</Text>
        </View>
      </View>

      {/* Détails affichés lorsque l'on clique */}
      {expanded && (
        <View style={tw`mt-2 p-2 bg-gray-100 rounded-lg`}>
          <Text style={tw`text-gray-700`}>🌿 Ambiance : 4</Text>
          <Text style={tw`text-gray-700`}>🍽 Service : 3</Text>
          <Text style={tw`text-gray-700`}>👨‍🍳 Cuisine : 3</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ReviewShop;
