import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const Authentication = () => {
  // États pour les champs du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fonction de gestion de la soumission du formulaire
  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    // Logique d'authentification simulée
    if (email === 'user@example.com' && password === 'password123') {
      Alert.alert('Succès', 'Connexion réussie');
      // Rediriger l'utilisateur ou effectuer une action
    } else {
      Alert.alert('Erreur', 'Identifiants incorrects');
    }
  };

  return (
    <View style={tw`items-center justify-center flex-1 p-4 bg-white`}>
      <Text style={tw`mb-6 text-2xl font-bold`}>Se connecter</Text>

      {/* Champ Email */}
      <TextInput
        style={tw`w-full p-3 mb-4 border border-gray-300 rounded`}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Champ Mot de passe */}
      <TextInput
        style={tw`w-full p-3 mb-6 border border-gray-300 rounded`}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Bouton de connexion */}
      <Button title="Se connecter" onPress={handleLogin} />

      {/* Option d'inscription */}
      <Text style={tw`mt-4 text-center`}>
        Pas de compte ? <Text style={tw`text-blue-500`}>S'inscrire</Text>
      </Text>
    </View>
  );
};

export default Authentication;
