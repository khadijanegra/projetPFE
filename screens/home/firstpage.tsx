import React, { useEffect } from "react";
import { TouchableOpacity, Text, Image, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome";

const API_URL = process.env.API_URL;

// Firstpage Component
export default function Firstpage({ navigation }: { navigation: any }) {
  const goToHome = () => {
    navigation.navigate("homepage");
  };

  console.log(API_URL);
/*
  useEffect(() => {
    Alert.alert("API URL", API_URL ? API_URL : "Aucune API_URL détectée !");
  }, []);
*/
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Grande image en haut */}
      <Image
        source={require("../../images/firsst.png")} // Vérifie le chemin
        style={tw`w-full h-2/3`}
        resizeMode="contain"
      />

      {/* Icon de localisation centré */}
      <View style={tw`items-center `}>
        <Image
          source={require("../../images/loc.png")} // Vérifie le chemin
          style={tw`w-12 h-12`} // Ajuste la taille de l'icône
          resizeMode="contain"
        />
      </View>

      {/* Texte en dessous */}
      <View style={tw`items-center mt-2`}>
        <Text style={tw`text-xl text-black font-bold`}>𝐁𝐎𝐍 𝐏𝐋𝐀𝐍  </Text>
        <Text style={tw`text-gray-500 mt-1`}>𝐃𝐞́𝐜𝐨𝐮𝐯𝐫𝐞𝐳 𝐭𝐨𝐮𝐬 𝐥𝐞𝐬 𝐥𝐢𝐞𝐮𝐱 𝐚𝐮𝐭𝐨𝐮𝐫 𝐝𝐞 𝐯𝐨𝐮𝐬</Text>
      </View>

      {/* Bouton Next */}
      <View style={tw`flex-1 justify-end items-center pb-10`}>
        <TouchableOpacity
          style={tw`bg-black rounded-full px-6 py-3 flex-row items-center`}
          onPress={goToHome}
        >
          <Text style={tw`text-lg text-white mr-2`}>𝐍𝐞𝐱𝐭</Text>
          <Icon name="arrow-right" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
