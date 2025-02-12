import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native"; // Import navigation
import tw from "tailwind-react-native-classnames";

export default function Password({ navigation }: { navigation: any }) {


  const goo = () => {
    navigation.navigate("passwordkey");
  };

  const [email, setEmail] = useState("");

  return (
    <SafeAreaView style={tw`flex-1 p-4 bg-gray-200`}>
      <Text style={tw`text-2xl font-bold text-center mb-6`}>
        Réinitialisation du mot de passe
      </Text>

      <Text style={tw`text text-center mb-4 mr-20`}>
        Saisissez votre adresse e-mail :
      </Text>

      <View style={tw`flex-row items-center w-full px-4 mb-4 border border-gray-300 rounded-full`}>
        <Icon name="lock" size={20} color="#888" style={tw`mr-2`} />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          style={tw`flex-1 h-12`}
        />
      </View>

      <TouchableOpacity
        style={tw`items-center justify-center w-full h-12 bg-yellow-500 rounded-full`}
        onPress={goo} // Appeler la fonction goo
      >
        <Text style={tw`text-lg font-bold text-white`}>Confirmer</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
