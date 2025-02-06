import { CheckBox } from '@rneui/themed';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';

export default function Login({}) {
  const [checked, setChecked] = React.useState(true);
     const toggleCheckbox = () => setChecked(!checked);
  return (
    <SafeAreaView style={tw`flex-1 p-2 bg-gray-200`}> 
      <View style={tw`items-center justify-center flex-1 px-6`}> 
        <Text style={tw`mb-6 text-2xl font-bold`}>Se Connecter</Text>
        
      
        <TextInput
          placeholder="l'adresse E-mail"
          style={tw`w-full h-12 max-w-md px-4 mb-4 border border-gray-500 rounded-full`}
        />
        <TextInput
          placeholder="mot de passe "
          secureTextEntry
          style={tw`w-full h-12 max-w-md px-4 mb-4 border border-gray-500 rounded-full`}
        />

        <View style={tw`flex-row items-center mb-3 mr-4`}> 
        <CheckBox
           checked={checked}
           onPress={toggleCheckbox}
           iconType="material-community"
           checkedIcon="checkbox-outline"
           uncheckedIcon={'checkbox-blank-outline'}
         />
          <Text style={tw`text-gray-700`}>J'accepte la Politique de confidentialité </Text>
        </View>

        <TouchableOpacity style={tw`items-center justify-center w-full h-12 max-w-md mb-6 bg-yellow-500 rounded-full`}>
          <Text style={tw`text-lg font-bold text-white`}>Suivant</Text>
        </TouchableOpacity>
        <Text style={tw`mb-2 text-gray-500`}>Vous n'avez pas encore un compte ?  </Text>
        <TouchableOpacity style={tw`items-center justify-center w-full h-12 max-w-md mb-6 bg-yellow-500 rounded-full`}>
          <Text style={tw`text-lg font-bold text-white`}>Créer un compte</Text>
        </TouchableOpacity>

        <Text style={tw`mb-4 text-gray-500`}>ou continuer avec </Text>

        <View style={tw`flex-row justify-center`}> 
          <TouchableOpacity style={tw`mx-2`}>
            <Image source={{ uri: 'https://img.icons8.com/?size=100&id=17949&format=png&color=000000' }} style={tw`w-12 h-10`} />
          </TouchableOpacity>
          <TouchableOpacity style={tw`mx-2`}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png' }} style={tw`w-10 h-10`} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
