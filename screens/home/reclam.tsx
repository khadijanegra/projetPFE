import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

const apiUrl = process.env.API_URL;

const Reclam = () => {
  const [rating, setRating] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [comment, setComment] = useState("");

  const options = [
    "Service général",
    "Rapidité et efficacité",
    "Site Web & App mobile",
    "Support client",
    "Sécurité",
    "Transparence",
    "Autre",
  ];

  const toggleOption = (choice: string) => {
    if (!choice) return;
    if (selectedOptions.includes(choice)) {
      setSelectedOptions(selectedOptions.filter((opt) => opt !== choice));
    } else {
      setSelectedOptions([...selectedOptions, choice]);
    }
  };

  const handleSend = async () => {
    try {
      const data = {
        rating,
        selectedOptions,
        comment,
      };
      const response = await axios.post(`${apiUrl}/user/send-reclamation`, data);
      console.log(response.data);
      alert('Réclamation envoyée avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la réclamation :', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <ScrollView contentContainerStyle={tw`flex-grow p-6 bg-gray-50`}>
      {/* Titre */}
      <View style={tw`mb-8`}>
        <Text style={tw`text-3xl font-bold text-center text-indigo-800 mb-2`}>
          Dites-nous ce que vous pensez
        </Text>
        <Text style={tw`text-center text-gray-600`}>
          Votre avis nous aide à améliorer notre service
        </Text>
      </View>

      {/* Notation */}
      <View style={tw`bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100`}>
        <Text style={tw`text-lg font-medium text-gray-800 text-center mb-4`}>
          Comment évalueriez-vous votre expérience ?
        </Text>
        <View style={tw`flex-row justify-center`}>
          {[1, 2, 3, 4, 5].map((num) => (
            <TouchableOpacity 
              key={num} 
              onPress={() => setRating(num)}
              activeOpacity={0.7}
            >
              <FontAwesome
                name={num <= rating ? "star" : "star-o"}
                size={36}
                color={num <= rating ? "#FFD700" : "#CBD5E0"}
                style={tw`mx-2`}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={tw`text-center text-gray-500 mt-2`}>
          {rating > 0 ? `Vous avez donné ${rating} étoile${rating > 1 ? 's' : ''}` : ''}
        </Text>
      </View>

      {/* Options d'amélioration */}
      <View style={tw`bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100`}>
        <Text style={tw`text-lg font-medium text-gray-800 text-center mb-4`}>
          Que devrions-nous améliorer ?
        </Text>
        <View style={tw`flex-row flex-wrap justify-center`}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                tw`px-4 py-3 m-2 rounded-lg`,
                selectedOptions.includes(option)
                  ? tw`bg-indigo-600`
                  : tw`bg-gray-100 border border-gray-200`,
              ]}
              onPress={() => toggleOption(option)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  tw`text-sm font-medium`,
                  selectedOptions.includes(option) 
                    ? tw`text-white` 
                    : tw`text-gray-700`,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Champ de texte */}
      <View style={tw`bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100`}>
        <Text style={tw`text-lg font-medium text-gray-800 mb-4`}>
          Dites-nous en plus
        </Text>
        <TextInput
          style={tw`border-2 border-gray-200 rounded-lg p-4 text-gray-700 h-32 bg-gray-50`}
          placeholder="Écrivez vos suggestions ici..."
          placeholderTextColor="#A0AEC0"
          multiline
          textAlignVertical="top"
          value={comment}
          onChangeText={setComment}
        />
      </View>

      {/* Bouton Envoyer */}
      <TouchableOpacity
        style={tw`bg-indigo-600 p-5 rounded-xl shadow-md`}
        onPress={handleSend}
        activeOpacity={0.8}
      >
        <Text style={tw`text-white text-lg font-bold text-center`}>
          Envoyer votre feedback
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Reclam;