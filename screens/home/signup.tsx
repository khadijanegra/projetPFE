import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";


export default function Signup({ navigation }: { navigation: any }) {
  const goTo = () => {
    navigation.navigate("acceuilpage");
  };
  
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [erreur, setErreur] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    setErreur(""); // Réinitialise les erreurs
  
    if (!email || !nom || !prenom || !password || !localisation) {
      setErreur("Veuillez entrer toutes les données !");
      Alert.alert("Erreur", "Veuillez entrer toutes les données !");
      return false;
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErreur("Veuillez entrer un email valide.");
      Alert.alert("Erreur", "Veuillez entrer un email valide.");
      return false;
    }
  
    if (password.length < 6) {
      setErreur("Le mot de passe doit contenir au moins 6 caractères.");
      Alert.alert("Erreur", "Le mot de passe doit contenir au moins 6 caractères.");
      return false;
    }
  
    const userData = { nom, prenom, email, password, localisation };
  
    try {
      setIsSubmitting(true);
      const response = await axios.post("http://localhost:3000/api/signup", userData);
  
      if (response.status === 201) {
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
  
  const handleSignUpAndNavigate = async () => {
    const isValid = await handleSubmit();
    if (isValid) {
      goTo();
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-200`}>
      <View style={tw`items-center justify-center flex-1 px-6`}>
        <Text style={tw`mb-6 text-2xl font-bold`}>S'inscrire</Text>

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

        {/* Password */}
        <View style={tw`flex-row items-center w-full px-4 mb-4 border border-gray-300 rounded-full`}>
          <Icon name="lock" size={20} color="#888" style={tw`mr-2`} />
          <TextInput value={password} onChangeText={setPassword} placeholder="Mot de passe" secureTextEntry={true} style={tw`flex-1 h-12`} />
        </View>

        {/* Localisation */}
        <View style={tw`flex-row items-center w-full px-4 mb-4 border border-gray-300 rounded-full`}>
          <Icon name="map-marker" size={20} color="#888" style={tw`mr-2`} />
          <TextInput value={localisation} onChangeText={setLocalisation} placeholder="Localisation" style={tw`flex-1 h-12`} />
        </View>

        {/* Message d'erreur */}
        {erreur ? <Text style={tw`mb-4 text-red-500`}>{erreur}</Text> : null}

        {/* Bouton Créer */}
        <TouchableOpacity
          onPress={goTo}
          disabled={isSubmitting}
          style={tw`items-center justify-center w-full h-12 mt-2 mb-6 bg-yellow-500 rounded-full`}
        >
          <Text style={tw`text-lg font-bold text-white`}>
            {isSubmitting ? "Création..." : "Créer"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
