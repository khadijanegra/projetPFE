import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";

const apiUrl = process.env.API_URL;

const Consultshop = (props: any) => {
  const [shopData, setShopData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [shop_id , setshop_id] =useState();
  const [isEditing, setIsEditing] = useState(false); // Mode édition activé
  const shopId = props.route.params.shopId;

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/shops/${shopId}`);
        setShopData(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchShopData();
  }, [shopId]);
  console.log(shopId);
  // Fonction pour gérer la mise à jour des informations du magasin
  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/shops/${shopId}`, shopData); // Envoie des données modifiées
      setIsEditing(false); // Désactive le mode édition
      alert("Modifications enregistrées !");
      console.log("donnees mise a jour ",shopData);
      
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  if (loading) return <Text>Chargement...</Text>;
  if (error) return <Text>Erreur lors du chargement des données</Text>;

  const handleCreateEvent = async ()=>{
      props.navigation.navigate ("formevent", {shopId});
  }
  return (
    <ScrollView style={tw`bg-gray-200 p-4`}>
      {shopData && (
        <View>
          {/* Affichage de l'image */}
          <Image
            source={{ uri: `${apiUrl}/fetchshopImages/${shopData.shopImage}` }}
            style={tw`w-full h-40 rounded-lg`}
          />

          {/* Champ Nom du magasin */}
          <Text style={tw`text-lg font-bold ttext-gray-800 mt-4`}>𝗡𝗼𝗺 </Text>
          <TextInput
            style={tw`p-2 mt-1 bg-gray-100 border border-pink-600 rounded-lg`}
            value={shopData.shop_nom}
            onChangeText={(text) =>
              setShopData({ ...shopData, shop_nom: text })
            }
            editable={isEditing}
          />

          {/* Champ Description */}
          <Text style={tw`text-lg font-bold text-gray-800 mt-4`}>
            𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻
          </Text>
          <TextInput
            style={tw`p-2 mt-1 bg-gray-100 border border-pink-600 rounded-lg`}
            value={shopData.shop_desc}
            onChangeText={(text) =>
              setShopData({ ...shopData, shop_desc: text })
            }
            editable={isEditing}
            multiline
          />

          {/* Champ Localisation */}
          <Text style={tw`text-lg font-bold text-gray-800 mt-4`}>
            𝗟𝗼𝗰𝗮𝗹𝗶𝘀𝗮𝘁𝗶𝗼𝗻
          </Text>
          <TextInput
            style={tw`p-2 mt-1 bg-gray-100 border border-pink-600 rounded-lg`}
            value={shopData.shop_local}
            onChangeText={(text) =>
              setShopData({ ...shopData, shop_local: text })
            }
            editable={isEditing}
          />

          {/* Champ Numéro de téléphone */}
          <Text style={tw`text-lg font-bold text-gray-800 mt-4`}>
            𝗡𝘂𝗺𝗲́𝗿𝗼 𝗱𝗲 𝘁𝗲́𝗹𝗲́𝗽𝗵𝗼𝗻𝗲
          </Text>
          <TextInput
            style={tw`p-2 mt-1 bg-gray-100 border border-pink-600 rounded-lg`}
            value={shopData.phone}
            onChangeText={(text) => setShopData({ ...shopData, phone: text })}
            editable={isEditing}
            keyboardType="phone-pad"
          />

          {/* Champ Heure d'ouverture */}
          <Text style={tw`text-lg font-bold text-gray-800 mt-4`}>
            𝗛𝗲𝘂𝗿𝗲 𝗱'𝗼𝘂𝘃𝗲𝗿𝘁𝘂𝗿𝗲
          </Text>
          <TextInput
            style={tw`p-2 mt-1 bg-gray-100 border border-pink-600 rounded-lg`}
            value={shopData.shop_date_ouv}
            onChangeText={(text) =>
              setShopData({ ...shopData, shop_date_ouv: text })
            }
            editable={isEditing}
          />

          {/* Champ Heure de fermeture */}
          <Text style={tw`text-lg font-bold text-gray-800 mt-4`}>
            𝗛𝗲𝘂𝗿𝗲 𝗱𝗲 𝗳𝗲𝗿𝗺𝗲𝘁𝘂𝗿𝗲
          </Text>
          <TextInput
            style={tw`p-2 mt-1 bg-gray-100 border border-pink-600 rounded-lg`}
            value={shopData.shop_date_ferm}
            onChangeText={(text) =>
              setShopData({ ...shopData, shop_date_ferm: text })
            }
            editable={isEditing}
          />

          {/* Bouton Modifier / Enregistrer */}
          <TouchableOpacity
            style={tw`mt-4 p-3 rounded-lg bg-red-500 mb-2 ${
              isEditing ? "bg-green-600" : "bg-pink-600"
            }`}
            onPress={() => {
              if (isEditing) {
                handleSave(); 
              }
              setIsEditing(!isEditing); 
            }}
          >
            <View style={tw`flex flex-row items-center justify-center`}>
            <Ionicons
              name={isEditing ? "checkmark-circle-outline" : "create-outline"}
              size={20}
              color="white"
              
            />
            <Text style={tw`text-white `}>
              {isEditing ? "𝙀𝙣𝙧𝙚𝙜𝙞𝙨𝙩𝙧𝙚𝙧" : "𝙈𝙤𝙙𝙞𝙛𝙞𝙚𝙧"}
            </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`mt-4 p-3 rounded-lg bg-black mb-12`}
            onPress={handleCreateEvent}
          >
            <Text style={tw`text-white font-bold text-center`}>
              Créer évènement
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default Consultshop;
