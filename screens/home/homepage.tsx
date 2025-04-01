import React from "react";
import * as Animatable from "react-native-animatable";
import { View, Text, TouchableOpacity, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const homepage = ({ navigation }: { navigation: any }) => {
  const goTo = () => navigation.navigate("Login");
  const GoTO = () => navigation.navigate("signup");
  return (
    <View style={tw`items-center justify-center flex-1 px-6 bg-white`}>
        <View style={tw` mr-52 mb-12`}>
          <Image
            source={require("../../images/shape.png")}
            style={{
              width: width * 0.5, // Ajuste la largeur de l'image
              height: width * 0.5, // Assure la même hauteur pour une image carrée
              aspectRatio: 1, // Garde les proportions carrées
            }}
          />
        </View>
      <View style={tw`items-center mb-12`}>
        <Image
          source={require("../../images/home.png")}
          style={tw`shadow-lg h-50 w-50`}
        />
      </View>

      <Text
        style={tw`mb-6 text-2xl font-bold tracking-wide text-center text-black font-cursive`}
      >
        𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐮𝐞 𝐬𝐮𝐫 𝐁𝐨𝐧𝐏𝐥𝐚𝐧
      </Text>

      <View>
        <Animatable.View>
          <TouchableOpacity
            style={tw`w-full py-2 mt-5 bg-black rounded-full px-14`}
            onPress={goTo}
          >
            <Text style={tw`text-lg text-center text-white`}>𝐒𝐞 𝐂𝐨𝐧𝐧𝐞𝐜𝐭𝐞𝐫</Text>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View>
          <TouchableOpacity
            style={tw`w-full py-2 mt-3 mb-5 bg-black rounded-full px-14`}
            onPress={GoTO}
          >
            <Text style={tw`text-lg text-center text-white`}>𝐒'𝐢𝐧𝐬𝐜𝐫𝐢𝐫𝐞</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </View>
  );
};
//khadij nhebekk barchaaaaaaaaaaaaaaaaaaaaaaa

export default homepage;
