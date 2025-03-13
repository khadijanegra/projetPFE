import React, { useState, useCallback } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const UserProfile = (props: any) => {
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState(""); // Correcte l'état pour prénom
  const [email, setEmail] = useState("");
  const apiUrl = process.env.API_URL;

  
  const [isEditing, setIsEditing] = useState(false);



  //bech nchouf se3a 9bal el fetch andy les donnes edhouma wala leeeee 
  console.log("ID utilisateur reçu :", props.route.params.id);
  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/users/${props.route.params.id}`);

      
  
      const userData = response.data;
      console.log(userData);
      // Consommer seulement le nom, prénom et email
      setName(userData.nom); 
      setPrenom(userData.prenom);
      setEmail(userData.email);
      //console.log(name, prenom, email);
  
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [props.route.params.id]); // Utiliser l'ID comme dépendance
  // Utiliser l'ID comme dépendance

  // Exécuter la récupération des données quand l'écran est focalisé
  useFocusEffect(
    React.useCallback(() => {
      console.log("***************"+props.route.params.id+"*******************")
      fetchUserData(); 
    }, [fetchUserData]) 
  );
  const handleSave = async () => {

    try {
      console.log("Données envoyées :", { nom: name }, { prenom: prenom });
      await axios.put(`${apiUrl}/user/users/${props.route.params.id}/nom`, { nom: name });
      await axios.put(`${apiUrl}/user/users/${props.route.params.id}/prenom`, { prenom: prenom });
  
      alert("Modifications enregistrées !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
    setIsEditing(false);
  };
  const goToDeleteAccount = () => {
    props.navigation.navigate("deleteAccount", {
      user_id: props.route.params.id, 
      
    });
  
  };
  
  
   
  return (
    <ScrollView style={tw`flex-1 bg-red-100`} contentContainerStyle={tw`p-4`}>
      <View style={tw`flex-1 p-4`}>
        {/* Header */}
        <View style={tw`items-center mt-4`}>
          <Image
            source={require('../../images/Illustration.png')}
            style={tw`w-40 h-40 border-4 border-white rounded-full shadow-lg`}
          />
        </View>

        {/* Personal Info */}
        <Text style={tw`mt-6 text-xl font-bold`}>Vos informations personnelles</Text>
        <View>
          <View style={tw`p-4 mt-2 bg-gray-100 rounded-lg shadow-lg`}>
            <Text style={tw`text-lg font-bold text-gray-600`}>Votre nom</Text>
            <TextInput
              style={tw`p-4 mt-1 bg-white border border-gray-300 rounded-lg`}
              value={name}
              onChangeText={setName}
              editable={isEditing}
            />
          </View>
          <View style={tw`p-4 mt-2 bg-gray-100 rounded-lg shadow-lg`}>
            <Text style={tw`text-lg font-bold text-gray-600`}>Votre prénom</Text>
            <TextInput
              style={tw`p-4 mt-1 bg-white border border-gray-300 rounded-lg`}
              value={prenom}
              onChangeText={setPrenom}
              editable={isEditing}
            />
          </View>
        </View>

        {/* Contact Info */}
        <Text style={tw`mt-6 text-xl font-bold`}>Coordonnées</Text>
        <View style={tw`p-4 mt-2 bg-gray-100 rounded-lg shadow-lg`}>
          <Text style={tw`text-gray-600`}>Votre localisation</Text>
          <View>
            {/* 3abiha bil localisation */}
          </View>
          <Text style={tw`mt-2 text-gray-600`}>Email <Text style={tw`font-bold text-black`}>{email}</Text></Text>
        </View>

        {/* Edit Button */}
        <TouchableOpacity
  style={tw`items-center py-3 mt-2 ${isEditing ? 'bg-pink-400' : 'bg-black'} rounded-lg`}
  onPress={() => {
    if (isEditing) {
      handleSave(); // Enregistrer les modifications
    } 
    setIsEditing(!isEditing);
  }}
>
  <Text style={tw`text-lg font-bold text-white`}>
    {isEditing ? "Enregistrer" : "Éditer le profil"}
  </Text>
</TouchableOpacity>

      </View>
      <TouchableOpacity
  style={tw`items-center py-3  rounded-lg bg-yellow-500`}
  onPress={goToDeleteAccount} // Appel de la fonction
>
  <Text style={tw`text-lg font-bold text-white`}>Gérer mon compte</Text>
</TouchableOpacity>

    </ScrollView>
  );
};

export default UserProfile;
