import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { FontAwesome } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { Card, Paragraph } from "react-native-paper";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const AcceuilPage = (props: any) => {
  const [shopsData, setShopsData] = useState<any[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchShopsData = useCallback(async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:3000/shops/`);
      setShopsData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchShopsData();
    }, [fetchShopsData])
  );

  const handleCardExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  const goTo = () => {
    props.navigation.navigate("userprofile", { id: props.route.params.id });
  };

  const goToshopcree = () => {
    props.navigation.navigate("formshop", { id: props.route.params.id });
  };

  const goToprofileshop = (shop: any) => {
    props.navigation.navigate("profileshop", { shopData: shop }); // il shopData howa mot clee illi najmou naccediw behaa fil page illi ba3edhaa  // shop hiya il objet illi fih il contenu lkolll mte3 il shop
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
                <Text style={tw`text-lg font-bold text-white`}>Mon Profil</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`flex-row items-center p-2 mt-3 bg-red-300 rounded-full`}
                onPress={goToshopcree}
              >
                <Icon name="plus" size={20} color="black" style={tw`mr-2`} />
                <Text style={tw`text-lg text-white`}>Créer établissement</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`flex-row items-center p-2 mt-3 bg-red-300 rounded-full`}
              >
                <Icon name="heart" size={20} color="black" style={tw`mr-2`} />
                <Text style={tw`text-lg text-white`}>Favoris</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`flex-row items-center p-2 mt-3 bg-red-300 rounded-full`}
              >
                <Icon name="star" size={20} color="black" style={tw`mr-2`} />
                <Text style={tw`text-lg text-white`}>Mes Avis</Text>
              </TouchableOpacity>

              <View style={tw`mt-auto`}>
                <TouchableOpacity
                  style={tw`flex-row items-center p-4 border-t border-gray-300`}
                  onPress={() => setIsMenuOpen(false)}
                >
                  <Icon
                    name="refresh"
                    size={20}
                    color="black"
                    style={tw`mr-2`}
                  />
                  <Text style={tw`text-lg text-black`}>Réclamation</Text>
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
                  <Text style={tw`text-lg text-black`}>Se Déconnecter</Text>
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
                    <Text style={tw`text-xs font-bold text-white`}>OPEN</Text>
                  </View>

                  {/* Image */}
                  <Card.Cover
                    source={{
                      uri: "https://media.istockphoto.com/id/1175851148/vector/kawaii-coffee-cup-character-in-meditate-pose.jpg?s=612x612&w=0&k=20&c=6xn41fxI3T2_TIsRzZg0b6fmc2riNLN3JpS_7802ba8=",
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

                    <View
                      style={tw`flex-row items-center self-start px-1 py-1 rounded-full `}
                    >
                      <View style={tw`flex-row items-center`}>
                        <Text><Icon name="star" size={20} color="#FBBF24" /></Text>
                        <Text><Icon name="star" size={20} color="#FBBF24" /></Text>
                        <Text><Icon name="star" size={20} color="#FBBF24" /></Text>
                        <Text><Icon name="star" size={20} color="#FBBF24" /></Text>
                        <Text><Icon name="star" size={20} color="#FBBF24" /></Text>
                      </View>{" "}
                      <Text style={tw`ml-1 text-lg font-bold text-red-300`}>
                        4.9
                      </Text>
                    </View>
                  </Card.Content>

                  {/* Actions */}
                  <Card.Actions style={tw`justify-between px-4 pb-3`}>
                    <TouchableOpacity
                      style={tw`p-2 bg-red-100 rounded-full`}
                      onPress={() => {
                        /* Gérer les favoris */
                      }}
                    >
                      <Icon name="heart" size={20} color="#F56565" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={tw`flex-row items-center px-3 py-2 bg-red-300 rounded-full`}
                      onPress={() => handleCardExpand(index)}
                    >
                      <Text style={tw`mr-2 text-sm text-white`}>
                        {expandedIndex === index ? "Moins" : "Plus"}
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
                        {shop.shop_desc}
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
