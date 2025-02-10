import React, { useState } from "react";
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import tw from "tailwind-react-native-classnames";
import { FontAwesome } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { Card, IconButton, Paragraph } from "react-native-paper";

const AcceuilPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={tw`flex-1`}>
      {/* Overlay et Menu */}
      {isOpen && (
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View
            style={[
              tw`absolute top-0 left-0 w-full h-full`,
              { backgroundColor: "rgba(202, 194, 194, 0.5)", zIndex: 50 }
            ]}
          >
            <View style={tw`w-2/3 h-full p-4 bg-white shadow-md`}>
              {/* Option Mon Profil */}
              <TouchableOpacity style={tw`flex-row items-center p-4 bg-yellow-500 rounded-full`}>
                <Icon name="user" size={20} color="black" style={tw`mr-2`} />
                <Text style={tw`text-lg text-black`}>Mon Profil</Text>
              </TouchableOpacity>

              {/* Option Se Déconnecter en bas */}
              <TouchableOpacity
                style={tw`flex-row items-center p-4 mt-auto`}
                onPress={() => setIsOpen(false)} // Fermer le menu
              >
                <Icon name="sign-out" size={20} color="black" style={tw`mr-2`} />
                <Text style={tw`text-lg text-black`}>Se Déconnecter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}

      {/* Bouton Menu */}
      <View style={tw`absolute z-10 top-4 left-4`}>
        <TouchableOpacity
          onPress={() => setIsOpen(true)}
          style={tw`flex-row items-center justify-center w-12 h-12 bg-gray-300 rounded-full`}
        >
          <FontAwesome name="bars" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Conteneur des cartes */}
      <View style={tw `flex flex-row justify-center flex-1 p-4 m-1 top-20 right-2`}>
        <View style={tw`flex-row justify-between w-full`}>
          {/* Première carte */}
          {[1, 2].map((index) => (
            <View key={index} style={tw`w-6/12 m-1`}>
              <Card style={tw`shadow-lg`}>
                <Card.Title title="Wynwood" subtitle="September 14, 2016" />
                <Card.Cover source={require("../images/img1.jpg")} style={tw`w-full h-32`} />
                <Card.Content>
                  <Paragraph>This impressive paella is a perfect party dish and a fun meal to cook together.</Paragraph>
                </Card.Content>
                <Card.Actions>
                  <IconButton icon="heart" onPress={() => {}} />
                  <IconButton
                    icon={expanded ? "chevron-up" : "chevron-down"}
                    onPress={() => setExpanded(!expanded)}
                  />
                </Card.Actions>
                {expanded && (
                  <Card.Content>
                    <Paragraph>Heat 1/2 cup of the broth in a pot until simmering...</Paragraph>
                  </Card.Content>
                )}
              </Card>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default AcceuilPage;
