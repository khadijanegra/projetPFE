import React, { useState, useCallback } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const UserProfile = (props: any) => {
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState(""); // Correcte l'état pour prénom
  const [email, setEmail] = useState("");
  
  const [isEditing, setIsEditing] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:3000/user/users/${props.route.params.id}`);
  
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
   
  return (
    <ScrollView style={tw`flex-1 bg-yellow-100`} contentContainerStyle={tw`p-4`}>
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
          style={tw`items-center py-3 mt-6 ${isEditing ? 'bg-pink-400' : 'bg-yellow-500'} rounded-lg`}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Text style={tw`text-lg font-bold text-white`}>
            {isEditing ? "Enregistrer" : "Éditer le profil"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserProfile;
