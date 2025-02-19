import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Modal, ScrollView, Animated, Alert } from "react-native";
import tw from "tailwind-react-native-classnames";
import axios from "axios";

const PaymentForm = () => {
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
  const [shop_nom, setShopNom] = useState('');
  const [shop_desc, setShopDesc] = useState('');
  const [shop_local, setShopLocal] = useState('');
  const [shop_date_ouv, setShopDateOuv] = useState('');
  const [shop_date_frem, setShopDateFrem] = useState('');
  const [user_id, setUserId] = useState(''); // Assuming user_id is provided from somewhere
  
  // Soumettre le formulaire
  const handlesubmit = async () => {
    const shopdata = { shop_nom, shop_desc, shop_local, shop_date_ouv, shop_date_frem, user_id };
    try {
      const response = await axios.post("http://10.0.2.2:3000/shops/", shopdata);
      if (response.status === 201) {
        Alert.alert("Shop créé avec succès");
        setModalVisible(true); // Afficher le modal de confirmation
        return true;
      } else {
        Alert.alert("Erreur lors de la création de votre Shop");
        return false;
      }
    } catch (error) {
      Alert.alert("Erreur lors de la connexion");
      return false;
    }
  };

  return (
    <ScrollView style={tw`bg-yellow-100`} contentContainerStyle={tw`p-4`}>
      <View style={tw`flex-1 p-6 bg-white bg-gray-100 rounded-lg`}>
        {/* Champ Nom */}
        <View>
          <Text style={tw`mb-2 text-lg font-semibold text-gray-900`}>Nom de l'établissement</Text>
          <TextInput
            style={tw`p-3 mb-4 text-gray-500 bg-gray-200 rounded-lg`}
            value={shop_nom}
            onChangeText={setShopNom}
            placeholder="Entrez le nom"
          />
        </View>

        {/* Champ Description */}
        <View>
          <Text style={tw`mb-2 text-lg font-semibold text-gray-900`}>Description</Text>
          <TextInput
            style={tw`w-full h-32 p-3 text-gray-500 bg-gray-200 rounded-lg`}
            value={shop_desc}
            onChangeText={setShopDesc}
            placeholder="Entrez la description"
            multiline={true}
            textAlignVertical="top"
          />
        </View>

        {/* Champ Localisation */}
        <Text style={tw`mb-2 text-lg font-semibold text-gray-900`}>Localisation URL</Text>
        <TextInput
          style={tw`p-3 mb-4 text-gray-500 bg-gray-200 rounded-lg shadow-xxl`}
          value={shop_local}
          onChangeText={setShopLocal}
          placeholder="Entrez l'URL"
        />

        {/* Dates */}
        <View style={tw`flex-row justify-between mb-4`}>
          <View style={tw`w-1/2 pr-2`}>
            <Text style={tw`mb-2 text-lg font-semibold text-gray-900`}>Date d'ouverture</Text>
            <TextInput
              style={tw`p-3 text-gray-500 bg-gray-200 rounded-lg`}
              value={shop_date_ouv}
              onChangeText={setShopDateOuv}
              placeholder="Ex: 10/30"
            />
          </View>
          <View style={tw`w-1/2 pl-2`}>
            <Text style={tw`mb-2 text-lg font-semibold text-gray-900`}>Date de fermeture</Text>
            <TextInput
              style={tw`p-3 text-gray-500 bg-gray-200 rounded-lg`}
              value={shop_date_frem}
              onChangeText={setShopDateFrem}
              placeholder="Ex: 12/31"
            />
          </View>
        </View>

        {/* Bouton Confirmer */}
        <TouchableOpacity style={tw`p-4 mt-4 bg-yellow-500 rounded-lg`} onPress={handlesubmit}>
          <Text style={tw`text-lg font-bold text-center text-white`}>Confirmer</Text>
        </TouchableOpacity>

        {/* Modal de confirmation */}
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={tw`items-center justify-end flex-1 bg-black bg-opacity-50`}>
            <Animated.View
              style={[
                tw`items-center w-full p-6 bg-white rounded-t-2xl`,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              <Image source={require('../../images/Illustration.png')} style={tw`w-32 h-32 mb-4`} />
              <Text style={tw`mb-4 text-lg font-semibold text-center text-gray-900`}>
                Création enregistrée !{'\n'}Merci pour votre confiance
              </Text>
              <TouchableOpacity style={tw`p-3 px-6 bg-yellow-400 rounded-xl`} onPress={() => setModalVisible(false)}>
                <Text style={tw`font-bold text-center text-black-500`}>OK</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default PaymentForm;
