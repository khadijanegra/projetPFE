import React, { useState, useCallback } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

// ✅ Déclaration du type Avatar
type AvatarType = 'homme' | 'femme' | 'neutre';

const UserProfile = (props: any) => {
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarType>("homme");
  const apiUrl = process.env.API_URL;
  const [isEditing, setIsEditing] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/users/${props.route.params.id}`);
      const userData = response.data;
      setName(userData.nom);
      setPrenom(userData.prenom);
      setEmail(userData.email);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [props.route.params.id]);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [fetchUserData])
  );

  const avatars: Record<AvatarType, any> = {
    homme: require('../../images/homme.jpg'),
    femme: require('../../images/OIP2.jpg'),
    
    
  };

  const handleSave = async () => {
    try {
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
    <ScrollView style={tw`flex-1 bg-red-50`} contentContainerStyle={tw`pb-8`}>
      <View style={tw`items-center py-6 bg-red-100 rounded-b-3xl shadow-md`}>
        <View style={tw`bg-white p-1 rounded-full shadow-lg`}>
          <Image
            source={avatars[selectedAvatar]}
            style={tw`w-32 h-32 rounded-full border-4 border-red-200`}
          />
        </View>

        {isEditing && (
          <View style={tw`flex-row mt-4`}>
            <TouchableOpacity
              style={tw`mx-2 ${selectedAvatar === 'homme' ? 'border-2 border-red-500 rounded-full' : ''}`}
              onPress={() => setSelectedAvatar('homme')}
            >
              <Image source={avatars.homme} style={tw`w-12 h-12 rounded-full`} />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`mx-2 ${selectedAvatar === 'femme' ? 'border-2 border-red-500 rounded-full' : ''}`}
              onPress={() => setSelectedAvatar('femme')}
            >
              <Image source={avatars.femme} style={tw`w-12 h-12 rounded-full`} />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`mx-2 ${selectedAvatar === 'neutre' ? 'border-2 border-red-500 rounded-full' : ''}`}
              onPress={() => setSelectedAvatar('neutre')}
            >
              <Image source={avatars.neutre} style={tw`w-12 h-12 rounded-full`} />
            </TouchableOpacity>
          </View>
        )}

        <Text style={tw`mt-4 text-xl font-bold text-gray-800`}>
          {name} {prenom}
        </Text>
        <Text style={tw`text-gray-600`}>{email}</Text>
      </View>

      {/* Informations personnelles */}
      <View style={tw`px-5 mt-6`}>
        <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>Informations Personnelles</Text>

        {/* Nom */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-gray-600 font-medium mb-1 ml-1`}>Nom</Text>
          <View style={tw`bg-white rounded-xl shadow-sm p-1`}>
            <TextInput
              style={tw`p-4 text-gray-800 ${!isEditing ? 'opacity-80' : ''}`}
              value={name}
              onChangeText={setName}
              editable={isEditing}
              placeholder="Votre nom"
            />
          </View>
        </View>

        {/* Prénom */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-gray-600 font-medium mb-1 ml-1`}>Prénom</Text>
          <View style={tw`bg-white rounded-xl shadow-sm p-1`}>
            <TextInput
              style={tw`p-4 text-gray-800 ${!isEditing ? 'opacity-80' : ''}`}
              value={prenom}
              onChangeText={setPrenom}
              editable={isEditing}
              placeholder="Votre prénom"
            />
          </View>
        </View>
      </View>

      {/* Coordonnées */}
      <View style={tw`px-5 mt-2`}>
        <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>Coordonnées</Text>
        <View style={tw`bg-white rounded-xl p-5 shadow-sm`}>
          <View style={tw`mb-4`}>
            <Text style={tw`text-gray-600 font-medium mb-1`}>Localisation</Text>
            <Text style={tw`text-gray-400 italic`}>Fonctionnalité à venir</Text>
          </View>
          <View>
            <Text style={tw`text-gray-600 font-medium mb-1`}>Email</Text>
            <Text style={tw`text-gray-800`}>{email}</Text>
          </View>
        </View>
      </View>

      {/* Boutons d'action */}
      <View style={tw`px-5 mt-8`}>
        <TouchableOpacity
          style={tw`py-4 rounded-xl ${isEditing ? 'bg-pink-500' : 'bg-black'} shadow-lg mb-4`}
          onPress={() => {
            if (isEditing) handleSave();
            setIsEditing(!isEditing);
          }}
        >
          <Text style={tw`text-center text-white font-bold text-lg`}>
            {isEditing ? "Enregistrer les modifications" : "Modifier mon profil"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`py-4 rounded-xl bg-yellow-500 shadow-lg`}
          onPress={goToDeleteAccount}
        >
          <Text style={tw`text-center text-white font-bold text-lg`}>
            Gérer mon compte
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserProfile;
