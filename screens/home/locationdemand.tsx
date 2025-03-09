// WelcomeScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import * as Animatable from 'react-native-animatable';

const LocationDemand = (props: any) => {
  let id = props.route.params.id;
  console.log(id);
  return (
    <View style={tw`items-center justify-center flex-1 p-8 bg-red-100`}>
      <Animatable.View 
        animation="bounceIn" 
        duration={2000}
        style={tw`items-center mb-10`}
      >
        <Image
          source={require("../../images/demandeloc.png")}
          style={tw`w-64 h-64 mb-8`}
        />
        <Text style={tw`mb-4 text-3xl font-bold text-center text-black-200`}>
         Explorez le Monde Autour de Vous  🌍 !
        </Text>
        <Text style={tw`mb-8 text-lg text-center text-gray-600`}>
          Activez votre localisation pour découvrir des trésors cachés près de chez vous !
        </Text>
      </Animatable.View>

      <Animatable.View 
        animation="fadeInUp" 
        duration={1500}
        style={tw`items-center w-full`}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate('getcurrentlocation',{id})}
          style={tw`px-8 py-4 mb-4 bg-black rounded-full shadow-xl`}
        >
          <Text style={tw`text-xl font-bold text-white`}>Oui, c'est parti ! 🚀</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('acceuilpage' ,{id})}
          
          style={tw`px-8 py-4 border-2 border-red-300 rounded-full`}
        >
          <Text style={tw`text-lg text-black-500`}>Non merci, plus tard</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default LocationDemand;