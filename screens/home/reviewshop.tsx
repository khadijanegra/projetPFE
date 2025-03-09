import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity,ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
const apiUrl = process.env.API_URL;


const ReviewShop = (props: any) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null); // Suivi de l'ID du card actuellement ouvert
  
  const [shop_id, setShopId] = useState();

  // Appel de l'API pour récupérer les avis du magasin
  useEffect(() => {
    setShopId(props.route.params.shop_id); // Récupère le shop_id depuis les paramètres de la route

    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/review/getreviews/${shop_id}`
        );
        setReviews(response.data); // Stocke les avis dans l'état
        setLoading(false); // Fin du chargement
      } catch (err) {
        console.error(err);
        setLoading(false); // Fin du chargement même en cas d'erreur
      }
    };

    if (shop_id) {
      fetchReviews();
    }
  }, [shop_id]);

  if (loading) {
    return <Text>Chargement...</Text>; // Affiche un message de chargement
  }

  

  // Fonction pour basculer l'état 'expanded' d'un card spécifique
  const toggleDetails = (id: string) => {
    setExpandedCardId(expandedCardId === id ? null : id); // Si le même card est cliqué, on le referme
  };

  return (
  <ScrollView>
    <View>
      {reviews.map((review: any) => (
        <TouchableOpacity
          key={review._id} // Utilisation de l'ID unique de chaque avis
          onPress={() => toggleDetails(review._id)} // Ouvre ou ferme les détails de ce card
          style={tw`p-4 m-2 bg-white border border-gray-300 shadow-lg rounded-2xl`}
        >
          {/* Nom de l'utilisateur */}
          <Text style={tw`text-lg font-bold text-gray-800 mb-1`}>
            {review.user_id.nom} {/* Remplace par un nom d'utilisateur si disponible */}
          </Text>

          {/* Avis de l'utilisateur */}
          <Text style={tw`text-gray-600 mb-2`}>
            {review.commentaire} {/* Commentaire dynamique */}
          </Text>

          {/* Note et avis */}
          <View style={tw`flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center`}>
              {/* Icônes des étoiles */}
              {Array(5)
                .fill()
                .map((_, index) => (
                  <Icon
                    key={index}
                    name="star"
                    size={20}
                    color={
                      index < (review.note_ambiance + review.note_cuisine + review.note_service)/3
                        ? "#FBBF24"
                        : "#D1D5DB"
                    } 
                  />
                ))}
             
            </View>
          </View>

          {/* Détails affichés lorsque l'on clique */}
          {expandedCardId === review._id && ( // Affiche seulement si cet avis est celui cliqué
            <View style={tw`mt-2 p-2 bg-gray-100 rounded-lg`}>
              <Text style={tw`text-gray-700`}>
                🌿 Ambiance : {review.note_ambiance}
              </Text>
              <Text style={tw`text-gray-700`}>
                🍽 Service : {review.note_service}
              </Text>
              <Text style={tw`text-gray-700`}>
                👨‍🍳 Cuisine : {review.note_cuisine}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
    </ScrollView>
  );
};

export default ReviewShop;
