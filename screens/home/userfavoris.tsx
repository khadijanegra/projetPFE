import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome";


const TaskCard = () => {
  return (
    <View style={tw`p-4 m-2 bg-white border border-gray-300 shadow-lg rounded-2xl`}> 
      {/* Image principale */}
      <Image
        source={require("../../images/cafe.png")} // Remplace par l'URL de l'image réelle
        style={tw`w-full h-40 rounded-xl mb-2`}
      />
      
      {/* Localisation */}
      <View style={tw`flex-row items-center mb-1`}> 
        <Text style={tw`px-2 py-1 text-xs font-bold text-white bg-red-300 rounded-full`}>Kairouan</Text>
        
      </View>
      
      {/* Titre du restaurant */}
      <Text style={tw`mb-1 text-lg font-bold text-gray-800`}>Secret garden</Text>
      
      {/* Prix moyen */}
      
      
      {/* Note et avis */}
      <View style={tw`flex-row items-center justify-between mt-2`}>
        <View style={tw`flex-row items-center`}>
          
            
          
          
                    <View
                      style={tw`flex-row items-center self-start px-1 py-1 rounded-full `}
                    >
                      <View style={tw`flex-row items-center`}>
                        <Text><Icon name="star" size={20} color="#FBBF24" /></Text>
                        <Text><Icon name="star" size={20} color="#FBBF24" /></Text>
                        <Text><Icon name="star" size={20} color="#FBBF24" /></Text>
                        <Text><Icon name="star" size={20} color="#FBBF24" /></Text>
                        <Text><Icon name="star" size={20} color="#FBBF24" /></Text>
                      </View>{" "}
                      <Text style={tw`ml-1 text-lg font-bold text-red-300`}>
                        4.9
                      </Text>
                    </View>
        </View>
        
        {/* Icône favoris */}
        <TouchableOpacity>
          <Text style={tw`text-xl`}>🩷
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskCard;