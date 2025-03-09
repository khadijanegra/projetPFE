import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Modal,
  Animated,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
const apiUrl = process.env.API_URL;


const Reviewform = (props: any) => {
  const [note_service, setRatingservice] = useState(0);
  const [note_ambiance, setRatingambiance] = useState(0);
  const [note_cuisine, setRatingcuisine] = useState(0);
  const [review_id, setReview_id] = useState("");
  const [commentaire, setReview] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [user_id , setuser_id]= useState("")
  const [ shop_id , setshop_id] = useState("")

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  };

  const handleSubmit = async () => {
    const ReviewDtata = {
      note_service: note_service,
      note_ambiance: note_ambiance,
      note_cuisine: note_cuisine,
      commentaire: commentaire,
      user_id: props.route.params.user_id, 
      shop_id: props.route.params.shop_id,
    };
    
    try {
      const response = await axios.post(`${apiUrl}/review/postreviews`,ReviewDtata);
      if (response.status === 201) {
        const review_id = response.data.id;
        setReview_id(review_id);
        console.log(props.route.params.user_id
          
        )
        setModalVisible(true);
        return true;
      } else {
        Alert.alert("Erreur lors de la création de votre Review");
        return false;
      }
    } catch (error) {
      Alert.alert("Erreur lors de la connexion");
      return false;
    }
  };
  const [modalVisible, setModalVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(300)).current; // Position initiale en bas
  
    useEffect(() => {
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
  
const gotoacceuilpage =() =>{
props.navigation.navigate("acceuilpage")
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
            <Text style={tw`mt-2 text-lg font-bold text-gray-700`}>
              Service
            </Text>
          </View>

          {/* Étoiles de notation */}
          <View style={tw`flex-row justify-center mb-4`}>
            {[1, 2, 3, 4, 5].map((num) => (
              <TouchableOpacity key={num} onPress={() => setRatingservice(num)}>
                <FontAwesome
                  name={num <= note_service ? "star" : "star-o"}
                  size={35}
                  color={num <= note_service ? "#FFD700" : "gray"}
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
            <Text style={tw`mt-2 text-lg font-bold text-gray-700`}>
              Ambiance
            </Text>
          </View>

          {/* Étoiles de notation */}
          <View style={tw`flex-row justify-center`}>
            {[1, 2, 3, 4, 5].map((num) => (
              <TouchableOpacity
                key={num}
                onPress={() => setRatingambiance(num)}
              >
                <FontAwesome
                  name={num <= note_ambiance ? "star" : "star-o"}
                  size={35}
                  color={num <= note_ambiance ? "#FFD700" : "gray"}
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
            <Text style={tw`mt-2 text-lg font-bold text-gray-700`}>
              Cuisine
            </Text>
          </View>

          {/* Étoiles de notation */}
          <View style={tw`flex-row justify-center`}>
            {[1, 2, 3, 4, 5].map((num) => (
              <TouchableOpacity key={num} onPress={() => setRatingcuisine(num)}>
                <FontAwesome
                  name={num <= note_cuisine ? "star" : "star-o"}
                  size={35}
                  color={num <= note_cuisine ? "#FFD700" : "gray"}
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
              value={commentaire}
              onChangeText={setReview}
              multiline
            />
            <TouchableOpacity
              style={tw`absolute top-3 right-3`}
              onPress={pickImage}
            >
              <FontAwesome name="camera" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          {/* Affichage de l'image uploadée */}
          {image && (
            <Image
              source={{ uri: image }}
              style={tw`w-full h-40 mt-4 rounded-lg`}
            />
          )}

          {/* Bouton d'envoi */}

          <TouchableOpacity onPress={handleSubmit} >
          <Text
            style={tw`p-4 text-lg font-bold text-center text-white bg-red-300 rounded-full mt-8`}
          >
            Envoyer
          </Text>
        </TouchableOpacity>

          <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View
            style={tw`items-center justify-end flex-1 bg-black bg-opacity-50`}
          >
            <Animated.View
              style={[
                tw`items-center w-full p-8 bg-white rounded-t-3xl`,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              <Image
                source={require("../../images/Illustration.png")}
                style={tw`w-40 h-40 mb-4 rounded-full`}
              />
              <Text style={tw`mb-2 text-2xl font-bold text-gray-900`}>
                Félicitations !
              </Text>
              <Text style={tw`mb-6 text-center text-gray-600`}>
                Votre avis a été créé avec succès !
              </Text>
              <TouchableOpacity
                style={tw`px-12 py-4 bg-yellow-400 rounded-full`}
                onPress={gotoacceuilpage}
              >
                <Text style={tw`text-xl font-bold text-white`}>Confirmer</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
        </View>
      </View>
    </ScrollView>
  );
};
//gigigigigigigi
export default Reviewform;
