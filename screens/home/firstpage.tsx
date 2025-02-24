import React from "react";
import { TouchableOpacity, Text, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome";

// Firstpage Component
export default function Firstpage({ navigation }: { navigation: any }) {
  const goToHome = () => {
    navigation.navigate("homepage");
  };

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
        <Text style={tw`text-xl text-black font-bold`}>BON PLAN </Text>
        <Text style={tw`text-gray-500 mt-1`}>Découvrez tous les lieux autour de vous</Text>
      </View>

      {/* Bouton Next */}
      <View style={tw`flex-1 justify-end items-center pb-10`}>
        <TouchableOpacity
          style={tw`bg-black rounded-full px-6 py-3 flex-row items-center`}
          onPress={goToHome}
        >
          <Text style={tw`text-lg text-white mr-2`}>Next</Text>
          <Icon name="arrow-right" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
