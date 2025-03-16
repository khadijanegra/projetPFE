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
        𝗘𝘅𝗽𝗹𝗼𝗿𝗲𝘇 𝗹𝗲 𝗠𝗼𝗻𝗱𝗲 𝗔𝘂𝘁𝗼𝘂𝗿 𝗱𝗲 𝗩𝗼𝘂𝘀  🌍 !
        </Text>
        <Text style={tw`mb-8 text-lg text-center text-gray-600`}>
        𝐴𝑐𝑡𝑖𝑣𝑒𝑧 𝑣𝑜𝑡𝑟𝑒 𝑙𝑜𝑐𝑎𝑙𝑖𝑠𝑎𝑡𝑖𝑜𝑛 𝑝𝑜𝑢𝑟 𝑑𝑒́𝑐𝑜𝑢𝑣𝑟𝑖𝑟 𝑑𝑒𝑠 𝑡𝑟𝑒́𝑠𝑜𝑟𝑠 𝑐𝑎𝑐ℎ𝑒́𝑠 𝑝𝑟𝑒̀𝑠 𝑑𝑒 𝑐ℎ𝑒𝑧 𝑣𝑜𝑢𝑠 !
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
          <Text style={tw`text-xl font-bold text-white`}>𝐎𝐮𝐢, 𝐜'𝐞𝐬𝐭 𝐩𝐚𝐫𝐭𝐢 ! 🚀</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('acceuilpage' ,{id})}
          
          style={tw`px-8 py-4 border-2 border-red-300 rounded-full`}
        >
          <Text style={tw`text-lg text-black-500`}>𝐍𝐨𝐧 𝐦𝐞𝐫𝐜𝐢, 𝐩𝐥𝐮𝐬 𝐭𝐚𝐫𝐝</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default LocationDemand;