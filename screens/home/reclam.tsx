import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import { FontAwesome } from "@expo/vector-icons";

const Reclam = () => {
  const [rating, setRating] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [comment, setComment] = useState("");

  const options = [
    "Service général",
    "Rapidité et efficacité",
    "Support client",
    "Site Web & App mobile",
    "Sécurité",
    "Transparence",
    "Autre",
  ];

  

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

  
  
  
  const handleSend = () => {
    console.log("Note :", rating);
    console.log("Améliorations :", selectedOptions);
    console.log("Commentaire :", comment);
  };

  return (
    <ScrollView>
    <ScrollView contentContainerStyle={tw`flex-1 p-6 bg-white`}>
      {/* Titre */}
      <Text style={tw`text-2xl font-bold text-pink-700 text-center mb-4`}>
        Dites-nous ce que vous pensez
      </Text>

      {/* Notation */}
      <View style={tw`bg-pink-100 p-6 rounded-lg mb-4`}>
        <Text style={tw`text-lg font-semibold text-center mb-2`}>
          Comment évalueriez-vous votre expérience ?
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
        <Text style={tw`text-lg font-semibold text-center mb-2`}>
          Que devrions-nous améliorer ?
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
          Dites-nous en plus
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
