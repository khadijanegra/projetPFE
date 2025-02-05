import React from 'react';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const Authentication = () => {
  return (
    <View style={tw`items-center justify-center flex-1 px-6 bg-gray-50`}>
<Text style={tw`mb-12 text-5xl font-bold tracking-wide text-center text-black-500 animate-bounce`}>
    LET'S GET STARTED 🚀
</Text>
      {/* Animation Lottie de localisation */}
      <View style={tw`mb-4 w-60 h-60`}>
        <LottieView
          source={require('./assets/animation_logo.json')} // Format JSON
          autoPlay
          loop
          style={tw`flex-1`}
          speed={1.2}
        />
      </View>

      <Text style={tw`mb-6 text-lg text-center text-black`}>
        Craving Delicious Food?
        {'\n'}We'll Bring It to You in No Time!
      </Text>

      <Animatable.View animation="bounce" iterationCount={1}>
        <TouchableOpacity style={tw`px-20 py-2 mt-12 bg-gray-200 rounded-full`}>
          <Text style={tw`py-4 text-lg font-bold text-white-50`}>Sign up</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default Authentication;