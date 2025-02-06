import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import axios from 'axios';  // Importation d'axios
import { RollInLeft } from 'react-native-reanimated';

export default function Creation() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [genre, setGenre] = useState('');
  const [role, setrole] = useState('');

  const handleSubmit = async () => {
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
      const response = await axios.post('http://192.168.1.63:5000/api/signup', userData);

      // Vérifier si la réponse est réussie
      if (response.status === 201) {
        Alert.alert('Succès', 'Utilisateur créé avec succès');
      } else {
        Alert.alert('Erreur', 'Une erreur est survenue');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission :', error);
      Alert.alert('Erreur', 'Problème de connexion au serveur');
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-200 `}>
      <View style={tw`items-center justify-center flex-1 px-6 `}>
        <Text style={tw`mb-6 text-2xl font-bold`}>S'inscrire </Text>

        {/* Nom */}
        <TextInput
          value={nom}
          onChangeText={setNom}
          placeholder="Nom"
          style={tw`w-full h-12 px-4 mb-4 border border-gray-300 rounded-full`}
        />

        {/* Prénom */}
        <TextInput
          value={prenom}
          onChangeText={setPrenom}
          placeholder="Prénom"
          style={tw`w-full h-12 px-4 mb-4 border border-gray-300 rounded-full`}
        />

        {/* Email */}
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email address"
          style={tw`w-full h-12 px-4 mb-4 border border-gray-300 rounded-full`}
        />

        {/* Password */}
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={tw`w-full h-12 px-4 mb-4 border border-gray-300 rounded-full`}
        />

        {/* Localisation */}
        <TextInput
          value={localisation}
          onChangeText={setLocalisation}
          placeholder="Localisation (Ville)"
          style={tw`w-full h-12 px-4 mb-4 border border-gray-300 rounded-full`}
        />

        {/* Genre */}
        <View style={tw`flex-row items-center px-4 mb-4 `}>
          <Text style={tw`mr-4`}>Genre :</Text>

          {/* Homme Radio Button */}
          <TouchableOpacity
            style={tw`flex-row items-center mr-4`}
            onPress={() => setGenre('homme')}>
            <View
              style={tw`w-5 h-5 border-2 border-gray-300 rounded-full ${
                genre === 'homme' ? 'bg-blue-500' : ''
              }`}
            />
            <Text style={tw`ml-2`}>Homme</Text>
          </TouchableOpacity>

          {/* Femme Radio Button */}
          <TouchableOpacity
            style={tw`flex-row items-center`}
            onPress={() => setGenre('femme')}>
            <View
              style={tw`w-5 h-5 border-2 border-gray-300 rounded-full ${
                genre === 'femme' ? 'bg-pink-500' : ''
              }`}
            />
            <Text style={tw`ml-2`}>Femme</Text>
          </TouchableOpacity>
        </View>

        {/* Button Create Account */}
        <TouchableOpacity
          onPress={handleSubmit}
          style={tw`items-center justify-center w-full h-12 mt-2 mb-6 bg-yellow-500 rounded-full`}>
          <Text style={tw`text-lg font-bold text-white`}>Créer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
