import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
} from "react-native";
//import dialogflow from "./home/dialogflow.json";
import tw from "tailwind-react-native-classnames";
import { FontAwesome } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { Card } from "react-native-paper";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { Dialogflow_V2 } from "react-native-dialogflow";


const apiUrl = process.env.API_URL;


const AcceuilPage = (props: any) => {
  const [shopsData, setShopsData] = useState<any | [number]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<any[]>([]); 
  const [userRole, setUserRole] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");


  const fetchShopsData = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/shops/shops/search`, {
        params: { query: searchQuery } 
      });
      console.log("Fetched shops:", JSON.stringify(response.data, null, 2));
      setShopsData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [searchQuery]);

  
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user/users/${props.route.params.id}`);
        setUserRole(response.data.role); // Supposons que l'API renvoie le rôle de l'utilisateur
      } catch (error) {
        console.error("Erreur lors de la récupération du rôle utilisateur :", error);
      }
    };
    
    fetchUserRole();
  }, [props.route.params.id]);
  useFocusEffect(
    useCallback(() => {
      fetchShopsData();
    }, [fetchShopsData])
  );
  console.log(userRole);
//partiii favoriii 

const [reviews, setReviews] = useState({});

const fetchReviews = async (shop_id : any) => {
  try {
    const response = await axios.get(`${apiUrl}/review/getreviews/${shop_id}`);
    const data = response.data;

    if (data.length > 0) {
      const totalCuisine = data.reduce((sum :any, review: any) => sum + review.note_cuisine, 0);
      const totalAmbiance = data.reduce((sum : any, review : any) => sum + review.note_ambiance, 0);
      const totalService = data.reduce((sum : any, review : any) => sum + review.note_service, 0);
      const averageRating = (totalCuisine + totalAmbiance + totalService) / (3 * data.length);

      setReviews((prev) => ({ ...prev, [shop_id]: averageRating }));
    } else {
      setReviews((prev) => ({ ...prev, [shop_id]: 0 }));
    }
  } catch (err) {
    console.error(err);
    setReviews((prev) => ({ ...prev, [shop_id]: 0 }));
  }
};

