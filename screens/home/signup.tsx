import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert ,Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
const apiUrl = process.env.API_URL;

export default function Signup(props: any) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [erreur, setErreur] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [id, setId] = useState("");

  // Pour afficher l'ID lorsque la variable `id` est mise à jour
  useEffect(() => {
    console.log("ID mis à jour:", id);
  }, [id]);

  const handleSubmit = async () => {
    const userData = { nom, prenom, email, password, localisation };

    try {
      setIsSubmitting(true);
      const response = await axios.post(`${apiUrl}/user/register`, userData);
      
      if (response.data.token) {
        // Mise à jour de l'ID récupéré de la réponse
        const userId = response.data.id;
        console.log("User ID récupéré:", userId);
        props.navigation.navigate("locationdemand",{id :userId} ); // Passe l'ID à la page suivante
        // Envoie un message de succès à l'utilisateur
        Alert.alert("Succès", "Utilisateur créé avec succès");
        
        return true;
      } else {
        Alert.alert("Erreur", "Une erreur est survenue");
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      Alert.alert("Erreur", "Problème de connexion au serveur");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <ScrollView>
    <SafeAreaView style={tw`flex-1 bg-white`}>
      {/* Image avant le texte d'inscription */}
      <Image 
          source={require("../../images/sign.png")} // Assurez-vous que le chemin de l'image est correct
          style={tw`w-30 h-30 mb-6 ml-8 `} 
        />
      <View style={tw`items-center justify-center flex-1 px-6`}>
        
        <Text style={tw`mb-6 text-2xl font-bold`}>𝐒'𝐢𝐧𝐬𝐜𝐫𝐢𝐫𝐞</Text>

        {/* Nom */}
        <View style={tw`flex-row items-center w-full px-4 mb-4 border border-gray-300 rounded-full`}>
          <Icon name="user" size={20} color="#888" style={tw`mr-2`} />
          <TextInput value={nom} onChangeText={setNom} placeholder="Nom" style={tw`flex-1 h-12`} />
        </View>

        {/* Prénom */}
        <View style={tw`flex-row items-center w-full px-4 mb-4 border border-gray-300 rounded-full`}>
          <Icon name="user" size={20} color="#888" style={tw`mr-2`} />
          <TextInput value={prenom} onChangeText={setPrenom} placeholder="Prénom" style={tw`flex-1 h-12`} />
        </View>

        {/* Email */}
        <View style={tw`flex-row items-center w-full px-4 mb-4 border border-gray-300 rounded-full`}>
          <Icon name="envelope" size={20} color="#888" style={tw`mr-2`} />
          <TextInput value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" style={tw`flex-1 h-12`} />
        </View>

        {/* Mot de passe */}
        <View style={tw`flex-row items-center w-full px-4 mb-4 border border-gray-300 rounded-full`}>
          <Icon name="lock" size={20} color="#888" style={tw`mr-2`} />
          <TextInput value={password} onChangeText={setPassword} placeholder="Mot de passe" secureTextEntry={true} style={tw`flex-1 h-12`} />
        </View>
        
        {/* Message d'erreur */}
        {erreur ? <Text style={tw`mb-4 text-red-500`}>{erreur}</Text> : null}

        {/* Bouton Créer */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isSubmitting}
          style={tw`items-center justify-center w-full h-12 mt-8 mb-6 bg-black rounded-full`}
        >
          <Text style={tw`text-lg font-bold text-white`}>
            {isSubmitting ? "Création..." : "𝐂𝐫𝐞́𝐞𝐫"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
}
