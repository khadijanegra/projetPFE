import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Animated,
  Alert,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import axios from "axios";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const formshop = ( props : any) => {
 
  
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current; // Position initiale en bas

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0, // Position finale (zéro signifie en haut)
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(300); // Réinitialiser avant la prochaine ouverture
    }
  }, [modalVisible]);

  // État pour les champs du formulaire
  const [shop_nom, setShopNom] = useState("");
  const [shop_desc, setShopDesc] = useState("");
  const [shop_local, setShopLocal] = useState("");
  const [shop_date_ouv, setShopDateOuv] = useState("");
  const [shop_date_ferm, setShopDateFrem] = useState("");
  const [user_id, setUserId] = useState("");
  const [phone, setPhone] = useState("");
  const [menuImage, setMenuImage] = useState(null);
  const [shopId, setShopId] = useState(null);

  const handleImageUpload = () => {
    // Logique pour sélectionner une image depuis la galerie
  };

  // Soumettre le formulaire
  const handlesubmit = async () => {
    const shopdata = {
      shop_nom,
      phone,
      shop_desc,
      shop_local,
      shop_date_ouv,
      shop_date_ferm,
      user_id : props.route.params.id
    };
    try {
      const response = await axios.post(
        "http://10.0.2.2:3000/shops/",
        shopdata
      );
      if (response.status === 201) {
        console.log("Réponse complète:", JSON.stringify(response, null, 2));
        const shopId = response.data.id;
       setShopId(shopId);  // Stocke l'ID du shop créé
        console.log("*******"+ " => "+ shopId);
        Alert.alert("Shop créé avec succès");
        console.log("shop a etait cree avce succee dont l'utilisateur est "+ shopdata.user_id)
        setModalVisible(true); // Afficher le modal de confirmation
        return true;
      } else {
        Alert.alert("Erreur lors de la création de votre Shop");
        console.log("erreur dans la creation de shop ")
        return false;
      }
    } catch (error) {
      Alert.alert("Erreur lors de la connexion");
      return false;
    }
  };
  const goToo = () => {
    setModalVisible(false);
    if (shopId) {
      //props.navigation.navigate("profileshop", { shopId });  // Passe l'ID du shop créé à la page suivante
    }
  };

  return (
    <ScrollView style={tw`bg-red-100`} contentContainerStyle={tw`p-4`}>
      <LinearGradient
        colors={["#F8FAFC", "#F1F5F9"]}
        style={tw`flex-1 p-6 shadow-lg rounded-3xl`}
      >
        {/* En-tête */}
        <View style={tw`items-center mb-8`}>
          <Text style={tw`text-3xl font-bold text-black-500`}>
            Créez votre Shop
          </Text>
          <Text style={tw`mt-2 text-gray-600`}>
            Rejoignez notre communauté de professionnels
          </Text>
        </View>

        {/* Section Informations de base */}
        <View style={tw`mb-8`}>
          <Text style={tw`mb-4 text-xl font-bold text-black-500`}>
            Informations principales
          </Text>

          {/* Nom avec icône */}
          <View
            style={tw`flex-row items-center p-3 mb-4 bg-white shadow-sm rounded-xl`}
          >
            <Ionicons
              name="business"
              size={20}
              color="#212121"
              style={tw`mr-3`}
            />
            <TextInput
              style={tw`flex-1 text-gray-700`}
              placeholder="Nom de l'établissement"
              value={shop_nom}
              onChangeText={setShopNom}
            />
          </View>

          {/* Téléphone avec icône */}
          <View
            style={tw`flex-row items-center p-3 mb-4 bg-white shadow-sm rounded-xl`}
          >
            <FontAwesome
              name="phone"
              size={20}
              color="#212121"
              style={tw`mr-3`}
            />
            <TextInput
              style={tw`flex-1 text-gray-700`}
              placeholder="Numéro de téléphone"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {/* Description */}
          <View style={tw`p-3 bg-white shadow-sm rounded-xl`}>
            <TextInput
              style={tw`h-32 text-gray-700`}
              multiline
              placeholder="Description détaillée..."
              value={shop_desc}
              onChangeText={setShopDesc}
            />
          </View>
        </View>

        {/* Section Localisation */}
        <View style={tw`mb-8`}>
          <Text style={tw`mb-4 text-xl font-bold text-black-500`}>
            Localisation
          </Text>
          <View
            style={tw`flex-row items-center p-3 bg-white shadow-sm rounded-xl`}
          >
            <Ionicons
              name="location-sharp"
              size={20}
              color="#212121"
              style={tw`mr-3`}
            />
            <TextInput
              style={tw`flex-1 text-gray-700`}
              placeholder="URL de localisation Google Maps"
              value={shop_local}
              onChangeText={setShopLocal}
            />
          </View>
        </View>

        {/* Section Horaires */}
        <View style={tw`mb-8`}>
          <Text style={tw`mb-4 text-xl font-bold text-black-500`}>
            Horaires d'ouverture
          </Text>
          <View style={tw`flex-row justify-between`}>
            <View style={tw`w-1/2 pr-2`}>
              <View style={tw`p-3 bg-white shadow-sm rounded-xl`}>
                <Text style={tw`mb-1 text-xs text-gray-500`}>Ouverture</Text>
                <TextInput
                  style={tw`text-gray-700`}
                  placeholder="JJ/MM"
                  value={shop_date_ouv}
                  onChangeText={setShopDateOuv}
                />
              </View>
            </View>
            <View style={tw`w-1/2 pl-2`}>
              <View style={tw`p-3 bg-white shadow-sm rounded-xl`}>
                <Text style={tw`mb-1 text-xs text-gray-500`}>Fermeture</Text>
                <TextInput
                  style={tw`text-gray-700`}
                  placeholder="JJ/MM"
                  value={shop_date_ferm}
                  onChangeText={setShopDateFrem}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Section Menu Photo */}
        <View style={tw`mb-8`}>
          <Text style={tw`mb-4 text-xl font-bold text-black-500`}>
            Menu du restaurant
          </Text>
          <TouchableOpacity
            style={tw`items-center justify-center h-40 bg-white border-2 border-yellow-300 border-dashed rounded-2xl`}
            onPress={handleImageUpload}
          >
            {menuImage ? (
              <Image
                source={{ uri: menuImage }}
                style={tw`w-full h-full rounded-2xl`}
              />
            ) : (
              <>
                <Ionicons name="cloud-upload" size={40} color="#FBC02D" />
                <Text style={tw`mt-2 text-blue-600`}>
                  Télécharger votre menu
                </Text>
                <Text style={tw`text-xs text-gray-500`}>Format JPG ou PNG</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Bouton de soumission */}
        <TouchableOpacity onPress={handlesubmit}>
          <Text
            style={tw`p-4 text-lg font-bold text-center text-white bg-red-300 rounded-xl`}
          >
            Valider la création
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
                Votre établissement a été créé avec succès !
              </Text>
              <TouchableOpacity
                style={tw`px-12 py-4 bg-yellow-400 rounded-full`}
                onPress={goToo}
              >
                <Text style={tw`text-xl font-bold text-white`}>Confirmer</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
      </LinearGradient>
    </ScrollView>
  );
};

export default formshop;
