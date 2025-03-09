import { CheckBox } from "@rneui/themed";
import React, { useEffect, useState }  from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
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
      console.log("Email:", email, "Password:", password , "id", response.data.id);
      //setId(response.data.id);  
      if (response.data.token) {
        // setid => pour mettre a jours l'id apres une appel mte3 il API 
        setId(response.data.id); 
  
        // Attendre la mise à jour de l'état avant de naviguer
        setTimeout(() => {
          console.log("Navigating with ID:", response.data.id); 
          // linaa il ID jey mil API bidhaa ya3nii ba3ed ma 3ammer il formulaire chyit5la9 il ID mil API bidhaa : heka 3lech sta3malnaa  response.data.id ya3nii mawjoud fi response mte3 il API bidhaa 
          props.navigation.navigate("acceuilpage", { id: response.data.id });
          // pour passe l'ID lil page illi ba3edha 
        }, 100); 
      }
    } catch (error) {
      Alert.alert("Erreur", "Email ou mot de passe invalide !");
    }
  };
  

  return (
    <SafeAreaView style={tw`flex-1 p-2 bg-white`}>
      <Image 
          source={require("../../images/signup.png")} // Assurez-vous que le chemin de l'image est correct
          style={tw`w-30 h-30 mb-6 ml-8 `} 
        />
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
          style={tw`items-center justify-center w-full h-12 max-w-md mb-6 bg-black rounded-full`}
          onPress={handleLogin}
        >
          <Text style={tw`text-lg font-bold text-white`}>Se Connecter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
