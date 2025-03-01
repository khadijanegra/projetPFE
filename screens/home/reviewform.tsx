import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image ,ScrollView} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import * as ImagePicker from 'expo-image-picker';

const Reviewform = () => {
  const [ratingservice, setRatingservice] = useState(0);
  const [ratingambiance, setRatingambiance] = useState(0);
  const [ratingcuisine, setRatingcuisine] = useState(0);

  const [review, setReview] = useState("");
  const [image, setImage] = useState<string | null>(null);
  
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  }
  return (
    <ScrollView>
    <View style={tw`flex-1 p-5 bg-white`}> 
      <Text style={tw`mb-4 text-lg text-gray-800 mr-15`}>
    Dites-nous ce que vous en pensez   
      </Text>
      
      <View style={tw`items-center w-11/12 p-5 mx-auto mb-4 rounded-lg `}>
      {/* Image et titre */}
      <View style={tw`items-center mb-3`}>
        <Image
          source={require("../../images/service.png")}
          style={tw`w-24 h-24 border-4 border-gray-200 rounded-3xl`}
        />
        <Text style={tw`mt-2 text-lg font-bold text-gray-700`}>Service</Text>
      </View>

      {/* Étoiles de notation */}
      <View style={tw`flex-row justify-center mb-4`}>
        {[1, 2, 3, 4, 5].map((num) => (
          <TouchableOpacity key={num} onPress={() => setRatingservice(num)}>
            <FontAwesome
              name={num <= ratingservice ? "star" : "star-o"}
              size={35}
              color={num <= ratingservice ? "#FFD700" : "gray"}
              style={tw`mx-2`}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
    <View style={tw`items-center w-11/12 p-5 mx-auto rounded-lg `}>
      {/* Image et titre */}
      <View style={tw`items-center mb-3`}>
        <Image
          source={require("../../images/ambiance.png")}
          style={tw`w-24 h-24 border-2 border-gray-200 rounded-3xl`}
        />
        <Text style={tw`mt-2 text-lg font-bold text-gray-700`}>Ambiance</Text>
      </View>

      {/* Étoiles de notation */}
      <View style={tw`flex-row justify-center`}>
        {[1, 2, 3, 4, 5].map((num) => (
          <TouchableOpacity key={num} onPress={() => setRatingambiance(num)}>
            <FontAwesome
              name={num <= ratingambiance ? "star" : "star-o"}
              size={35}
              color={num <= ratingambiance ? "#FFD700" : "gray"}
              style={tw`mx-2`}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
    <View style={tw`items-center w-11/12 p-5 mx-auto rounded-lg `}>
      {/* Image et titre */}
      <View style={tw`items-center mb-3`}>
        <Image
          source={require("../../images/cuisine.png")}
          style={tw`w-24 h-24 border-2 border-gray-200 rounded-3xl`}
        />
        <Text style={tw`mt-2 text-lg font-bold text-gray-700`}>Cuisine</Text>
      </View>

      {/* Étoiles de notation */}
      <View style={tw`flex-row justify-center`}>
        {[1, 2, 3, 4, 5].map((num) => (
          <TouchableOpacity key={num} onPress={() => setRatingcuisine(num)}>
            <FontAwesome
              name={num <= ratingcuisine ? "star" : "star-o"}
              size={35}
              color={num <= ratingcuisine ? "#FFD700" : "gray"}
              style={tw`mx-2`}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
    <View style={tw`w-11/12 p-5 mx-auto bg-white rounded-lg`}>
      {/* Champ de texte avec placeholder en haut et icône */}
      <View style={tw`relative p-4 border border-gray-300 rounded-lg`}>
        <Text style={tw`absolute text-lg text-gray-500 top-2 left-4`}>
          Votre avis
        </Text>
        <TextInput
          style={tw`pt-6 text-base text-gray-800 h-28`}
          placeholderTextColor="gray"
          value={review}
          onChangeText={setReview}
          multiline
        />
        <TouchableOpacity style={tw`absolute top-3 right-3`}
            onPress={pickImage}
        >
          <FontAwesome name="camera" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Affichage de l'image uploadée */}
      {image && <Image source={{ uri: image }} style={tw`w-full h-40 mt-4 rounded-lg`} />}

      {/* Bouton d'envoi */}
      <TouchableOpacity style={tw`p-4 mt-5 bg-red-400 rounded-full`}>
        <Text style={tw`text-lg font-bold text-center text-white`}>Soumettre</Text>
      </TouchableOpacity>
    </View>
    </View>
    </ScrollView>
  );
};

export default Reviewform;