// Charger les avis au montage du composant
useEffect(() => {
  shopsData.forEach((shop) => {
    fetchReviews(shop.id);
  });
}, [shopsData]);

  const handleAddToFavorites = async (shop_id: string) => {
    try {
      const response = await axios.post(`${apiUrl}/user/favoriclic`,
        {
          shop_id: shop_id,
          userId: props.route.params.id,
        
        }
        
      );
      

      if (response.status === 200) {
        setFavorites((prevFavorites) => [...prevFavorites, shop_id]);
        console.log("Shop added to favorites:", response.data);
      } else {
        console.error(
          "Error adding to favorites:",
          response.data.message || "Unknown error"
        );
      }
    } catch (error: any) {
      console.error(
        "Error during adding to favorites:",
        error.response?.data || error.message
      );
    }
  };

  const handleCardExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  const goTo = () => {
    props.navigation.navigate("userprofile", { id: props.route.params.id });
  };

  const goToshopcree = () => {
    props.navigation.navigate("formshop", { id: props.route.params.id });
  };

  const goTofavorisuser = () => {
    props.navigation.navigate("userfavoris", { id: props.route.params.id });
  };

  const goToprofileshop = (shop: any) => {
    props.navigation.navigate("profileshop",{
      shopId: shop.id,
      id: props.route.params.id
     
    }); 
  };
  const gotoallshopsinmaps = (shop: any) => {
    props.navigation.navigate("allshopsinmaps" , {
      id: props.route.params.id
    }); 
  };

  const goToReclam = () => {
    if (props.route.params?.id) {  // Check if 'id' exists
      setIsMenuOpen(false);
      props.navigation.navigate("reclam", { id: props.route.params.id });
    } else {
      console.error("ID is not available!");
    }
  };
  const goToMyEstablishment = (shop: any) => {
    props.navigation.navigate("myshop", {
      shopId: shop.id,  
      id: props.route.params.id
    });
  };
  const goToChatbot = () => {
    setIsMenuOpen(false);  // Close the menu
    props.navigation.navigate('chatbot');  // Navigate to the chatbot screen
  };
  
  

  return (
    <View style={tw`flex-1 bg-white`}>
      {isMenuOpen && (
        <TouchableWithoutFeedback onPress={() => setIsMenuOpen(false)}>
          <View
            style={[
              tw`absolute top-0 left-0 w-full h-full`,
              { backgroundColor: "rgba(187, 181, 181, 0.5)", zIndex: 50 },
            ]}
          >
            <View style={tw`w-2/3 h-full p-4 bg-white shadow-md`}>
              <TouchableOpacity
                onPress={goTo}
                style={tw`flex-row items-center p-2 bg-red-300 rounded-full`}
              >
                <Icon name="user" size={20} color="black" style={tw`mr-2`} />
                <Text style={tw`text-lg font-bold text-white`}>𝙈𝙤𝙣 𝙋𝙧𝙤𝙛𝙞𝙡</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`flex-row items-center p-2 mt-3 bg-red-300 rounded-full`}
                onPress={goToshopcree}
              >
                <Icon name="plus" size={20} color="black" style={tw`mr-2`} />
                <Text style={tw`text-lg text-white`}>𝘾𝙧𝙚́𝙚𝙧 𝙚́𝙩𝙖𝙗𝙡𝙞𝙨𝙨𝙚𝙢𝙚𝙣𝙩</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`flex-row items-center p-2 mt-3 bg-red-300 rounded-full`}
                onPress={goTofavorisuser}
              >
                <Icon name="heart" size={20} color="black" style={tw`mr-2`} />
                <Text style={tw`text-lg text-white`}>𝙁𝙖𝙫𝙤𝙧𝙞𝙨</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`flex-row items-center p-2 mt-3 bg-red-300 rounded-full`}
                onPress={gotoallshopsinmaps}
              >
                <Icon name="star" size={20} color="black" style={tw`mr-2`} />
                <Text style={tw`text-lg text-white`}>Carte shops </Text>
              </TouchableOpacity>

              {userRole === "manager" && (
                <TouchableOpacity
                  style={tw`flex-row items-center p-2 mt-3 bg-red-300 rounded-full`}
                  onPress={goToMyEstablishment} // Appeler la fonction ici
                >
                  <Icon name="star" size={20} color="black" style={tw`mr-2`} />
                  <Text style={tw`text-lg text-white`}>𝙈𝙚𝙨 𝙚́𝙩𝙖𝙗𝙡𝙞𝙨𝙨𝙚𝙢𝙚𝙣𝙩𝙨</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={tw`flex-row items-center p-2 mt-3 bg-red-300 rounded-full`}
                onPress={goToChatbot} // Navigate to chatbot
              >
                <Icon name="comment" size={20} color="black" style={tw`mr-2`} />
                <Text style={tw`text-lg text-white`}>Guide</Text>
              </TouchableOpacity>

              <View style={tw`mt-auto`}>
                <TouchableOpacity
                  style={tw`flex-row items-center p-4 border-t border-gray-300`}
                  onPress={goToReclam}
                >
                  <Icon
                    name="refresh"
                    size={20}
                    color="black"
                    style={tw`mr-2`}
                  />
                  <Text style={tw`text-lg text-black`}>𝚁𝚎́𝚌𝚕𝚊𝚖𝚊𝚝𝚒𝚘𝚗</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`flex-row items-center p-4 border-t border-gray-300`}
                  onPress={() => setIsMenuOpen(false)}
                >
                  <Icon
                    name="sign-out"
                    size={20}
                    color="black"
                    style={tw`mr-2`}
                  />
                  <Text style={tw`text-lg text-black`}>𝚂𝚎 𝙳𝚎́𝚌𝚘𝚗𝚗𝚎𝚌𝚝𝚎𝚛</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}

      {/* Bouton menu */}
      <TouchableOpacity
        style={tw`absolute z-10 p-3 bg-red-300 rounded-full top-4 left-4`}
        onPress={() => setIsMenuOpen(true)}
      >
        <FontAwesome name="bars" size={20} color="white" />
      </TouchableOpacity>
      <View
        style={tw`px-16 pt-4 pb-2 bg-white flex-row items-center border-b border-gray-300`}
      >
        <FontAwesome name="search" size={20} color="gray" style={tw`mr-3`} />
        <TextInput
          style={tw`flex-1 text-lg py-1 mb-3`}
          placeholder="Rechercher..."
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)} // Update search query
        />
      </View>
      {/* Liste des établissements */}
      <ScrollView
        contentContainerStyle={tw`px-2 pt-20 pb-4`}
        showsVerticalScrollIndicator={true}
      >
        <View style={tw`flex-row flex-wrap justify-between`}>
          {shopsData.map((shop, index) => (
            <View key={shop.id} style={tw`w-1/2 px-2 mb-4`}>
              <TouchableOpacity onPress={() => goToprofileshop(shop)}>
                <Card style={tw`overflow-hidden bg-white rounded-lg shadow-md`}>
                  {/* Badge d'état */}
                  <View
                    style={tw`absolute z-10 px-2 py-1 bg-red-300 rounded-full top-2 right-2`}
                  >
                    <Text style={tw`text-xs font-bold text-white`}>𝐎𝐏𝐄𝐍</Text>
                  </View>

                  {/* Image */}
                  <Card.Cover
                    source={{
                      uri: `${apiUrl}/fetchshopImages/${shop.shopImage}`,
                    }}
                    style={tw`w-full h-40`}
                  />

                  {/* Contenu principal */}
                  <Card.Content style={tw`pt-3`}>
                    <View
                      style={tw`flex-row items-center justify-between mb-2`}
                    >
                      <Text style={tw`flex-1 text-lg font-bold text-gray-800`}>
                        {shop.shop_nom}
                      </Text>
                      <Icon name="map-marker" size={16} color="#F56565" />
                    </View>

                    <View style={tw`flex-row items-center mb-2`}>
                      <Icon
                        name="clock-o"
                        size={14}
                        color="#718096"
                        style={tw`mr-2`}
                      />
                      <Text style={tw`text-sm text-gray-600`}>
                        {shop.shop_date_ouv} - {shop.shop_date_ferm}
                      </Text>
                    </View>

                    <View style={tw`flex-row items-center`}>
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="star"
                          size={20}
                          color={
                            reviews[shop.id] && reviews[shop.id] >= i + 1
                              ? "#FBBF24"
                              : "#D1D5DB"
                          }
                        />
                      ))}
                      <Text style={tw`ml-1 text-lg font-bold text-red-300`}>
                        {reviews[shop.id] ? reviews[shop.id].toFixed(1) : "0.0"}
                      </Text>
                    </View>
                  </Card.Content>

                  {/* Actions */}
                  <Card.Actions style={tw`justify-between px-4 pb-3`}>
                    <TouchableOpacity
                      style={tw`p-2 bg-red-100 rounded-full`}
                      onPress={() => {
                        handleAddToFavorites(shop._id);
                      }}
                    >
                      <Icon name="heart" size={20} color="#F56565" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={tw`flex-row items-center px-3 py-2 bg-red-300 rounded-full`}
                      onPress={() => handleCardExpand(index)}
                    >
                      <Text style={tw`mr-2 text-sm text-white`}>
                        {expandedIndex === index ? "𝑴𝒐𝒊𝒏𝒔" : "𝑷𝒍𝒖𝒔"}
                      </Text>
                      <Icon
                        name={
                          expandedIndex === index
                            ? "chevron-up"
                            : "chevron-down"
                        }
                        size={14}
                        color="white"
                      />
                    </TouchableOpacity>
                  </Card.Actions>

                  {/* Description étendue */}
                  {expandedIndex === index && (
                    <Card.Content
                      style={tw`px-4 py-3 border-t border-gray-200 bg-gray-50`}
                    >
                      <Text style={tw`text-sm leading-5 text-gray-600`}>
                        {shop.categorie}
                      </Text>
                    </Card.Content>
                  )}
                </Card>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default AcceuilPage;
