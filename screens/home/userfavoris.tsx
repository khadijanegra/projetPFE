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
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
const apiUrl = process.env.API_URL;

const TaskCard = (props: any) => {
  const [shopsData, setShopsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUserData();
  }, [fetchUserData]);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [fetchUserData])
  );

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
  
  useEffect(() => {
    if (shopsData.length > 0) {
      shopsData.forEach((shop) => {
        fetchReviews(shop._id);
      });
    }
  }, [shopsData]);
  

  if (loading && !refreshing) {
    return (
      <View style={[tw`flex-1 justify-center items-center`, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FBBF24" />
        <Text style={tw`mt-4 text-lg text-gray-600`}>Chargement des favoris...</Text>
      </View>
    );
  }

  if (shopsData.length === 0 && !loading) {
    return (
      <View style={[tw`flex-1 justify-center items-center p-8`, styles.emptyContainer]}>
        <Icon name="heart" size={60} color="#E5E7EB" />
        <Text style={tw`text-xl font-bold text-gray-500 mt-4 text-center`}>
          Aucun favori trouvé
        </Text>
        <Text style={tw`text-gray-400 mt-2 text-center`}>
          Ajoutez des boutiques à vos favoris pour les voir apparaître ici
        </Text>
        <TouchableOpacity 
          onPress={onRefresh}
          style={tw`mt-6 bg-red-300 px-6 py-3 rounded-full`}
        >
          <Text style={tw`text-white font-bold`}>Actualiser</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh}
          colors={["#FBBF24", "#EF4444"]}
        />
      }
      contentContainerStyle={tw`pb-4`}
    >
      <View style={tw`px-2`}>
        {shopsData.map((shop) => (
          <View
            key={shop._id}
            style={[
              tw`p-4 m-2 bg-white rounded-2xl`,
              styles.cardShadow,
              { borderLeftWidth: 4, borderLeftColor: "#EF4444" }
            ]}
          >
            <View style={tw`flex-row`}>
              <Image
                source={{
                  uri: `${apiUrl}/fetchshopImages/${shop.shopImage}`,
                }} 
                style={tw`w-24 h-24 rounded-xl`}
                resizeMode="cover"
              />
              
              <View style={tw`ml-4 flex-1`}>
                {/* Titre et localisation */}
                <View style={tw`flex-row justify-between items-start`}>
                  <Text style={tw`text-lg font-bold text-gray-800 flex-shrink`} numberOfLines={2}>
                    {shop.shop_nom}
                  </Text>
                  <TouchableOpacity>
                    <Icon name="heart" size={24} color="#EF4444" />
                  </TouchableOpacity>
                </View>
                
                <View style={tw`flex-row items-center my-1`}>
                  <Icon name="map-marker" size={14} color="#9CA3AF" />
                  <Text style={tw`ml-1 text-xs text-gray-500`}>
                    {shop.address || "Kairouan"}
                  </Text>
                </View>
                
                <View style={tw`flex-row items-center my-1`}>
                  <Icon name="phone" size={14} color="#9CA3AF" />
                  <Text style={tw`ml-1 text-sm text-gray-700`}>
                    {shop.phone}
                  </Text>
                </View>
                
                {/* Note et avis */}
                <View style={tw`flex-row items-center mt-2`}>
  <View style={tw`flex-row items-center`}>
    {[...Array(5)].map((_, j) => (
      <Icon
        key={j}
        name="star"
        size={16}
        color={
          reviews[shop._id] && reviews[shop._id] >= j + 1
            ? "#FBBF24"
            : "#D1D5DB"
        }
      />
    ))}
  </View>
  <Text style={tw`ml-2 text-sm font-bold text-gray-700`}>
    {reviews[shop._id] ? reviews[shop._id].toFixed(1) : "0.0"}
  </Text>
</View>

              </View>
            </View>
            
            <TouchableOpacity 
              style={tw`mt-4 bg-red-100 py-2 rounded-full items-center`}
              activeOpacity={0.8}
            >
              <Text style={tw`text-red-500 font-bold`}>Voir la boutique</Text>
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
    shadowRadius: 4,
    elevation: 3,
  },
  loadingContainer: {
    backgroundColor: "#F9FAFB"
  },
  emptyContainer: {
    backgroundColor: "#F9FAFB"
  }
});

export default TaskCard;