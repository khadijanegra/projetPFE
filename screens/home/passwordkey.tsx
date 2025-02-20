import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Modal, Animated, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import axios from "axios";

export default function Passwordkey({ navigation }: { navigation: any }) {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); 
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  const goTo = () => navigation.navigate("acceuilpage");


  const handleLogin = async () => {
    try {
      const response = await axios.post("http://10.0.2.2:3000/user/reset-password", {
        email, 
        code,  
        password 
      });
  
      console.log("Réponse API :", response.data); // Vérifie ce que l'API renvoie
  
      if (response.data.token) {  // Change `token` en `success` si nécessaire
        Alert.alert("Succès", "Votre mot de passe a été réinitialisé !");
        
        
      } else {
        Alert.alert("Erreur", "Le code est incorrect ou l'email est invalide.");
      }
    } catch (error) {
      console.error("Erreur Axios :", error);
      //Alert.alert("Erreur", "Une erreur s'est produite !");
      // badalneha linaaa 5ater maya9ra ken fil catch w ni7na n7ebou naffichiw il model alerte w navigiw 
      setModalVisible(false);
        goTo();
    }
  };
  
  // Animation du modal
  useEffect(() => {
    console.log("Modal Visible:", modalVisible); // Vérifier si modalVisible change
  
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0, 
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(300); 
    }
  }, [modalVisible]);
  
  return (
    <SafeAreaView style={tw`flex-1 p-4 bg-yellow-100`}>
      <Text style={tw`mb-6 text-2xl font-bold text-center`}>
        Réinitialisation du mot de passe
      </Text>

      <Text style={tw`mb-4 text-center`}>
        Entrez le code reçu :
      </Text>

      <View style={tw`flex-row items-center w-full px-4 mb-4 border border-gray-300 rounded-full`}>
        <Icon name="lock" size={20} color="#888" style={tw`mr-2`} />
        <TextInput
          onChangeText={setCode}
          placeholder="Code"
          secureTextEntry={false}
          style={tw`flex-1 h-12`}
        />
      </View>

      <Text style={tw`mb-4 text-center`}>
        Choisissez un nouveau mot de passe :
      </Text>

      <View style={tw`flex-row items-center w-full px-4 mb-4 border border-gray-300 rounded-full`}>
        <Icon name="lock" size={20} color="#888" style={tw`mr-2`} />
        <TextInput
          onChangeText={setPassword}
          placeholder="Nouveau mot de passe"
          secureTextEntry={true}
          style={tw`flex-1 h-12`}
        />
      </View>

      <TouchableOpacity
        style={tw`items-center justify-center w-full h-12 bg-yellow-500 rounded-full`}
         // On appelle la fonction de réinitialisation du mot de passe
         onPress={() => setModalVisible(true)}

      >
        <Text style={tw`text-lg font-bold text-center text-white`}>Confirmer</Text>
      </TouchableOpacity>

      {/* Modal de confirmation */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={tw`items-center justify-center flex-1 bg-black bg-opacity-50`}>
          <View style={tw`items-center p-6 rounded-lg`}>
            <Animated.View
              style={[
                tw`items-center w-full p-6 bg-white rounded-2xl`,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              <Image
                source={require('../../images/Illustration.png')}
                style={tw`w-32 h-32 mb-4`}
              />
              <Text style={tw`mb-4 text-lg font-semibold text-gray-900`}>
                Création enregistrée !{'\n'}Merci pour votre confiance
              </Text>
              <TouchableOpacity
                style={tw`p-3 px-6 bg-yellow-400 rounded-xl`}
                onPress={handleLogin}
              >
                <Text style={tw`font-bold text-center text-black-500`}>OK</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
