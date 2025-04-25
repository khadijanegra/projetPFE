import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";

const apiUrl = process.env.API_URL;

const Consultshop = (props: any) => {
  const [shopData, setShopData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [shop_id, setshop_id] = useState();
  const [isEditing, setIsEditing] = useState(false);
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

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/shops/${shopId}`, shopData);
      setIsEditing(false);
      alert("Modifications enregistrées avec succès!");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const handleCreateEvent = async () => {
    props.navigation.navigate("formevent", { shopId });
  };

  if (loading) return (
    <View style={tw`flex-1 justify-center items-center bg-white`}>
      <ActivityIndicator size="large" color="#EC4899" />
      <Text style={tw`mt-4 text-gray-600`}>Chargement des données...</Text>
    </View>
  );

  if (error) return (
    <View style={tw`flex-1 justify-center items-center bg-white p-4`}>
      <Ionicons name="alert-circle" size={48} color="#EF4444" />
      <Text style={tw`text-lg text-gray-800 mt-4 text-center`}>
        Erreur lors du chargement des données du magasin
      </Text>
      <TouchableOpacity
        style={tw`mt-6 bg-pink-600 px-6 py-3 rounded-full`}
        onPress={() => setError(false)}
      >
        <Text style={tw`text-white font-medium`}>Réessayer</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={tw`bg-white`}>
      {shopData && (
        <View style={tw`pb-8`}>
          {/* Header avec image */}
          <View style={tw`relative`}>
            <Image
              source={{ uri: `${apiUrl}/fetchshopImages/${shopData.shopImage}` }}
              style={tw`w-full h-56`}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={tw`absolute top-4 left-4 bg-black bg-opacity-50 rounded-full p-2`}
              onPress={() => props.navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Contenu principal */}
          <View style={tw`px-5 -mt-6`}>
            <View style={tw`bg-white rounded-2xl shadow-lg p-6`}>
              {/* Titre */}
              <View style={tw`flex-row justify-between items-center mb-4`}>
                <Text style={tw`text-2xl font-bold text-gray-900`}>
                  {shopData.shop_nom}
                </Text>
                <View style={tw`flex-row items-center`}>
                  <Ionicons name="star" size={20} color="#F59E0B" />
                  <Text style={tw`ml-1 text-gray-700`}>4.8</Text>
                </View>
              </View>

              {/* Section informations */}
              <View style={tw`mb-6`}>
                <Text style={tw`text-lg font-semibold text-gray-800 mb-3`}>
                  Informations du magasin
                </Text>

                {/* Champ Description */}
                <View style={tw`mb-4`}>
                  <Text style={tw`text-sm font-medium text-gray-500 mb-1`}>
                    Description
                  </Text>
                  <TextInput
                    style={[
                      tw`p-3 bg-gray-50 rounded-xl text-gray-800`,
                      isEditing && tw`bg-white border border-pink-200`
                    ]}
                    value={shopData.shop_desc}
                    onChangeText={(text) =>
                      setShopData({ ...shopData, shop_desc: text })
                    }
                    editable={isEditing}
                    multiline
                    numberOfLines={3}
                  />
                </View>

                {/* Champ Localisation */}
                <View style={tw`mb-4`}>
                  <Text style={tw`text-sm font-medium text-gray-500 mb-1`}>
                    Localisation
                  </Text>
                  <View style={tw`flex-row items-center`}>
                    <Ionicons
                      name="location-outline"
                      size={18}
                      color="#EC4899"
                      style={tw`mr-2`}
                    />
                    <TextInput
                      style={[
                        tw`flex-1 p-3 bg-gray-50 rounded-xl text-gray-800`,
                        isEditing && tw`bg-white border border-pink-200`
                      ]}
                      value={shopData.shop_local}
                      onChangeText={(text) =>
                        setShopData({ ...shopData, shop_local: text })
                      }
                      editable={isEditing}
                    />
                  </View>
                </View>

                {/* Champ Numéro de téléphone */}
                <View style={tw`mb-4`}>
                  <Text style={tw`text-sm font-medium text-gray-500 mb-1`}>
                    Téléphone
                  </Text>
                  <View style={tw`flex-row items-center`}>
                    <Ionicons
                      name="call-outline"
                      size={18}
                      color="#EC4899"
                      style={tw`mr-2`}
                    />
                    <TextInput
                      style={[
                        tw`flex-1 p-3 bg-gray-50 rounded-xl text-gray-800`,
                        isEditing && tw`bg-white border border-pink-200`
                      ]}
                      value={shopData.phone}
                      onChangeText={(text) =>
                        setShopData({ ...shopData, phone: text })
                      }
                      editable={isEditing}
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>

                {/* Horaires */}
                <View style={tw`mb-6`}>
                  <Text style={tw`text-sm font-medium text-gray-500 mb-2`}>
                    Horaires d'ouverture
                  </Text>
                  <View style={tw`flex-row justify-between`}>
                    <View style={tw`w-1/2 pr-2`}>
                      <Text style={tw`text-xs text-gray-400 mb-1`}>Ouverture</Text>
                      <TextInput
                        style={[
                          tw`p-3 bg-gray-50 rounded-xl text-gray-800`,
                          isEditing && tw`bg-white border border-pink-200`
                        ]}
                        value={shopData.shop_date_ouv}
                        onChangeText={(text) =>
                          setShopData({ ...shopData, shop_date_ouv: text })
                        }
                        editable={isEditing}
                      />
                    </View>
                    <View style={tw`w-1/2 pl-2`}>
                      <Text style={tw`text-xs text-gray-400 mb-1`}>Fermeture</Text>
                      <TextInput
                        style={[
                          tw`p-3 bg-gray-50 rounded-xl text-gray-800`,
                          isEditing && tw`bg-white border border-pink-200`
                        ]}
                        value={shopData.shop_date_ferm}
                        onChangeText={(text) =>
                          setShopData({ ...shopData, shop_date_ferm: text })
                        }
                        editable={isEditing}
                      />
                    </View>
                  </View>
                </View>
              </View>

              {/* Boutons d'action */}
              <View style={tw`flex-row justify-between`}>
                <TouchableOpacity
                  style={[
                    tw`flex-1 py-3 rounded-xl items-center justify-center mr-2`,
                    isEditing ? tw`bg-green-500` : tw`bg-pink-500`
                  ]}
                  onPress={() => {
                    if (isEditing) {
                      handleSave();
                    }
                    setIsEditing(!isEditing);
                  }}
                >
                  <View style={tw`flex-row items-center`}>
                    <Ionicons
                      name={isEditing ? "checkmark-circle" : "pencil"}
                      size={20}
                      color="white"
                    />
                    <Text style={tw`text-white font-medium ml-2`}>
                      {isEditing ? "Enregistrer" : "Modifier"}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={tw`flex-1 py-3 bg-black rounded-xl items-center justify-center ml-2`}
                  onPress={handleCreateEvent}
                >
                  <View style={tw`flex-row items-center`}>
                    <Ionicons name="add-circle" size={20} color="white" />
                    <Text style={tw`text-white font-medium ml-2`}>
                      Évènement
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Section supplémentaire (optionnelle) */}
          <View style={tw`mt-6 px-5`}>
            <Text style={tw`text-lg font-semibold text-gray-800 mb-3`}>
              À propos
            </Text>
            <View style={tw`bg-gray-50 p-4 rounded-xl`}>
              <Text style={tw`text-gray-600`}>
                Ce magasin propose une sélection de produits de qualité pour répondre à vos besoins.
              </Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Consultshop;