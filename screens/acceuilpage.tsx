import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  ImageBackground,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { Card } from "react-native-paper";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
  import { Alert } from "react-native";  // Import Alert
import CustomAlert from "./costurmalerte";

const apiUrl = process.env.API_URL;
const apiUrlpython = process.env.FLASK_API_URL

const { width } = Dimensions.get("window");

const AcceuilPage = (props: any) => {
  const [shopsData, setShopsData] = useState<any | [number]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [userRole, setUserRole] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [reviews, setReviews] = useState({});
  const menuAnimation = useState(new Animated.Value(-300))[0];
const [user_id, setUser_id] = useState<string | null>(null);
  const [recommendedShops, setRecommendedShops] = useState<string[]>([]);
  const [shopsDetails, setShopsDetails] = useState<any[]>([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');


  // Récupère user_id depuis les params
  useEffect(() => {
    if (props.route.params?.id) {
      setUser_id(props.route.params.id);
    }
  }, [props.route.params?.id]);

  // Récupère les recommandations à partir du user_id
  const fetchRecommendations = async () => {
    if (!user_id) return;

    try {
      const data = await getRecommendations(user_id);
      setRecommendedShops(data.recommandations); // supposé être un tableau d'IDs
    } catch (error) {
      Alert.alert("Erreur", "Erreur lors de la récupération des recommandations");
    }
  };

  // Quand user_id est disponible, lance la récupération
  useEffect(() => {
    if (user_id) {
      fetchRecommendations();
    }
  }, [user_id]);

  // Dès qu'on a la liste des shops recommandés, récupère les détails
  useEffect(() => {
    if (recommendedShops.length > 0) {
      Promise.all(recommendedShops.map(id => getShopById(id)))
        .then(results => {
          setShopsDetails(results.filter(shop => shop !== null));
        });
    }
  }, [recommendedShops]);

  // Quand les détails sont prêts, affiche une alerte avec les noms
  useEffect(() => {
  if (shopsDetails.length > 0) {
    const recommandationsText = shopsDetails
      .map((shop, index) => `⭐ ${shop.shop_nom || "Nom inconnu"}`)
      .join('\n');

    setAlertTitle("🎯 Recommandations pour vous !");
    setAlertMessage(recommandationsText || "Aucune recommandation");
    setAlertVisible(true);
  }
}, [shopsDetails]);
  // Fonctions API

  async function getRecommendations(user_id: string) {
    try {
      const response = await axios.get(`${apiUrl}/api/recommend`, {
        params: { user_id }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur Flask API :', error.response?.data || error.message);
      throw error;
    }
  }

  async function getShopById(id: string) {
    try {
      const response = await axios.get(`${apiUrl}/shops/${id}`);
      return response.data; // doit contenir au minimum un champ "name"
    } catch (error) {
      console.error(`Erreur en récupérant le shop ${id} :`, error);
      return null;
    }
  }

  useEffect(() => {
    Animated.timing(menuAnimation, {
      toValue: isMenuOpen ? 0 : -300,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [isMenuOpen]);

  const fetchShopsData = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/shops/getallshops`);
      setShopsData(response.data);
    } catch (error) {
      console.error('Erreur de chargement des shops');
    }
  }, []);

  const handleSearch = async () => {
    try {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        fetchShopsData();
        return;
      }
      const response = await axios.get(`${apiUrl}/shops/search`, {
        params: { q: searchQuery },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Erreur lors de la recherche des shops :", error);
    }
  };

  useEffect(() => {
    fetchShopsData();
  }, [fetchShopsData]);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user/users/${props.route.params.id}`);
        setUserRole(response.data.role);
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

  const fetchReviews = async (shop_id: any) => {
    try {
      const response = await axios.get(`${apiUrl}/review/getreviews/${shop_id}`);
      const data = response.data;
      if (data.length > 0) {
        const totalCuisine = data.reduce((sum: any, review: any) => sum + review.note_cuisine, 0);
        const totalAmbiance = data.reduce((sum: any, review: any) => sum + review.note_ambiance, 0);
        const totalService = data.reduce((sum: any, review: any) => sum + review.note_service, 0);
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

  useEffect(() => {
    shopsData.forEach((shop: any) => {
      fetchReviews(shop._id);
    });
  }, [shopsData]);

  const handleAddToFavorites = async (shop_id: string) => {
    try {
      const response = await axios.post(`${apiUrl}/user/favoriclic`, {
        shop_id: shop_id,
        userId: props.route.params.id,
      });
      if (response.status === 200) {
        setFavorites((prevFavorites) => [...prevFavorites, shop_id]);
      }
    } catch (error: any) {
      console.error("Error during adding to favorites:", error.response?.data || error.message);
    }
  };

  const handleCardExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Navigation
  const goTo = () => props.navigation.navigate("userprofile", { id: props.route.params.id });
  const goToshopcree = () => props.navigation.navigate("formshop", { id: props.route.params.id });
  const goTofavorisuser = () => props.navigation.navigate("userfavoris", { id: props.route.params.id });
  const goToprofileshop = (shop: any) => props.navigation.navigate("profileshop", { shopId: shop._id, id: props.route.params.id });
  const gotoallshopsinmaps = () => props.navigation.navigate("allshopsinmaps", { id: props.route.params.id });
  const goToReclam = () => props.navigation.navigate("reclam", { id: props.route.params.id });
  const goToMyEstablishment = () => props.navigation.navigate("myshop", { id: props.route.params.id });
  const goToChatbot = () => props.navigation.navigate('chatbot');
  const goToOrders = () => props.navigation.navigate("order");

  const MenuItem = ({ icon, name, onPress, color = "#4f46e5" }: any) => (
    <TouchableOpacity
      onPress={onPress}
      style={tw`flex-row items-center p-3 my-1 rounded-lg`}
    >
      <Icon name={icon} size={20} color={color} style={tw`mr-4`} />
      <Text style={[tw`text-lg`, { color }]}>{name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[tw`flex-1`, { backgroundColor: 'white' }]}>

     <View style={{ flex: 1 }}>
      {/* Ton UI habituel ici */}

      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </View>
      {/* Menu Overlay */}
      {isMenuOpen && (
        <TouchableWithoutFeedback onPress={() => setIsMenuOpen(false)}>
          <View style={[tw`absolute top-0 left-0 w-full h-full`, { zIndex: 50 }]}>
            <Animated.View 
              style={[
                tw`w-3/4 h-full p-4 bg-white`,
                { 
                  transform: [{ translateX: menuAnimation }],
                  shadowColor: "#000",
                  shadowOffset: { width: 2, height: 0 },
                  shadowOpacity: 0.25,
                  shadowRadius: 10,
                  elevation: 10
                }
              ]}
            >
              <View style={tw`mt-10`}>
                <MenuItem icon="user" name="Mon Profil" onPress={goTo} />
                <MenuItem icon="plus" name="Créer établissement" onPress={goToshopcree} />
                <MenuItem icon="heart" name="Favoris" onPress={goTofavorisuser} />
                <MenuItem icon="map-marker" name="Carte shops" onPress={gotoallshopsinmaps} />
                {userRole === "manager" && (
                  <>
                    <MenuItem icon="star" name="Mes établissements" onPress={goToMyEstablishment} />
                    <MenuItem icon="list-alt" name="Mes commandes" onPress={goToOrders} />
                  </>
                )}
                <MenuItem icon="comment" name="Guide" onPress={goToChatbot} />
                <MenuItem icon="refresh" name="Réclamation" onPress={goToReclam} />
                <MenuItem icon="sign-out" name="Se Déconnecter" onPress={() => setIsMenuOpen(false)} />
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      )}

      {/* Main Content */}
      <View >
        {/* Header */}
        <View style={tw`flex-row justify-between items-center p-4 bg-indigo-600`}>
          <TouchableOpacity
            style={tw`p-3 bg-white rounded-full shadow-lg`}
            onPress={() => setIsMenuOpen(true)}
          >
            <FontAwesome name="bars" size={20} color="#6366f1" />
          </TouchableOpacity>
          <View style={tw`flex-1 mx-4`}>
            <View style={tw`flex-row items-center bg-white rounded-full px-4 py-2 shadow-md`}>
              <TextInput
                style={tw`flex-1 text-base text-gray-800`}
                placeholder="🔍 Rechercher ..."
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
              />
              <TouchableOpacity onPress={gotoallshopsinmaps} style={tw`ml-2`}>
                <FontAwesome5 name="map-marked-alt" size={20} color="#6366f1" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Bouton Choix personnalisés */}
        <TouchableOpacity
          onPress={goToChatbot}
          style={[tw`mx-4 my-2 flex-row items-center justify-center bg-indigo-100 rounded-full py-2 shadow-lg`, styles.shadow]}
        >
          <MaterialIcons name="auto-awesome" size={18} color="#6366f1" style={tw`mr-2`} />
          <Text style={tw`text-indigo-600 font-medium`}>Choix personnalisés</Text>
        </TouchableOpacity>

        {/* Liste des shops - 2 cartes par ligne */}
        <ScrollView contentContainerStyle={tw`pb-20 px-2`}>
          <View style={tw`flex-row flex-wrap justify-between`}>
            {(searchQuery.trim() ? searchResults : shopsData).map((shop: any, index: number) => (
              <View 
                key={shop._id} 
                style={[tw`mb-4`, { width: '48%' }]}
              >
                <Card style={[tw`overflow-hidden rounded-xl`, styles.cardElevation]}>
                  <TouchableOpacity onPress={() => goToprofileshop(shop)}>
                    <ImageBackground
                      source={{ uri: `${apiUrl}/fetchshopImages/${shop.shopImage}` }}
                      style={tw`w-full h-40`}
                      imageStyle={tw`rounded-t-xl`}
                    >
                      <View style={tw`absolute top-2 right-2 bg-white px-2 py-1 rounded-full`}>
                        <Text style={tw`text-xs font-bold text-indigo-600`}>OPEN</Text>
                      </View>
                    </ImageBackground>

                    <View style={tw`p-3 bg-white`}>
                      <View style={tw`flex-row justify-between items-center mb-1`}>
                        <Text style={tw`text-lg font-bold text-gray-800`} numberOfLines={1}>
                          {shop.shop_nom}
                        </Text>
                        <TouchableOpacity
                          style={tw`p-2 bg-indigo-100 rounded-full`}
                          onPress={() => handleAddToFavorites(shop._id)}
                        >
                          <Icon
                            name="heart"
                            size={16}
                            color={favorites.includes(shop._id) ? "#ef4444" : "#9CA3AF"}
                          />
                        </TouchableOpacity>
                      </View>

                      <View style={tw`flex-row items-center mb-1`}>
                        <Icon name="clock-o" size={12} color="#6B7280" style={tw`mr-1`} />
                        <Text style={tw`text-gray-600 text-xs`}>
                          {shop.shop_date_ouv} - {shop.shop_date_ferm}
                        </Text>
                      </View>

                      <View style={tw`flex-row items-center justify-between`}>
                        <View style={tw`flex-row items-center`}>
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              key={i}
                              name="star"
                              size={14}
                              color={reviews[shop._id] && reviews[shop._id] >= i + 1 ? "#fbbf24" : "#d1d5db"}
                            />
                          ))}
                          <Text style={tw`ml-1 text-sm font-bold text-yellow-500`}>
                            {reviews[shop._id] ? reviews[shop._id].toFixed(1) : "0.0"}
                          </Text>
                        </View>

                        <TouchableOpacity
                          style={tw`flex-row items-center px-2 py-1 bg-indigo-100 rounded-full`}
                          onPress={() => handleCardExpand(index)}
                        >
                          <Text style={tw`mr-1 text-xs text-indigo-600`}>
                            {expandedIndex === index ? "Moins" : "Plus"}
                          </Text>
                          <Icon
                            name={expandedIndex === index ? "chevron-up" : "chevron-down"}
                            size={12}
                            color="#6366f1"
                          />
                        </TouchableOpacity>
                      </View>

                      {expandedIndex === index && (
                        <View style={tw`mt-2 pt-2 border-t border-gray-200`}>
                          <Text style={tw`text-gray-700 text-xs`}>{shop.shop_description}</Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                </Card>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardElevation: {
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export default AcceuilPage;