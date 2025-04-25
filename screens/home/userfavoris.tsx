import React, { useCallback, useEffect, useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator,
  RefreshControl,
  StyleSheet 
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const apiUrl = process.env.API_URL;

const TaskCard = (props: any) => {
  const [shopsData, setShopsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [reviews, setReviews] = useState({});

  // Couleurs personnalisées
  const colors = {
    primary: "#000000",    // Noir pour les titres et boutons
    background: "#FFFFFF", // Blanc pour le fond
    accent: "#EC4899",     // Rose pour les accents (icônes)
    star: "#F59E0B",       // Or pour les étoiles
    textMuted: "#6B7280"   // Gris pour texte secondaire
  };

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiUrl}/user/favorites/${props.route.params.id}`);
      setShopsData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [props.route.params.id]);

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUserData();
  }, [fetchUserData]);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [fetchUserData])
  );

  useEffect(() => {
    if (shopsData.length > 0) {
      shopsData.forEach((shop) => {
        fetchReviews(shop._id);
      });
    }
  }, [shopsData]);

  if (loading && !refreshing) {
    return (
      <View style={[tw`flex-1 justify-center items-center`, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[tw`mt-4 text-lg`, { color: colors.primary }]}>
          Chargement des favoris...
        </Text>
      </View>
    );
  }

  if (shopsData.length === 0 && !loading) {
    return (
      <View style={[tw`flex-1 justify-center items-center p-8`, { backgroundColor: colors.background }]}>
        <Ionicons name="heart-outline" size={60} color={colors.textMuted} />
        <Text style={[tw`text-xl font-bold mt-4 text-center`, { color: colors.primary }]}>
          Aucun favori trouvé
        </Text>
        <Text style={[tw`mt-2 text-center`, { color: colors.textMuted }]}>
          Ajoutez des boutiques à vos favoris pour les voir apparaître ici
        </Text>
        <TouchableOpacity 
          onPress={onRefresh}
          style={[tw`mt-6 px-6 py-3 rounded-full`, { backgroundColor: colors.primary }]}
        >
          <Text style={tw`text-white font-bold`}>Actualiser</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      }
      contentContainerStyle={tw`pb-6`}
    >
      <View style={tw`px-4 pt-4`}>
        <Text style={[tw`text-2xl font-bold mb-4`, { color: colors.primary }]}>
          Mes Favoris
        </Text>
        
        {shopsData.map((shop) => (
          <View
            key={shop._id}
            style={[
              tw`mb-5 rounded-xl overflow-hidden`,
              styles.cardShadow,
              { backgroundColor: colors.background, borderLeftWidth: 4, borderLeftColor: colors.accent }
            ]}
          >
            <View style={tw`flex-row p-4`}>
              <Image
                source={{ uri: `${apiUrl}/fetchshopImages/${shop.shopImage}` }}
                style={tw`w-24 h-24 rounded-lg`}
                resizeMode="cover"
              />
              
              <View style={tw`ml-4 flex-1`}>
                <View style={tw`flex-row justify-between items-start`}>
                  <Text 
                    style={[tw`text-lg font-bold flex-1`, { color: colors.primary }]}
                    numberOfLines={2}
                  >
                    {shop.shop_nom}
                  </Text>
                  <TouchableOpacity>
                    <Ionicons name="heart" size={24} color={colors.accent} />
                  </TouchableOpacity>
                </View>
                
                <View style={tw`flex-row items-center mt-2`}>
                  <Ionicons name="location-outline" size={16} color={colors.textMuted} />
                  <Text style={[tw`ml-2 text-sm`, { color: colors.textMuted }]}>
                    {shop.address || "Localisation non précisée"}
                  </Text>
                </View>
                
                <View style={tw`flex-row items-center mt-2`}>
                  <Ionicons name="call-outline" size={16} color={colors.textMuted} />
                  <Text style={[tw`ml-2 text-sm`, { color: colors.textMuted }]}>
                    {shop.phone || "Non renseigné"}
                  </Text>
                </View>
                
                <View style={tw`flex-row items-center mt-3`}>
                  <View style={tw`flex-row`}>
                    {[...Array(5)].map((_, j) => (
                      <Ionicons
                        key={j}
                        name={reviews[shop._id] && reviews[shop._id] >= j + 1 ? "star" : "star-outline"}
                        size={16}
                        color={reviews[shop._id] && reviews[shop._id] >= j + 1 ? colors.star : colors.textMuted}
                      />
                    ))}
                  </View>
                  <Text style={[tw`ml-2 text-sm font-bold`, { color: colors.primary }]}>
                    {reviews[shop._id] ? reviews[shop._id].toFixed(1) : "0.0"}
                  </Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity 
              style={[tw`py-3 items-center`, { backgroundColor: colors.primary }]}
              activeOpacity={0.8}
            >
              <Text style={tw`text-white font-bold`}>
                Voir la boutique
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  }
});

export default TaskCard;