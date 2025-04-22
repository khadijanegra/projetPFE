import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

import axios from "axios";
const apiUrl = process.env.API_URL;

const ProfilShop = (props: any) => {
  const [showPhone, setShowPhone] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [showAddress, setShowAddress] = useState(false);
  const [user_id, setUserId] = useState<string | undefined>();
  const [shopData, setShopData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [rating, setRating] = useState(0);
  const [showServices, setShowServices] = useState(false);
  const [showevents, setShowevents] = useState(false);
  const [averageRatings, setAverageRatings] = useState({
    cuisine: 0,
    service: 0,
    ambiance: 0,
    total: 0,
  });
  const [event, setEvent] = useState<any[]>([]);
  const [visites, setVisites] = useState<number>(0);

  
  const shopId = props.route.params.shopId;

  const fetchShopData = useCallback(async () => {
    try {
      setLoading(true);
      const [shopResponse, reviewResponse,eventsResponse] = await Promise.all([
        axios.get(`${apiUrl}/shops/${shopId}`),
        axios.get(`${apiUrl}/review/getreviews/${shopId}`),
        axios.get(`${apiUrl}/event/getevent/${shopId}`)
      ]);
      const shopData = shopResponse.data;
      const reviews = reviewResponse.data;
      const event = eventsResponse.data;

      
      setShopData(shopData);
      setEvent(event);
      console.log("++++++++++++++ " + JSON.stringify(shopData, null, 2));
console.log("********* " + JSON.stringify(event, null, 2));

      calculateAverageRatings(reviews);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.error("Error fetching shop data:", error);
      setLoading(false);
    }
  }, [shopId]);
  

  const calculateAverageRatings = (reviews: any) => {
    if (!Array.isArray(reviews) || reviews.length === 0) return;

    const cuisine = reviews.map((item: any) => item.note_cuisine);
    const service = reviews.map((item: any) => item.note_service);
    const ambiance = reviews.map((item: any) => item.note_ambiance);

    const averageCuisine =
      cuisine.length > 0 ? cuisine.reduce((sum: number, note: number) => sum + note, 0) /cuisine.length: 0;
    const averageService =service.length > 0 ? service.reduce((sum: number, note: number) => sum + note, 0) /service.length: 0;
    const averageAmbiance =
      ambiance.length > 0? ambiance.reduce((sum: number, note: number) => sum + note, 0) /ambiance.length: 0;

    const totalAverage =
      ((averageCuisine + averageService + averageAmbiance) / 3);

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
        const updatedShopData = response.data;
        setVisites(updatedShopData.visites); 
      } catch (error) {
        console.error('Erreur lors de la mise à jour des visites:', error);
      }
    };
  
    incrementVisites();
  }, [shopId]); 
  

  console.log(visites);

  const toggleDescription = () => {
    setShowDescription((prev) => !prev);
    Animated.timing(animation, {
      toValue: showDescription ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const goToReviewForm = () => {
    console.log("Navigating to ReviewForm with:", {
      shop_id: shopId,
      user_id: props.route.params.id,
      coordinates
    });
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

    if (match) {
      const latitude = parseFloat(match[1]);
      const longitude = parseFloat(match[2]);
      return { latitude, longitude };
    } else {
      return "Coordonnées non trouvées dans l'URL.";
    }
  }

  // Assurez-vous que shopData existe avant d'exécuter l'extraction des coordonnées
  const coordinates = shopData ? extractCoordinates(shopData.shop_local) : null;
  console.log(coordinates);

  return (
    <ScrollView style={tw`bg-white`}>
      {shopData && (
        <View style={tw`relative h-80`}>
          <Image
            source={{ uri: `${apiUrl}/fetchshopImages/${shopData.shopImage}` }}
            style={tw`w-full h-full`}
            resizeMode="cover"
          />

          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={tw`absolute bottom-0 w-full h-1/3`}
          />
          <View style={tw`absolute bottom-0 w-full p-6`}>
            <Text style={tw`text-3xl font-bold text-white mb-1`}>
              {shopData.shop_nom}
            </Text>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="star" size={20} color="#FBBF24" />
              <Text style={tw`ml-2 text-yellow-400 text-sm`}>5.0 (1 avis)</Text>
            </View>
          </View>
        </View>
      )}

      {/* Main content */}
      <View style={{ padding: 20 }}>
        {/* Section pour afficher le nombre de visites avec une icône */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Ionicons name="eye" size={24} color="#6B7280" /> {/* Icône d'œil */}
          <Text style={{ marginLeft: 8, fontSize: 18 }}>
            {visites} visites {/* Affichage du nombre de visites */}
          </Text>
        </View>

        {/* Description Section */}
        {shopData && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={toggleDescription}
            style={tw`mb-4 bg-white rounded-xl p-4 shadow-md`}
          >
            <View style={tw`flex-row items-center justify-between`}>
              {/* Icône de business-center */}
              <View style={tw`flex-row items-center`}>
                <MaterialIcons name="description" size={25} color="#EF5350" />
                <Text style={tw`ml-3 text-xl font-bold text-gray-800`}>
                  Description
                </Text>
              </View>

              {/* Icône de bascule pour afficher/masquer la description */}
              <Ionicons
                name={showDescription ? "chevron-up" : "chevron-down"}
                size={25}
                color="#EF5350"
              />
            </View>

            {/* Affichage de la description lorsque showDescription est vrai */}
            {showDescription && (
              <Text style={tw`mt-2 text-gray-600 leading-5`}>
                {shopData.shop_desc}
              </Text>
            )}
          </TouchableOpacity>
        )}
        {/* Section Services */}
        {shopData && shopData.service && shopData.service.length > 0 && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setShowServices((prev) => !prev)}
            style={tw`mb-4 bg-white rounded-xl p-4 shadow-md`}
          >
            <View style={tw`flex-row items-center justify-between`}>
              {/* Icône de téléphone */}
              <View style={tw`flex-row items-center`}>
                <MaterialIcons
                  name="business-center"
                  size={25}
                  color="#EF5350"
                />
                <Text style={tw`ml-3 text-xl font-bold text-gray-800`}>
                  service
                </Text>
              </View>

              {/* Icône chevron pour afficher/masquer */}
              <Ionicons
                name={showServices ? "chevron-up" : "chevron-down"}
                size={25}
                color="#EF5350"
              />
            </View>

            {/* Liste des services */}
            {showServices && (
              <View style={tw`mt-4`}>
                {shopData.service.map((service: string, index: number) => (
                  <View key={index} style={tw`flex-row items-center my-2`}>
                    {/* Icône checkmark */}
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={22}
                      color="#10B981"
                    />
                    <Text style={tw`ml-3 text-gray-700 text-base`}>
                      {service}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </TouchableOpacity>
        )}
        {/* Contact Section */}
        {shopData && (
          <View style={tw`mb-4 bg-white rounded-xl p-4 shadow-xl `}>
            <TouchableOpacity
              style={tw`flex-row justify-between items-center`}
              onPress={() => setShowPhone(!showPhone)}
            >
              <View style={tw`flex-row items-center`}>
                <MaterialIcons name="phone" size={25} color="#EF5350" />
                <Text style={tw`ml-3 text-xl font-bold text-gray-800`}>
                  Cantact
                </Text>
              </View>
              <Ionicons
                name={showPhone ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
            {showPhone && (
              <Text style={tw`mt-2 text-lg font-semibold text-gray-900`}>
                {shopData.phone}
              </Text>
            )}
          </View>
        )}
        {/* Hours Section */}
        {shopData && (
          <View style={tw`mb-12 bg-white rounded-xl p-4 shadow-sm shadow-xl`}>
            <View style={tw`flex-row items-center mb-3`}>
              <MaterialIcons
                name="access-time"
                size={25}
                color="#EF5350"
                style={tw`mr-2`}
              />
              <Text style={tw`text-lg font-semibold text-gray-900`}>
                𝗛𝗼𝗿𝗮𝗶𝗿𝗲𝘀
              </Text>
            </View>
            <View style={tw`flex-row justify-between mb-2`}>
              <Text style={tw`text-gray-600`}>Lundi - Vendredi</Text>
              <Text style={tw`text-gray-800 font-medium`}>
                {shopData.shop_date_ouv} - {shopData.shop_date_ferm}
              </Text>
            </View>
          </View>
        )}

        <View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setShowevents((prev) => !prev)}
          >
            {event && (
              <View style={tw`mb-6 bg-white rounded-xl p-4 shadow-lg`}>
                <View style={tw`flex-row items-center justify-between`}>
                  <Text style={tw`ml-1 text-xl font-bold text-gray-800 mb-2`}>
                    🎉 Evénements
                  </Text>
                  <Ionicons
                    name={showevents ? "chevron-up" : "chevron-down"}
                    size={25}
                    color="#EF5350"
                  />
                </View>

                {/* Vérifie si showevents est vrai et si event est un tableau et non vide */}
                {showevents && Array.isArray(event) && event.length > 0
                  ? event.map((ev: any, index: number) => (
                      <View key={index} style={tw`mb-6`}>
                        {/* Titre de l'événement avec une icône */}
                        <View style={tw`flex flex-row`}>
                          <FontAwesome
                            name="calendar"
                            size={18}
                            color="#32cd32"
                            style={tw`mr-2 mt-1`} // Utilisation de tailwind pour la marge
                          />
                          <Text
                            style={tw`text-xl font-bold text-green-500 mb-3`}
                          >
                            {ev.titre}
                          </Text>
                        </View>

                        {/* Description de l'événement */}
                        <Text
                          style={tw`text-sm text-gray-700 mt-1 mb-4 font-medium`}
                        >
                          {ev.description}
                        </Text>

                        {/* Date de début */}
                        <View style={tw`flex-row items-center`}>
                          <FontAwesome
                            name="clock-o"
                            size={16}
                            color="#6b7280"
                          />
                          <Text style={tw`text-lg text-gray-500 ml-2`}>
                            Début :{" "}
                            {ev?.date_debut
                              ? new Date(ev.date_debut)
                                  .toISOString()
                                  .slice(0, 16)
                                  .replace("T", " ")
                              : "N/A"}
                          </Text>
                        </View>

                        {/* Date de fin */}
                        <View style={tw`flex-row items-center mb-2`}>
                          <FontAwesome
                            name="clock-o"
                            size={16}
                            color="#6b7280"
                          />
                          <Text style={tw`text-lg text-gray-500 ml-2`}>
                            Fin :{" "}
                            {ev?.date_fin
                              ? new Date(ev.date_fin)
                                  .toISOString()
                                  .slice(0, 16)
                                  .replace("T", " ")
                              : "N/A"}
                          </Text>
                        </View>

                        {/* Prix */}
                        {ev.prix && (
                          <View style={tw`flex-row items-center mb-2`}>
                            <FontAwesome
                              name="money"
                              size={16}
                              color="#f59e0b"
                            />
                            <Text style={tw`text-md text-gray-700 ml-2`}>
                              Prix : {ev.prix} dt /personne
                            </Text>
                          </View>
                        )}

                        {/* Nombre de places disponibles */}
                        {ev.nbr_place && (
                          <View style={tw`flex-row items-center`}>
                            <FontAwesome
                              name="users"
                              size={16}
                              color="#6b7280"
                            />
                            <Text style={tw`text-md text-gray-700 ml-2`}>
                              Places dispo : {ev.nbr_place}
                            </Text>
                          </View>
                        )}
                      </View>
                    ))
                  : showevents && (
                      <View>
                        <Text style={tw`text-base font-bold text-red-500`}>
                          {
                            "Aucun événement pour le moment, mais restez à l'écoute !"
                          }
                        </Text>
                      </View>
                    )}
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={tw`px-4 mb-10`}>
  <TouchableOpacity
    onPress={() => props.navigation.navigate("commande", {
      shop_id: shopId,
      shop_nom: shopData?.shop_nom
    })}
    style={tw`bg-red-500 py-3 rounded-full items-center shadow-lg`}
  >
    <Text style={tw`text-white text-lg font-bold`}>
      Passer vos commande
    </Text>
  </TouchableOpacity>
</View>

        {/* Address Section */}
        {shopData && shopData.shop_local && (
          <View
            style={tw`mb-6 bg-white rounded-xl p-4 shadow-lg border border-gray-300`}
          >
            <Text style={tw`text-lg font-semibold text-gray-900 mb-3`}>
              𝗔𝗱𝗿𝗲𝘀𝘀𝗲
            </Text>
            <View style={tw`flex-row items-center mb-4`}>
              <Ionicons
                name="location-outline"
                size={25}
                color="#EF5350"
                style={tw`mt-1`}
              />
              <TouchableOpacity onPress={() => setShowAddress(!showAddress)}>
                <Text style={tw`ml-2 text-gray-600 underline`}>
                  {showAddress ? JSON.stringify(coordinates) : "Voir l'adresse"}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={tw`w-full h-64 overflow-hidden border-2 border-black-200 rounded-2xl`}
            >
              <MapView
                style={tw`w-full h-full`}
                showsUserLocation={true}
                minZoomLevel={15}
                initialRegion={{
                  latitude: coordinates?.latitude || 0,
                  longitude: coordinates?.longitude || 0,
                  latitudeDelta: coordinates?.latitude || 0,
                  longitudeDelta: coordinates?.longitude || 0,
                }}
              >
                {coordinates && (
                  <Marker
                    coordinate={{
                      latitude: coordinates.latitude,
                      longitude: coordinates.longitude,
                    }}
                    pinColor="#3b82f6"
                  />
                )}
              </MapView>
            </View>
          </View>
        )}
        {/* Reviews Section */}
        <View style={tw`p-4 bg-white rounded-lg shadow-md`}>
          <Text style={tw`mb-2 text-lg font-bold`}>𝗔𝘃𝗶𝘀</Text>
          <View style={tw`mb-2 border-b border-gray-300`} />
          <View style={tw`flex-col items-center mb-10`}>
            <Text style={tw`text-yellow-400 text-2xl`}>
              {[...Array(5)].map((_, index) => {
                const num = index + 1;
                return (
                  <FontAwesome
                    key={num}
                    name="star"
                    size={32}
                    color={num <= averageRatings.total ? "#FBBF24" : "gray"}
                    style={tw`mx-1`}
                  />
                );
              })}
            </Text>
            <Text style={tw`ml-1 text-xl font-bold`}>
              {averageRatings.total.toFixed(2)}
            </Text>
            <Text style={tw`ml-2 text-sm text-gray-600`}>83 avis</Text>
          </View>
          <View style={tw`flex-row justify-between`}>
            <View style={tw`items-center`}>
              <Image
                source={require("../../images/service.png")}
                style={tw`w-12 h-12 border-white rounded-full`}
              />
              <Text style={tw`text-sm font-bold`}>Service</Text>
              <Text style={tw`text-sm text-gray-600`}>
                {averageRatings.service.toFixed(2)}
              </Text>
            </View>
            <View style={tw`items-center`}>
              <Image
                source={require("../../images/ambiance.png")}
                style={tw`w-12 h-12 border-white rounded-full`}
              />
              <Text style={tw`text-sm font-bold`}>Ambiance</Text>
              <Text style={tw`text-sm text-gray-600`}>
                {averageRatings.ambiance.toFixed(2)}
              </Text>
            </View>
            <View style={tw`items-center`}>
              <Image
                source={require("../../images/cuisine.png")}
                style={tw`w-12 h-12 border-white rounded-full`}
              />
              <Text style={tw`text-sm font-bold`}>Cuisine</Text>
              <Text style={tw`text-sm text-gray-600`}>
                {averageRatings.cuisine.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={tw`flex-row items-center justify-center w-1/2 py-2 mt-3 mb-5 ml-40 bg-red-300 rounded-full`}
          onPress={goToReviewShop}
        >
          <Icon name="eye" size={20} color="black" style={tw`mr-2`} />
          <Text style={tw`text-lg text-center`}>𝑽𝒐𝒊𝒓 𝒂𝒗𝒊𝒔</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-row items-center justify-center w-full py-2 mb-5 bg-red-300 rounded-full px-14`}
          onPress={goToReviewForm}
        >
          <Icon name="comment" size={20} color="black" style={tw`mr-2`} />
          <Text style={tw`text-lg font-bold text-center`}>
            𝑫𝒐𝒏𝒏𝒆𝒓 𝒗𝒐𝒕𝒓𝒆 𝒂𝒗𝒊𝒔
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfilShop;
