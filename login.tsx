import { CheckBox } from "@rneui/themed";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Login({ navigation }: { navigation: any }) {
  const goTo = () => navigation.navigate("creation");
  const [checked, setChecked] = React.useState(true);
  const toggleCheckbox = () => setChecked(!checked);
  return (
    <SafeAreaView style={tw`flex-1 p-2 bg-gray-200`}>
      
      <View style={tw`items-center justify-center flex-1 px-6`}>
        <Text style={tw`mb-6 text-2xl font-bold`}>Se Connecter</Text>

        <View
          style={tw`flex-row items-center w-full px-4 mb-4 border border-gray-300 rounded-full`}
        >
          <Icon name="envelope" size={20} color="#888" style={tw`mr-2`} />
          {/* Icône pour email */}
          <TextInput
            placeholder="l'adresse E-mail"
            style={tw`flex-1 h-12`}
            // Assurez-vous que 'email' est défini dans votre état
            // setEmail doit être défini avec useState
          />
        </View>

        <View
          style={tw`flex-row items-center w-full px-4 mb-4 border border-gray-300 rounded-full`}
        >
          <Icon name="lock" size={20} color="#888" style={tw`mr-2`} />
          {/* Icône pour email */}
          <TextInput
            placeholder="Password"
            style={tw`flex-1 h-12`}
            // Assurez-vous que 'email' est défini dans votre état
            // setEmail doit être défini avec useState
          />
        </View>

        <View style={tw`flex-row items-center mb-3 mr-4`}>
          <CheckBox
            checked={checked}
            onPress={toggleCheckbox}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon={"checkbox-blank-outline"}
          />
          <Text style={tw`text-gray-700`}>
            J'accepte la Politique de confidentialité{" "}
          </Text>
        </View>

        <TouchableOpacity
          style={tw`items-center justify-center w-full h-12 max-w-md mb-6 bg-yellow-500 rounded-full`}
        >
          <Text style={tw`text-lg font-bold text-white`}>Suivant</Text>
        </TouchableOpacity>

        <Text style={tw`mb-4 text-gray-500`}>ou continuer avec </Text>

        <View style={tw`flex-row justify-center`}>
          <TouchableOpacity style={tw`mx-2`}>
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=17949&format=png&color=000000",
              }}
              style={tw`w-12 h-10`}
            />
          </TouchableOpacity>
          <TouchableOpacity style={tw`mx-2`}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
              }}
              style={tw`w-10 h-10`}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
