import React, { useState } from "react";
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import tw from "tailwind-react-native-classnames";
import { FontAwesome } from '@expo/vector-icons';
import Icon from "react-native-vector-icons/FontAwesome";
import { Card, Avatar, IconButton, Paragraph } from "react-native-paper";


const AcceuilPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
      <View style={tw`mr-4 `}>
        <View style={tw`relative right-0 p-4`}>
          {/* Bouton Menu (Visible seulement si le menu n'est pas ouvert) */}
          {!isOpen && (
            <TouchableOpacity
              onPress={() => setIsOpen(true)}
              style={tw`flex-row items-center justify-center w-12 h-12 bg-gray-300 rounded`}
            >
              <FontAwesome name="bars" size={20} color="white" />
            </TouchableOpacity>
          )}

          {/* Menu déroulant (2/3 de l'écran en largeur et hauteur pleine) */}
          {isOpen && (
            <View style={tw`absolute top-0 left-0 w-2/3 h-full bg-white shadow-md`}>
              <TouchableWithoutFeedback>
                <View style={tw`justify-between flex-1 p-4`}>
                  {/* Option Mon Profil */}
                  <TouchableOpacity style={tw`flex-row items-center p-4 bg-yellow-500 rounded-full`}>
                    <Icon name="user" size={20} color="black" style={tw`mr-2`} />
                    <Text style={tw`text-lg text-black`}>Mon Profil</Text>
                  </TouchableOpacity>

                  {/* Option Se Déconnecter en bas */}
                  <TouchableOpacity
                    style={tw`flex-row items-center p-4`}
                    onPress={() => setIsOpen(false)} // Fermer le menu
                  >
                    <Icon name="sign-out" size={20} color="black" style={tw`mr-2`} />
                    <Text style={tw`text-lg text-black`}>Se Déconnecter</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
        </View>

        {/* Conteneur des cartes */}
        <View style={tw`flex-row justify-between m-1`}>
          {/* Première carte */}
          <View style={tw`w-6/12 m-1`}>
            <Card style={tw`shadow-lg`}>
              <Card.Title
                title="wynwood"
                subtitle="September 14, 2016"
                
                titleStyle={tw`text-lg text-black`}
                subtitleStyle={tw`text-sm text-gray-500`}
              />

              <Card.Cover
                source={require('../images/img1.jpg')}
                style={tw`w-full h-32`} // Hauteur ajustée pour rendre la carte plus petite
              />

              <Card.Content>
                <Paragraph style={tw`text-gray-700`}>
                  This impressive paella is a perfect party dish and a fun meal to cook together.
                </Paragraph>
              </Card.Content>

              <Card.Actions style={tw`flex-row justify-between`}>
                <IconButton icon="heart" onPress={() => {}} style={tw`p-2`} />
                <IconButton
                  icon={expanded ? "chevron-up" : "chevron-down"}
                  onPress={() => setExpanded(!expanded)}
                  style={tw`p-2`}
                />
              </Card.Actions>

              {expanded && (
                <Card.Content>
                  <Paragraph style={tw`text-gray-700`}>
                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.
                  </Paragraph>
                  <Paragraph style={tw`text-gray-700`}>
                    Heat oil in a large pan, add chicken, shrimp and chorizo, and cook until browned.
                  </Paragraph>
                </Card.Content>
              )}
            </Card>
          </View>

          {/* Deuxième carte */}
          <View style={tw`w-6/12 m-1`}>
            <Card style={tw`shadow-lg`}>
              <Card.Title
                title="Shrimp and Chorizo Paella"
                subtitle="September 14, 2016"
                
                
                titleStyle={tw`text-lg text-black`}
                subtitleStyle={tw`text-sm text-gray-500`}
              />

              <Card.Cover
                source={{ uri: "https://source.unsplash.com/600x400/?paella" }}
                style={tw`w-full h-32`} // Hauteur ajustée pour rendre la carte plus petite
              />

              <Card.Content>
                <Paragraph style={tw`text-gray-700`}>
                  This impressive paella is a perfect party dish and a fun meal to cook together.
                </Paragraph>
              </Card.Content>

              <Card.Actions style={tw`flex-row justify-between`}>
                <IconButton icon="heart" onPress={() => {}} style={tw`p-2`} />
                <IconButton
                  icon={expanded ? "chevron-up" : "chevron-down"}
                  onPress={() => setExpanded(!expanded)}
                  style={tw`p-2`}
                />
              </Card.Actions>

              {expanded && (
                <Card.Content>
                  <Paragraph style={tw`text-gray-700`}>
                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.
                  </Paragraph>
                  <Paragraph style={tw`text-gray-700`}>
                    Heat oil in a large pan, add chicken, shrimp and chorizo, and cook until browned.
                  </Paragraph>
                </Card.Content>
              )}
            </Card>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AcceuilPage;
