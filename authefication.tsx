import React from 'react';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Login from './login';


const Authentication = ({ navigation }: { navigation: any }) => {
  const goTo = () => navigation.navigate("Login");
  const GoTO = () => navigation.navigate("creation")
  return (
    <View style={tw`items-center justify-center flex-1 px-6 bg-gray-200`}>

      <View style={tw`mb-12 w-60 h-60`}>
        <LottieView
          source={require('./assets/animation_logo.json')} // Format JSON
          autoPlay
          loop
          style={tw`flex-1`}
          speed={1.2}
        />
      </View>

      <Text style={tw`mb-6 text-2xl font-bold tracking-wide text-center text-black font-cursive`}>
        Bienvenue sur BonPlan
      </Text>
      
      <Text style={tw`mb-6 font-bold text-center text-gray-500 text-md`}>
      Envie de vivre de nouvelles 
      {"\n"} expériences !
      </Text>
      <View>
  <Animatable.View>
    <TouchableOpacity style={tw`w-full py-2 mt-5 bg-yellow-400 rounded-full px-14`} onPress={goTo}>
      <Text style={tw`text-lg text-center`}>Se Connecter</Text>
    </TouchableOpacity>
  </Animatable.View>
  <Animatable.View>
    <TouchableOpacity style={tw`w-full py-2 mt-3 mb-5 bg-yellow-400 rounded-full px-14`} onPress={GoTO}>
      <Text style={tw`text-lg text-center`}>S'inscrire</Text>
    </TouchableOpacity>
  </Animatable.View>
</View>

    </View>
  );
};

export default Authentication;
