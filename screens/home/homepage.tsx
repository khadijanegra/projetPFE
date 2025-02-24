import React from "react";
import * as Animatable from "react-native-animatable";
import { View, Text, TouchableOpacity, Image } from "react-native";
import tw from "tailwind-react-native-classnames";

const homepage = ({ navigation }: { navigation: any }) => {
  const goTo = () => navigation.navigate("Login");
  const GoTO = () => navigation.navigate("signup");
  return (
    <View style={tw`items-center justify-center flex-1 px-6 bg-white`}>
      <View style={tw`items-center mb-12`}>
        <Image
          source={require("../../images/home.png")}
          style={tw`shadow-lg h-50 w-50`}
        />
      </View>

      <Text
        style={tw`mb-6 text-2xl font-bold tracking-wide text-center text-black font-cursive`}
      >
        Bienvenue sur BonPlan
      </Text>

      <View>
        <Animatable.View>
          <TouchableOpacity
            style={tw`w-full py-2 mt-5 bg-black rounded-full px-14`}
            onPress={goTo}
          >
            <Text style={tw`text-lg text-center text-white`}>Se Connecter</Text>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View>
          <TouchableOpacity
            style={tw`w-full py-2 mt-3 mb-5 bg-black rounded-full px-14`}
            onPress={GoTO}
          >
            <Text style={tw`text-lg text-center text-white`}>S'inscrire</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </View>
  );
};
//khadij nhebekk barchaaaaaaaaaaaaaaaaaaaaaaa

export default homepage;
