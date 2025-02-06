import React from 'react';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Login from './login';

const Authentication = ({ navigation }: { navigation: any }) => {
  const goTo = () => navigation.navigate("Login");
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

      <Text style={tw`mb-12 text-3xl font-bold tracking-wide text-center text-black`}>
        Bienvenue sur BonPlan
      </Text>
      
      <Text style={tw`mb-6 text-lg font-bold text-center text-gray-500`}>
        Envie de nouvelles découvertes ?
        {'\n'}Trouvez les meilleurs endroits à visiter près de chez vous, aujourd'hui même !
      </Text>
      <View>
  <Animatable.View >
    <TouchableOpacity style={tw`w-full py-4 mt-10 bg-yellow-400 rounded-full px-14`}onPress={goTo}>
      <Text style={tw`text-lg font-bold text-center`}>Se Connecter</Text>
    </TouchableOpacity>
  </Animatable.View>
  <Animatable.View animation="bounce" iterationCount={2}>
    <TouchableOpacity style={tw`w-full py-4 mt-10 bg-yellow-400 rounded-full px-14`}>
      <Text style={tw`text-lg font-bold text-center`}>S'inscrire</Text>
    </TouchableOpacity>
  </Animatable.View>
</View>

    </View>
  );
};

export default Authentication;
