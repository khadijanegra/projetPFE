import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  ActivityIndicator,
  StyleSheet,
  Animated,
  RefreshControl
} from "react-native";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
const apiUrl = process.env.API_URL;

const ReviewShop = (props: any) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [shop_id, setShopId] = useState<string>();
  const [animation] = useState(new Animated.Value(0));

  // Animation pour l'ouverture des cartes
  const toggleAnimation = (id: string) => {
    setExpandedCardId(prevId => {
      const isOpening = prevId !== id;
      Animated.timing(animation, {
        toValue: isOpening ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      return isOpening ? id : null;
    });
  };

  // Fonction pour récupérer les avis
  const fetchReviews = async () => {
    try {
      setError(null);
      const response = await axios.get(`${apiUrl}/review/getreviews/${shop_id}`);
      setReviews(response.data);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les avis. Veuillez réessayer.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Rafraîchissement manuel
  const onRefresh = () => {
    setRefreshing(true);
    fetchReviews();
  };

  useEffect(() => {
    setShopId(props.route.params.shop_id);
  }, [props.route.params.shop_id]);

  useEffect(() => {
    if (shop_id) {
      fetchReviews();
    }
  }, [shop_id]);

  // Calcul de la note moyenne
  const calculateAverageRating = (review: any) => {
    return ((review.note_ambiance + review.note_cuisine + review.note_service) / 3).toFixed(1);
  };

  // Couleur en fonction de la note
  const getRatingColor = (rating: number) => {
    if (rating <= 1) return "#EF4444"; // Rouge
    if (rating <= 2) return "#F97316"; // Orange
    if (rating <= 3) return "#FBBF24"; // Jaune
    return "#10B981"; // Vert
  };

  if (loading && !refreshing) {
    return (
      <View style={[tw`flex-1 justify-center items-center`, styles.container]}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={tw`mt-4 text-lg text-gray-600`}>Chargement des avis...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[tw`flex-1 justify-center items-center`, styles.container]}>
        <Icon name="exclamation-triangle" size={40} color="#EF4444" />
        <Text style={tw`mt-4 text-lg text-center text-gray-700 px-8`}>{error}</Text>
        <TouchableOpacity
          onPress={fetchReviews}
          style={tw`mt-6 bg-blue-500 px-6 py-3 rounded-full`}
        >
          <Text style={tw`text-white font-medium`}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (reviews.length === 0 && !loading) {
    return (
      <View style={[tw`flex-1 justify-center items-center`, styles.container]}>
        <Icon name="comment-slash" size={40} color="#9CA3AF" />
        <Text style={tw`mt-4 text-lg text-center text-gray-600 px-8`}>
          Aucun avis pour ce magasin pour le moment.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#3B82F6"]}
          tintColor="#3B82F6"
        />
      }
      contentContainerStyle={tw`pb-6`}
    >
      <View style={tw`px-4`}>
        {reviews.map((review: any) => {
          const avgRating = calculateAverageRating(review);
          const ratingColor = getRatingColor(parseFloat(avgRating));
          
          return (
            <Animated.View
              key={review._id}
              style={[
                tw`mb-4 bg-white rounded-xl shadow-md overflow-hidden`,
                styles.card,
                {
                  transform: [{
                    scale: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.02]
                    })
                  }]
                }
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => toggleAnimation(review._id)}
              >
                <View style={tw`p-5`}>
                  <View style={tw`flex-row justify-between items-start mb-3`}>
                    <View style={tw`flex-1`}>
                      <Text style={tw`text-lg font-bold text-gray-900`}>
                        {review.user_id?.nom ?? "Utilisateur inconnu"} {review.user_id?.prenom}
                      </Text>
                      <Text style={tw`text-sm text-gray-500`}>
                        {review.date ? new Date(review.date).toLocaleDateString('fr-FR') : ""}
                      </Text>
                    </View>
                    
                    <View style={tw`flex-row items-center ml-2`}>
                      <Text style={[tw`font-bold mr-1`, { color: ratingColor }]}>
                        {avgRating}
                      </Text>
                      <Icon name="star" size={16} color={ratingColor} />
                    </View>
                  </View>

                  <Text style={tw`text-gray-700 mb-4`} numberOfLines={expandedCardId === review._id ? undefined : 3}>
                    {review.commentaire}
                  </Text>

                  {review.reviewImages && (
                    <View style={tw`rounded-lg overflow-hidden mb-4`}>
                      <Image
                        source={{ uri: `${apiUrl}/fetchreviewImage/${review.reviewImages}` }}
                        style={tw`w-full h-48`}
                        resizeMode="cover"
                      />
                    </View>
                  )}

                  <View style={tw`flex-row justify-between items-center`}>
                    <View style={tw`flex-row`}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icon
                          key={star}
                          name={star <= Math.round(parseFloat(avgRating)) ? "star" : "star-o"}
                          size={18}
                          color={star <= Math.round(parseFloat(avgRating)) ? ratingColor : "#D1D5DB"}
                          style={tw`mr-1`}
                        />
                      ))}
                    </View>

                    <Icon
                      name={expandedCardId === review._id ? "chevron-up" : "chevron-down"}
                      size={16}
                      color="#6B7280"
                    />
                  </View>
                </View>

                {expandedCardId === review._id && (
                  <Animated.View 
                    style={[
                      tw`bg-gray-50 px-5 py-3 border-t border-gray-200`,
                      {
                        opacity: animation
                      }
                    ]}
                  >
                    <View style={tw`flex-row justify-between mb-2`}>
                      <View style={tw`flex-row items-center`}>
                        <Icon name="leaf" size={16} color="#10B981" style={tw`mr-2`} />
                        <Text style={tw`text-gray-700`}>Ambiance</Text>
                      </View>
                      <View style={tw`flex-row items-center`}>
                        <Text style={tw`font-medium mr-1`}>{review.note_ambiance}</Text>
                        <Icon name="star" size={14} color={getRatingColor(review.note_ambiance)} />
                      </View>
                    </View>

                    <View style={tw`flex-row justify-between mb-2`}>
                      <View style={tw`flex-row items-center`}>
                        <Icon name="cutlery" size={16} color="#F59E0B" style={tw`mr-2`} />
                        <Text style={tw`text-gray-700`}>Cuisine</Text>
                      </View>
                      <View style={tw`flex-row items-center`}>
                        <Text style={tw`font-medium mr-1`}>{review.note_cuisine}</Text>
                        <Icon name="star" size={14} color={getRatingColor(review.note_cuisine)} />
                      </View>
                    </View>

                    <View style={tw`flex-row justify-between`}>
                      <View style={tw`flex-row items-center`}>
                        <Icon name="users" size={16} color="#3B82F6" style={tw`mr-2`} />
                        <Text style={tw`text-gray-700`}>Service</Text>
                      </View>
                      <View style={tw`flex-row items-center`}>
                        <Text style={tw`font-medium mr-1`}>{review.note_service}</Text>
                        <Icon name="star" size={14} color={getRatingColor(review.note_service)} />
                      </View>
                    </View>
                  </Animated.View>
                )}
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB'
  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  }
});

export default ReviewShop;