import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';  


export default function DeleteAccount(props : any) {
  const [password, setPassword] = useState("");
  const navigation = useNavigation();  // Utiliser le hook useNavigation pour accéder à la navigation

  const handleDeleteAccount = () => {
    if (password) {
      Alert.alert(
        "Confirmation",
        "Votre compte a été supprimé avec succès.",
        [
          {
            text: "OK",
            onPress: () => {
                props.navigation.navigate("firstpage");
            },
          },
        ]
      );
    } else {
      Alert.alert("Erreur", "Veuillez entrer votre mot de passe pour confirmer.");
    }
  };

  return (
    <ScrollView>
      <View style={tw`flex-1 bg-white p-4 bg-red-100`}>
        <Text style={tw`text-lg font-bold`}>Cher utilisateur ,</Text>
        <Text style={tw`text-lg mb-4`}>
          Si vous rencontrez un problème ou un élément qui ne vous convient pas, vous avez la possibilité de soumettre une réclamation.
        </Text>

        <Text style={tw`text-lg font-bold mb-2`}>📌Comment faire une réclamation ?</Text>
        <Text style={tw`text-lg mb-4`}>
          1. Accédez au menu latéral (Side Bar).{"\n"}
          2. Cliquez sur le bouton "Réclamation".{"\n"}
          3. Rédigez votre remarque ou réclamation en détail.{"\n"}
          4. Nous prendrons en compte votre demande avec la plus grande attention.
        </Text>

        <Text style={tw`text-lg font-bold mb-2`}>🔐Suppression de compte</Text>
        <Text style={tw`text-lg mb-6`}>
          Si vous souhaitez supprimer votre compte, veuillez saisir votre mot de passe pour confirmer cette action.
        </Text>

        <View style={tw`flex-row items-center w-full px-4 mb-4 border border-gray-300 rounded-full`}>
          <Icon name="lock" size={20} color="#888" style={tw`mr-2`} />
          <TextInput
            placeholder="Password"
            style={tw`flex-1 h-12`}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={tw`items-center justify-center w-full h-12 bg-black rounded-full`}
          onPress={handleDeleteAccount} // Appeler la fonction handleDeleteAccount
        >
          <Text style={tw`text-lg font-bold text-white`}>Confirmer</Text>
        </TouchableOpacity>

        <Text style={tw`mt-6 text-center text-gray-600`}>
          Nous restons à votre disposition pour toute assistance.
        </Text>
      </View>
    </ScrollView>
  );
}
