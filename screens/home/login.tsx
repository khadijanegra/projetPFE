import { CheckBox } from "@rneui/themed";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

export default function Login({ navigation }: { navigation: any }) {
  const [checked, setChecked] = useState(true);
  const toggleCheckbox = () => setChecked(!checked);
  const go = () => navigation.navigate("Password");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://10.0.2.2:3000/user/signIn", {
        email,
        password,
      });
      console.log("Email:", email, "Password:", password);

      if (response.data.token) {
        Alert.alert("Succès", "Connexion réussie !");
        navigation.navigate("acceuilpage"); 

      }
    } catch (error) {
      Alert.alert("Erreur", "Email ou mot de passe invalide !");
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 p-2 bg-yellow-100`}>
      <View style={tw`items-center justify-center flex-1 px-6`}>
        <Text style={tw`mb-6 text-2xl font-bold`}>Se Connecter</Text>

        {/* Champ Email */}
        <View style={tw`flex-row items-center w-full px-4 mb-4 border border-gray-300 rounded-full`}>
          <Icon name="envelope" size={20} color="#888" style={tw`mr-2`} />
          <TextInput
            placeholder="l'adresse E-mail"
            style={tw`flex-1 h-12`}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Champ Mot de passe */}
        <View style={tw`flex-row items-center w-full px-4 mb-4 border border-gray-300 rounded-full`}>
          <Icon name="lock" size={20} color="#888" style={tw`mr-2`} />
          <TextInput
            placeholder="Password"
            style={tw`flex-1 h-12`}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity onPress={go}>
          <Text style={tw`mb-4 text-center text-blue-500`}>Mot de passe oublié ?</Text>
        </TouchableOpacity>

        {/* Checkbox */}
        <View style={tw`flex-row items-center mb-3 mr-4`}>
          <CheckBox checked={checked} onPress={toggleCheckbox} />
          <Text style={tw`text-gray-700`}>J'accepte la Politique de confidentialité</Text>
        </View>

        {/* Bouton Suivant */}
        <TouchableOpacity
          style={tw`items-center justify-center w-full h-12 max-w-md mb-6 bg-yellow-500 rounded-full`}
          onPress={handleLogin}
        >
          <Text style={tw`text-lg font-bold text-white`}>Se Connecter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
