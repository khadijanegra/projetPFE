import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

const apiUrl = process.env.API_URL;

const ProfilShop = (props: any) => {
  // États existants
  const [showPhone, setShowPhone] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [shopData, setShopData] = useState<any>(null);
  const [averageRatings, setAverageRatings] = useState({
    cuisine: 0,
    service: 0,
    ambiance: 0,
    total: 0,
  });
  const [event, setEvent] = useState<any[]>([]);
  const [visites, setVisites] = useState<number>(0);
  const [showServices, setShowServices] = useState(false);
  const [showevents, setShowevents] = useState(false);

  const shopId = props.route.params.shopId;

  // Couleurs thématiques
  const theme = {
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#ef4444",
    background: "#ffffff",
    text: "#1e293b",
    border: "#e2e8f0",
  };

  // Styles
  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.background,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: theme.border,
    },
    button: {
      backgroundColor: theme.primary,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 8,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    outlineButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.primary,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 8,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 8,
    },
    headerImage: {
      height: 250,
      width: '100%',
    },
  });

  // Fonctions existantes (fetchShopData, calculateAverageRatings, etc.)
  const fetchShopData = useCallback(async () => {
    try {
      const [shopResponse, reviewResponse, eventsResponse] = await Promise.all([
        axios.get(`${apiUrl}/shops/${shopId}`),
        axios.get(`${apiUrl}/review/getreviews/${shopId}`),
        axios.get(`${apiUrl}/event/getevent/${shopId}`)
      ]);
      
      const shopData = shopResponse.data;
      const reviews = reviewResponse.data;
      const event = eventsResponse.data;

      setShopData(shopData);
      setEvent(event);
      calculateAverageRatings(reviews);
    } catch (error) {
      console.error("Error fetching shop data:", error);
    }
  }, [shopId]);

  const calculateAverageRatings = (reviews: any) => {
    if (!Array.isArray(reviews) || reviews.length === 0) return;

    const cuisine = reviews.map((item: any) => item.note_cuisine);
    const service = reviews.map((item: any) => item.note_service);
    const ambiance = reviews.map((item: any) => item.note_ambiance);

    const averageCuisine = cuisine.length > 0 ? 
      cuisine.reduce((sum: number, note: number) => sum + note, 0) / cuisine.length : 0;
    const averageService = service.length > 0 ? 
      service.reduce((sum: number, note: number) => sum + note, 0) / service.length : 0;
    const averageAmbiance = ambiance.length > 0 ? 
      ambiance.reduce((sum: number, note: number) => sum + note, 0) / ambiance.length : 0;

    const totalAverage = ((averageCuisine + averageService + averageAmbiance) / 3);

    setAverageRatings({
      cuisine: averageCuisine,
      service: averageService,
      ambiance: averageAmbiance,
      total: totalAverage,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchShopData();
    }, [fetchShopData])
  );

  useEffect(() => {
    const incrementVisites = async () => {
      try {
        const response = await axios.put(`${apiUrl}/shops/${shopId}/visites`);
        setVisites(response.data.visites); 
      } catch (error) {
        console.error('Erreur lors de la mise à jour des visites:', error);
      }
    };
    incrementVisites();
  }, [shopId]);

  const toggleDescription = () => setShowDescription(prev => !prev);

  const goToReviewForm = () => {
    props.navigation.navigate("reviewform", {
      shop_id: shopId,
      user_id: props.route.params.id,
      coordinates
    });
  };

  const goToReviewShop = () => {
    props.navigation.navigate("reviewshop", {
      shop_id: shopId,
      user_id: props.route.params.id,
    });
  };

  function extractCoordinates(url: string) {
    const regex = /@([-?\d.]+),([-?\d.]+)/;
    const match = url.match(regex);
    return match ? { latitude: parseFloat(match[1]), longitude: parseFloat(match[2]) } : null;
  }

  const coordinates = shopData ? extractCoordinates(shopData.shop_local) : null;

  if (!shopData) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      {/* Header avec image */}
      <View style={tw`relative`}>
        <Image
          source={{ uri: `${apiUrl}/fetchshopImages/${shopData.shopImage}` }}
          style={styles.headerImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          style={tw`absolute bottom-0 w-full h-1/3`}
        />
        <View style={tw`absolute bottom-0 w-full p-4`}>
          <Text style={tw`text-2xl font-bold text-white`}>{shopData.shop_nom}</Text>
          <View style={tw`flex-row items-center mt-1`}>
            <Ionicons name="star" size={16} color="#FBBF24" />
            <Text style={tw`ml-1 text-yellow-400 text-sm`}>
              {averageRatings.total.toFixed(1)} ({visites} visites)
            </Text>
          </View>
        </View>
      </View>

      {/* Contenu principal */}
      <View style={tw`p-4`}>

        {/* Section Description */}
        <TouchableOpacity 
          onPress={toggleDescription}
          style={styles.card}
        >
          <View style={tw`flex-row justify-between items-center`}>
            <View style={tw`flex-row items-center`}>
              <MaterialIcons name="description" size={20} color={theme.primary} />
              <Text style={[tw`ml-2`, styles.sectionTitle]}>Description</Text>
            </View>
            <Ionicons
              name={showDescription ? "chevron-up" : "chevron-down"}
              size={20}
              color={theme.primary}
            />
          </View>
          {showDescription && (
            <Text style={tw`mt-2 text-gray-600`}>{shopData.shop_desc}</Text>
          )}
        </TouchableOpacity>

        {/* Section Services */}
        {shopData.service?.length > 0 && (
          <TouchableOpacity 
            onPress={() => setShowServices(!showServices)}
            style={styles.card}
          >
            <View style={tw`flex-row justify-between items-center`}>
              <View style={tw`flex-row items-center`}>
                <MaterialIcons name="business-center" size={20} color={theme.primary} />
                <Text style={[tw`ml-2`, styles.sectionTitle]}>Services</Text>
              </View>
              <Ionicons
                name={showServices ? "chevron-up" : "chevron-down"}
                size={20}
                color={theme.primary}
              />
            </View>
            {showServices && (
              <View style={tw`mt-2`}>
                {shopData.service.map((service: string, index: number) => (
                  <View key={index} style={tw`flex-row items-center my-1`}>
                    <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                    <Text style={tw`ml-2 text-gray-700`}>{service}</Text>
                  </View>
                ))}
              </View>
            )}
          </TouchableOpacity>
        )}

        {/* Section Contact */}
        <View style={styles.card}>
          <TouchableOpacity 
            onPress={() => setShowPhone(!showPhone)}
            style={tw`flex-row justify-between items-center`}
          >
            <View style={tw`flex-row items-center`}>
              <MaterialIcons name="phone" size={20} color={theme.primary} />
              <Text style={[tw`ml-2`, styles.sectionTitle]}>Contact</Text>
            </View>
            <Ionicons
              name={showPhone ? "eye-off" : "eye"}
              size={20}
              color={theme.primary}
            />
          </TouchableOpacity>
          {showPhone && (
            <Text style={tw`mt-2 text-gray-700 font-medium`}>
              {shopData.phone}
            </Text>
          )}
        </View>

        {/* Section Horaires */}
        <View style={styles.card}>
          <View style={tw`flex-row items-center`}>
            <MaterialIcons name="access-time" size={20} color={theme.primary} />
            <Text style={[tw`ml-2`, styles.sectionTitle]}>Horaires</Text>
          </View>
          <View style={tw`mt-2`}>
            <View style={tw`flex-row justify-between py-2`}>
              <Text style={tw`text-gray-600`}>Lundi - Vendredi</Text>
              <Text style={tw`text-gray-800 font-medium`}>
                {shopData.shop_date_ouv} - {shopData.shop_date_ferm}
              </Text>
            </View>
          </View>
        </View>

        {/* Section Événements */}
        {event.length > 0 && (
          <TouchableOpacity 
            onPress={() => setShowevents(!showevents)}
            style={styles.card}
          >
            <View style={tw`flex-row justify-between items-center`}>
              <Text style={[styles.sectionTitle, tw`flex-row items-center`]}>
                <FontAwesome name="calendar" size={16} color={theme.primary} style={tw`mr-2`} />
                Événements
              </Text>
              <Ionicons
                name={showevents ? "chevron-up" : "chevron-down"}
                size={20}
                color={theme.primary}
              />
            </View>
            
            {showevents && event.map((ev, index) => (
              <View key={index} style={tw`mt-3`}>
                <Text style={tw`text-lg font-semibold text-${theme.primary}`}>
                  {ev.titre}
                </Text>
                <Text style={tw`text-gray-600 mt-1`}>{ev.description}</Text>
                
                <View style={tw`flex-row items-center mt-2`}>
                  <FontAwesome name="clock-o" size={14} color="#6b7280" />
                  <Text style={tw`text-gray-600 ml-2`}>
                    {new Date(ev.date_debut).toLocaleString()} - {new Date(ev.date_fin).toLocaleString()}
                  </Text>
                </View>
                
                {ev.prix && (
                  <View style={tw`flex-row items-center mt-1`}>
                    <FontAwesome name="money" size={14} color="#f59e0b" />
                    <Text style={tw`text-gray-600 ml-2`}>
                      {ev.prix} dt/personne
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </TouchableOpacity>
        )}

        {/* Bouton Commander */}
        <TouchableOpacity
          style={[styles.button, tw`mt-4`]}
          onPress={() => props.navigation.navigate("commande", {
            shop_id: shopId,
            shop_nom: shopData.shop_nom,
            user_id: props.route.params.id,
          })}
        >
          <Text style={tw`text-white font-bold`}>Passer commande</Text>
        </TouchableOpacity>

        {/* Section Adresse */}
        {shopData.shop_local && (
          <View style={[styles.card, tw`mt-4`]}>
            <Text style={styles.sectionTitle}>Adresse</Text>
            <View style={tw`flex-row items-center mt-2`}>
              <Ionicons name="location-outline" size={20} color={theme.primary} />
              <TouchableOpacity onPress={() => setShowAddress(!showAddress)}>
                <Text style={tw`ml-2 text-${theme.primary} underline`}>
                  {showAddress ? "Masquer la carte" : "Voir sur la carte"}
                </Text>
              </TouchableOpacity>
            </View>
            
            {showAddress && coordinates && (
              <View style={tw`h-48 mt-4 rounded-lg overflow-hidden border border-gray-200`}>
                <MapView
                  style={tw`flex-1`}
                  initialRegion={{
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: coordinates.latitude,
                      longitude: coordinates.longitude,
                    }}
                    title={shopData.shop_nom}
                  />
                </MapView>
              </View>
            )}
          </View>
        )}

        {/* Section Avis */}
        <View style={[styles.card, tw`mt-4`]}>
          <Text style={styles.sectionTitle}>Avis</Text>
          
          <View style={tw`items-center my-4`}>
            <Text style={tw`text-3xl font-bold text-${theme.primary}`}>
              {averageRatings.total.toFixed(1)}
            </Text>
            <View style={tw`flex-row my-2`}>
              {[...Array(5)].map((_, i) => (
                <Ionicons
                  key={i}
                  name="star"
                  size={24}
                  color={i < Math.floor(averageRatings.total) ? "#FBBF24" : "#d1d5db"}
                />
              ))}
            </View>
            <Text style={tw`text-gray-600`}>Basé sur {visites} visites</Text>
          </View>
          
          <View style={tw`flex-row justify-between`}>
            <View style={tw`items-center`}>
              <Text style={tw`font-bold`}>Service</Text>
              <Text style={tw`text-gray-600`}>{averageRatings.service.toFixed(1)}</Text>
            </View>
            <View style={tw`items-center`}>
              <Text style={tw`font-bold`}>Ambiance</Text>
              <Text style={tw`text-gray-600`}>{averageRatings.ambiance.toFixed(1)}</Text>
            </View>
            <View style={tw`items-center`}>
              <Text style={tw`font-bold`}>Cuisine</Text>
              <Text style={tw`text-gray-600`}>{averageRatings.cuisine.toFixed(1)}</Text>
            </View>
          </View>
        </View>

        {/* Boutons Avis */}
        <View style={tw`flex-row justify-between mt-4 mb-10`}>
          <TouchableOpacity
            style={[styles.outlineButton, { flex: 1, marginRight: 8 }]}
            onPress={goToReviewShop}
          >
            <Ionicons name="eye" size={18} color={theme.primary} style={tw`mr-2`} />
            <Text style={[tw`font-bold`, { color: theme.primary }]}>Voir les avis</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, { flex: 1, marginLeft: 8 }]}
            onPress={goToReviewForm}
          >
            <Ionicons name="chatbubble" size={18} color="white" style={tw`mr-2`} />
            <Text style={tw`text-white font-bold`}>Donner un avis</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfilShop;