import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import axios from "axios"; // Importation d'axios
import { RollInLeft } from "react-native-reanimated";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Creation() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [genre, setGenre] = useState("");
  const [role, setrole] = useState("");
  const[erreur,seterreur] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    // Validation des champs
    if (
      !email ||
      !nom ||
      !prenom ||
      !password ||
      !localisation ||
      !genre ||
      !role
    ) {
      seterreur("veuillez entrer les donnees !")
      Alert.alert("Erreur", "Tous les champs sont requis.");
      return erreur;
    }

    // Validation de l'email avec une expression régulière simple
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      seterreur("Veuillez entrer un email valide.");
      Alert.alert("Erreur", erreur); // Show the error alert with the message
      return erreur ; // Stop further processing
    }

    // Validation du mot de passe (par exemple, au moins 6 caractères)
    else if (password.length < 6) {
      seterreur("Veuillez entrer un mot de passe valide.")
      Alert.alert("Erreur",erreur);
      return erreur;
    }

    // Données à envoyer
    const userData = {
      nom,
      prenom,
      email,
      password,
      localisation,
      genre,
      role,
    };

    try {
      // Envoi des données au serveur avec axios
      const response = await axios.post(
        "http://192.168.1.63:5000/api/signup",
        userData
      );

      // Vérifier si la réponse est réussie
      if (response.status === 201) {
        Alert.alert("Succès", "Utilisateur créé avec succès");
      } else {
        Alert.alert("Erreur", "Une erreur est survenue");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      Alert.alert("Erreur", "Problème de connexion au serveur");
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-200 `}>
      
      <View style={tw`items-center justify-center flex-1 px-6 `}>
        <Text style={tw`mb-6 text-2xl font-bold`}>S'inscrire </Text>

        {/* Nom */}
        <View
          style={tw`flex-row items-center w-full px-4 mb-4 border border-gray-300 rounded-full `}
        >
          <Icon name="user" size={20} color="#888" style={tw`mr-2`} />
          <TextInput
            value={nom}
            onChangeText={setNom}
            placeholder="Nom"
            style={tw`flex-1 h-12`}
          />
        </View>

        {/* Prénom */}
        <View
          style={tw`flex-row items-center w-full px-4 mb-4 border border-gray-300 rounded-full`}
        >
          <Icon name="user" size={20} color="#888" style={tw`mr-2`} />
          <TextInput
            value={prenom}
            onChangeText={setPrenom}
            placeholder="Prenom"
            style={tw`flex-1 h-12`}
          />
        </View>

        {/* Email */}
        <View
          style={tw`flex-row items-center w-full px-4 mb-4 border border-gray-300 rounded-full`}
        >
          <Icon name="envelope" size={20} color="#888" style={tw`mr-2`} />{" "}
          {/* Icône pour email */}
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address" // Type de clavier adapté pour un email
            style={tw`flex-1 h-12`}
          />
        </View>

        {/* Password */}
        <View
          style={tw`flex-row items-center w-full px-4 mb-4 border border-gray-300 rounded-full`}
        >
          <Icon name="lock" size={20} color="#888" style={tw`mr-2`} />{" "}
          {/* Icône pour mot de passe */}
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Mot de passe"
            secureTextEntry={true} // Assure que le mot de passe est masqué
            style={tw`flex-1 h-12`}
          />
        </View>
        <View
          style={tw`flex-row items-center w-full px-4 mb-4 border border-gray-300 rounded-full`}
        >
          <Icon name="map-marker" size={20} color="#888" style={tw`mr-2`} />{" "}
          {/* Icône pour localisation */}
          <TextInput
            value={localisation}
            onChangeText={setLocalisation}
            placeholder="Localisation"
            style={tw`flex-1 h-12`}
          />
        </View>

        {/* Genre */}
        <View style={tw`flex-row items-center px-4 mb-4 `}>
          <Text style={tw`mr-4`}>Genre :</Text>

          {/* Homme Radio Button */}
          <TouchableOpacity
            style={tw`flex-row items-center mr-4`}
            onPress={() => setGenre("homme")}
          >
            <View
              style={tw`w-5 h-5 border-2 border-gray-300 rounded-full ${
                genre === "homme" ? "bg-blue-500" : ""
              }`}
            />
            <Text style={tw`ml-2`}>Homme</Text>
          </TouchableOpacity>

          {/* Femme Radio Button */}
          <TouchableOpacity
            style={tw`flex-row items-center`}
            onPress={() => setGenre("femme")}
          >
            <View
              style={tw`w-5 h-5 border-2 border-gray-300 rounded-full ${
                genre === "femme" ? "bg-pink-500" : ""
              }`}
            />
            <Text style={tw`ml-2`}>Femme</Text>
          </TouchableOpacity>
        </View>

        {/* Button Create Account */}
        <TouchableOpacity
          onPress={handleSubmit}
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
