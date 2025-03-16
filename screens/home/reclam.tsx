import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { useFonts } from "expo-font";
const  API_URL  = process.env.API_URL;
const Reclam = () => {
  const [rating, setRating] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [comment, setComment] = useState("");

  const options = [
    "𝚂𝚎𝚛𝚟𝚒𝚌𝚎 𝚐𝚎́𝚗𝚎𝚛𝚊𝚕?",
    "𝑅𝑎𝑝𝑖𝑑𝑖𝑡𝑒́ 𝑒𝑡 𝑒𝑓𝑓𝑖𝑐𝑎𝑐𝑖𝑡𝑒́",
    "𝘚𝘪𝘵𝘦 𝘞𝘦𝘣 & 𝘈𝘱𝘱 𝘮𝘰𝘣𝘪𝘭𝘦",
    "𝘚𝘶𝘱𝘱𝘰𝘳𝘵 𝘤𝘭𝘪𝘦𝘯𝘵",
    
    "𝘚𝘦́𝘤𝘶𝘳𝘪𝘵𝘦́",
    "𝘛𝘳𝘢𝘯𝘴𝘱𝘢𝘳𝘦𝘯𝘤𝘦",
    "𝘈𝘶𝘵𝘳𝘦",
  ];

  
  const [fontsLoaded] = useFonts({
    'Roboto-Bold': require('../../assets/Roboto-Bold.ttf'),
    'Lobster-Regular': require('../../assets/Lobster-Regular.otf'),
  });
  
  
const toggleOption = (choice: string) => {
  console.log("Option cliquée :", choice);

  if (!choice) {
    console.error("ERREUR : choice est undefined !");
    return;
  }

  if (selectedOptions.includes(choice)) {
    setSelectedOptions(selectedOptions.filter((opt) => opt !== choice));
  } else {
    setSelectedOptions([...selectedOptions, choice]);
  }
};

  
  
  
const API_URL = process.env.API_URL;

const handleSend = async () => {
  try {
    // Construire les données à envoyer
    const data = {
      rating, // La note (de 1 à 5)
      selectedOptions, // Les options sélectionnées
      comment, // Le commentaire
    };

    // Envoi des données à l'API du backend
    const response = await axios.post(`${API_URL}/user/send-reclamation`,data);

    // Afficher la réponse de l'API (facultatif, pour débogage)
    console.log(response.data);

    // Tu peux ajouter ici un message de confirmation, ou une redirection, etc.
    alert('Réclamation envoyée avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la réclamation :', error);
    alert('Une erreur est survenue. Veuillez réessayer.');
  }
};

  return (
    <ScrollView>
    <ScrollView contentContainerStyle={tw`flex-1 p-6 bg-white`}>
      {/* Titre */}
      <Text style={[tw`text-3xl text-pink-800 text-center mb-4`, 
  { fontFamily: 'Lobster-Regular', fontStyle: 'italic',opacity: 0.5 }]}>
  𝐃𝐢𝐭𝐞𝐬-𝐧𝐨𝐮𝐬 𝐜𝐞 𝐪𝐮𝐞 𝐯𝐨𝐮𝐬 𝐩𝐞𝐧𝐬𝐞𝐳 
</Text>



      {/* Notation */}
      <View style={tw`bg-pink-100 p-6 rounded-lg mb-4`}>
      <Text
  style={[
    tw`text-sm font-bold text-black text-center mb-2`,
    {
      textShadowColor: "#000",  // couleur de l'ombre
      textShadowOffset: { width: 3, height: 8},  // position de l'ombre
      textShadowRadius: 12,  // flou de l'ombre
    }
  ]}
>
𝑐𝑜𝑚𝑚𝑒𝑛𝑡 𝐸𝑣𝑎𝑙𝑢𝑒𝑟𝑖𝑒𝑧-𝑣𝑜𝑢𝑠 𝑣𝑜𝑡𝑟𝑒 𝑒𝑥𝑝𝑒́𝑟𝑖𝑒𝑛𝑐𝑒?
        </Text>
        <View style={tw`flex-row justify-center`}>
          {[1, 2, 3, 4, 5].map((num) => (
            <TouchableOpacity key={num} onPress={() => setRating(num)}>
              <FontAwesome
                name="heart"
                size={32}
                color={num <= rating ? "pink" : "gray"}
                style={tw`mx-1`}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Options d'amélioration */}
      <View style={tw`bg-pink-100 p-6 rounded-lg mb-4`}>
      <Text
  style={[
    tw`text-sm  text-black text-center font-serif  mb-2`,
    {
      textShadowColor: "#000",  // couleur de l'ombre
      textShadowOffset: { width: 3, height: 8},  // position de l'ombre
      textShadowRadius: 12,  // flou de l'ombre
    }
  ]}
>
𝘘𝘶𝘦 𝘥𝘦𝘷𝘳𝘪𝘰𝘯𝘴 𝘯𝘰𝘶𝘴 𝘢𝘮𝘦́𝘭𝘪𝘰𝘳𝘦𝘳?
        </Text>
        <View style={tw`flex-row flex-wrap justify-center`}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                tw`px-3 py-2 m-1 rounded-full border-2`,
                selectedOptions.includes(option)
                  ? tw`bg-pink-500 border-pink-500`
                  : tw`border-pink-500`,
              ]}
              onPress={() => toggleOption(option)}
            >
              <Text
                style={[
                  tw`text-sm`,
                  selectedOptions.includes(option) ? tw`text-white` : tw`text-pink-500`,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>


      {/* Champ de texte */}
      <View style={tw`bg-pink-100 p-6 rounded-lg mb-4`}>
        <Text style={tw`text-lg font-semibold mb-2`}>
        𝑫𝒊𝒕𝒆𝒔-𝒏𝒐𝒖𝒔 𝒆𝒏 𝒑𝒍𝒖𝒔
        </Text>
        <TextInput
          style={tw`border-2 border-pink-400 rounded-lg p-4 text-pink-700`}
          placeholder="Écrivez ici..."
          placeholderTextColor="gray"
          multiline
          value={comment}
          onChangeText={setComment}
        />
      </View>

      {/* Bouton Envoyer */}
      <TouchableOpacity
        style={tw`bg-pink-800 p-4 rounded-full`}
        onPress={handleSend}
      >
        <Text style={tw`text-white text-lg font-bold text-center`}>Envoyer</Text>
      </TouchableOpacity>
    </ScrollView>
    </ScrollView>
  );
};


export default Reclam;
