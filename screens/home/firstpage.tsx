import React from "react";
import { TouchableOpacity, Text, ImageBackground, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome";

// Firstpage Component
export default function Firstpage({ navigation }: { navigation: any }) {

  const gooo = () => {
    navigation.navigate("homepage");
  };

  return (
    <ImageBackground
      source={require('../../images/first.png')} // Assure-toi que ce chemin est correct
      style={tw`flex-1 justify-center items-center`} // L'image couvre toute la page
    >
      <SafeAreaView style={tw`flex-1 justify-end items-center pb-10`}>
      <Text style={tw`text-lg  text-gray-500 items-center justify-center  text-center font-bold `}>Envie de découvrir les meilleurs bons plans ? {'\n'} </Text>
      <Text style={tw`text-lg text-gray-500 mb-12 `}>Explore , partage et donne ton avis !</Text>
        <TouchableOpacity
          style={tw`bg-yellow-400 rounded-full px-6 h-12 flex-row items-center ml-40 `} // Flex pour aligner le texte et l'icône
          onPress={gooo} // Appeler la fonction goo
        >
          {/* Container pour l'icône et le texte */}
          <Icon name="arrow-right" size={20} style={tw`mr-2`} />
          <Text style={tw`text-lg  text-black`}>Next</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

