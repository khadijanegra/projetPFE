import React, { useEffect } from "react";
import { TouchableOpacity, Text, Image, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome";
import uuid from 'react-native-uuid';
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const API_URL = process.env.API_URL;
const sessionId = uuid.v4(); // Génère un ID de session unique
console.log("Generated Session ID:", sessionId);

// Firstpage Component
export default function Firstpage({ navigation }: { navigation: any }) {
  const goToHome = () => {
    navigation.navigate("homepage");
  };

  console.log(API_URL);

  return (
    <ScrollView contentContainerStyle={tw`bg-white`}>
      {/* View englobant tout avec un marginTop */}
      <View style={tw` flex-1`}>
        {/* Image Shape */}
        <View style={tw`  mr-52`}>
          <Image
            source={require("../../images/shape.png")}
            style={{
              width: width * 0.5, // Ajuste la largeur de l'image
              height: width * 0.5, // Assure la même hauteur pour une image carrée
              aspectRatio: 1, // Garde les proportions carrées
            }}
          />
        </View>

        {/* SafeAreaView pour protéger les éléments */}
        <SafeAreaView style={tw`flex-1 `}>
          {/* Grande image en haut */}
          <Image
            source={require("../../images/firsst.png")}
            style={[tw`w-full`, { height: height * 0.4 }]} // Ajuste la hauteur en fonction de l'écran
            resizeMode="contain"
          />

          {/* Icon de localisation centré */}
          <View style={tw`items-center my-4 mb-1 mt-1`}>
            <Image
              source={require("../../images/loc.png")}
              style={tw`w-12 h-12`} // Ajuste la taille de l'icône
              resizeMode="contain"
            />
          </View>

          {/* Texte en dessous */}
          <View style={tw`items-center`}>
            <Text style={tw`text-xl text-black font-bold`}>𝐁𝐎𝐍 𝐏𝐋𝐀𝐍</Text>
            <Text style={tw`text-gray-500 mt-1 text-center`}>
              𝐃𝐞́𝐜𝐨𝐮𝐯𝐫𝐞𝐳 𝐭𝐨𝐮𝐬 𝐥𝐞𝐬 𝐥𝐢𝐞𝐮𝐱 𝐚𝐮𝐭𝐨𝐮𝐫 𝐝𝐞 𝐯𝐨𝐮𝐬
            </Text>
          </View>

          {/* Bouton Next */}
          <View style={tw`flex-1 justify-end items-center pb-10`}>
            <TouchableOpacity
              style={tw`bg-black rounded-full px-6 py-3 flex-row items-center mt-2`}
              onPress={goToHome}
            >
              <Text style={tw`text-lg text-white mr-2 `}>𝐍𝐞𝐱𝐭</Text>
              <Icon name="arrow-right" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}
