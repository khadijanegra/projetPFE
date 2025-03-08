import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity,Alert,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native"; // Import navigation
import tw from "tailwind-react-native-classnames";
import axios from "axios";
const apiUrl = process.env.API_URL;

export default function Password(props : any) {



  const [email, setEmail] = useState("");
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/user/forgot-password`, {
        email,
      });
  
      console.log("Réponse de l'API :", response.data); // Vérifie la structure de la réponse
      if (response.data.message=="Verification code sent") { 
        Alert.alert("Succès", "Un email de réinitialisation a été envoyé !");
        props.navigation.navigate("passwordkey", { email : email}); 
        
      } else {
        console.log("erreur !");
      }
    } catch (error) {
      console.error("Erreur Axios :", error); 
      Alert.alert("Erreur", "Une erreur s'est produite !");
    }
  };
  return (
    <SafeAreaView style={tw`flex-1 p-4 bg-red-100`}>
      <Image 
          source={require("../../images/femme.png")} // Assurez-vous que le chemin de l'image est correct
          style={tw`w-30 h-30 mb-6 ml-40 `} 
        />
      <Text style={tw`mb-6 text-2xl font-bold text-center`}>
        Réinitialisation du mot de passe
      </Text>

      <Text style={tw`mb-4 mr-20 text-center text`}>
        Saisissez votre adresse e-mail :
      </Text>

      <View style={tw`flex-row items-center w-full px-4 mb-4 border border-gray-300 rounded-full`}>
        <Icon name="lock" size={20} color="#888" style={tw`mr-2`} />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          style={tw`flex-1 h-12`}
        />
      </View>

      <TouchableOpacity
        style={tw`items-center justify-center w-full h-12 bg-black rounded-full mt-6`}
        onPress={handleLogin} // Appeler la fonction goo
      >
        <Text style={tw`text-lg font-bold text-white`}>Confirmer</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
