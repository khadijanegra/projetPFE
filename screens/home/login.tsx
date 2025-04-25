import { CheckBox } from "@rneui/themed";
import React, { useEffect, useState }  from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
const  API_URL  = process.env.API_URL;

export default function Login(props : any) {
  const [checked, setChecked] = useState(true);
  const toggleCheckbox = () => setChecked(!checked);
  const go = () => props.navigation.navigate("Password");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState('');
  //Dans LoginPage, on utilise setId et useEffect parce que l’ID vient de l’API et on veut le stocker avant la navigation. !!! 
// pour suivre les changement des id 
  useEffect(() => {
    console.log("ID mis à jour:", id);
  }, [id]);
  
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/user/signIn`, {
        email,
        password,
      });
  
      console.log("Email:", email, "Password:", password, "id", response.data.id);
  
      if (response.data.token) {
        Alert.alert("Succès", "Connexion réussie !");
        
        setTimeout(() => {
          setId(response.data.id);
          console.log("Navigating with ID:", response.data.id);
          props.navigation.navigate("acceuilpage", { id: response.data.id });
        }, 1000); // Attendre 1 seconde pour être sûr que l'alerte s'affiche
      }
    } catch (error) {
      console.log("Erreur de connexion:", error);
      Alert.alert("Erreur", "Email ou mot de passe invalide !");
    }
  };
  
  

  return (
    <SafeAreaView style={tw`flex-1 p-2 bg-white`}>
      <ScrollView>
      <Image 
          source={require("../../images/signup.png")} // Assurez-vous que le chemin de l'image est correct
          style={tw`w-30 h-30 mb-6 ml-8 `} 
        />
      <View style={tw`items-center justify-center flex-1 px-6`}>
        <Text style={tw`mb-6 text-2xl font-bold`}>𝐒𝐞 𝐂𝐨𝐧𝐧𝐞𝐜𝐭𝐞𝐫</Text>

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
          <Text style={tw`mb-4 text-center text-blue-500`}>𝑀𝑜𝑡 𝑑𝑒 𝑝𝑎𝑠𝑠𝑒 𝑜𝑢𝑏𝑙𝑖𝑒́ ?</Text>
        </TouchableOpacity>

        {/* Checkbox */}
        <View style={tw`flex-row items-center mb-3 mr-4`}>
          <CheckBox checked={checked} onPress={toggleCheckbox} />
          <Text style={tw`text-gray-700`}>𝗝'𝗮𝗰𝗰𝗲𝗽𝘁𝗲 𝗹𝗮 𝗣𝗼𝗹𝗶𝘁𝗶𝗾𝘂𝗲 𝗱𝗲 𝗰𝗼𝗻𝗳𝗶𝗱𝗲𝗻𝘁𝗶𝗮𝗹𝗶𝘁𝗲́</Text>
        </View>

        {/* Bouton Suivant */}
        <TouchableOpacity
          style={tw`items-center justify-center w-full h-12 max-w-md mb-6 bg-black rounded-full`}
          onPress={handleLogin}
        >
          <Text style={tw`text-lg font-bold text-white`}>𝗦𝗲 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝙧</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
