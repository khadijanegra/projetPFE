import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';  


export default function DeleteAccount(props : any) {
  const [password, setPassword] = useState("");
  const navigation = useNavigation();  // Utiliser le hook useNavigation pour accéder à la navigation

  const handleDeleteAccount = () => {
    if (password) {
      Alert.alert(
        "Confirmation",
        "Votre compte a été supprimé avec succès.",
        [
          {
            text: "OK",
            onPress: () => {
                props.navigation.navigate("firstpage");
            },
          },
        ]
      );
    } else {
      Alert.alert("Erreur", "Veuillez entrer votre mot de passe pour confirmer.");
    }
  };

  return (
    <ScrollView>
      <View style={tw`flex-1 bg-white p-4 bg-pink-100`}>
        <Text style={tw`text-lg font-bold`}>𝐂𝐡𝐞𝐫 𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫 ,</Text>
        <Text style={tw`text-lg mb-4`}>
        𝑆𝑖 𝑣𝑜𝑢𝑠 𝑟𝑒𝑛𝑐𝑜𝑛𝑡𝑟𝑒𝑧 𝑢𝑛 𝑝𝑟𝑜𝑏𝑙𝑒̀𝑚𝑒 𝑜𝑢 𝑢𝑛 𝑒́𝑙𝑒́𝑚𝑒𝑛𝑡 𝑞𝑢𝑖 𝑛𝑒 𝑣𝑜𝑢𝑠 𝑐𝑜𝑛𝑣𝑖𝑒𝑛𝑡 𝑝𝑎𝑠, 𝑣𝑜𝑢𝑠 𝑎𝑣𝑒𝑧 𝑙𝑎 𝑝𝑜𝑠𝑠𝑖𝑏𝑖𝑙𝑖𝑡𝑒́ 𝑑𝑒 𝑠𝑜𝑢𝑚𝑒𝑡𝑡𝑟𝑒 𝑢𝑛𝑒 𝑟𝑒́𝑐𝑙𝑎𝑚𝑎𝑡𝑖𝑜𝑛.        </Text>

        <Text style={tw`text-lg mb-2`}>📌𝐂𝐨𝐦𝐦𝐞𝐧𝐭 𝐟𝐚𝐢𝐫𝐞 𝐮𝐧𝐞 𝐫𝐞́𝐜𝐥𝐚𝐦𝐚𝐭𝐢𝐨𝐧 ?</Text>
        <Text style={tw`text-sm mb-4`}>
          1. 𝑨𝒄𝒄𝒆́𝒅𝒆𝒛 𝒂𝒖 𝒎𝒆𝒏𝒖 𝒍𝒂𝒕𝒆́𝒓𝒂𝒍 (𝑺𝒊𝒅𝒆 𝑩𝒂𝒓).{"\n"}
          2. 𝑪𝒍𝒊𝒒𝒖𝒆𝒛 𝒔𝒖𝒓 𝒍𝒆 𝒃𝒐𝒖𝒕𝒐𝒏 "𝑹𝒆́𝒄𝒍𝒂𝒎𝒂𝒕𝒊𝒐𝒏".{"\n"}
          3. 𝑹𝒆́𝒅𝒊𝒈𝒆𝒛 𝒗𝒐𝒕𝒓𝒆 𝒓𝒆𝒎𝒂𝒓𝒒𝒖𝒆 𝒐𝒖 𝒓𝒆́𝒄𝒍𝒂𝒎𝒂𝒕𝒊𝒐𝒏 𝒆𝒏 𝒅𝒆́𝒕𝒂𝒊𝒍.{"\n"}
          4. 𝑵𝒐𝒖𝒔 𝒑𝒓𝒆𝒏𝒅𝒓𝒐𝒏𝒔 𝒆𝒏 𝒄𝒐𝒎𝒑𝒕𝒆 𝒗𝒐𝒕𝒓𝒆 𝒅𝒆𝒎𝒂𝒏𝒅𝒆 𝒂𝒗𝒆𝒄 𝒍𝒂 𝒑𝒍𝒖𝒔 𝒈𝒓𝒂𝒏𝒅𝒆 𝒂𝒕𝒕𝒆𝒏𝒕𝒊𝒐𝒏.
        </Text>

        <Text style={tw`text-lg font-bold mb-2`}>🔐𝐒𝐮𝐩𝐩𝐫𝐞𝐬𝐬𝐢𝐨𝐧 𝐝𝐞 𝐜𝐨𝐦𝐩𝐭𝐞</Text>
        <Text style={tw`text-lg mb-6`}>
        𝘚𝘪 𝘷𝘰𝘶𝘴 𝘴𝘰𝘶𝘩𝘢𝘪𝘵𝘦𝘻 𝘴𝘶𝘱𝘱𝘳𝘪𝘮𝘦𝘳 𝘷𝘰𝘵𝘳𝘦 𝘤𝘰𝘮𝘱𝘵𝘦, 𝘷𝘦𝘶𝘪𝘭𝘭𝘦𝘻 𝘴𝘢𝘪𝘴𝘪𝘳 𝘷𝘰𝘵𝘳𝘦 𝘮𝘰𝘵 𝘥𝘦 𝘱𝘢𝘴𝘴𝘦 𝘱𝘰𝘶𝘳 𝘤𝘰𝘯𝘧𝘪𝘳𝘮𝘦𝘳 𝘤𝘦𝘵𝘵𝘦 𝘢𝘤𝘵𝘪𝘰𝘯.
        </Text>

        <View style={tw`flex-row items-center w-full px-4 mb-4 border border-gray-300 rounded-full`}>
          <Icon name="lock" size={20} color="#888" style={tw`mr-2`} />
          <TextInput
            placeholder="Password"
            style={tw`flex-1 h-12`}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={tw`items-center justify-center w-full h-12 bg-black rounded-full`}
          onPress={handleDeleteAccount} // Appeler la fonction handleDeleteAccount
        >
          <Text style={tw`text-lg font-bold text-white`}>𝗖𝗼𝗻𝗳𝗶𝗿𝗺𝗲𝗿</Text>
        </TouchableOpacity>

        <Text style={tw`mt-6 text-center text-gray-600`}>
          Nous restons à votre disposition pour toute assistance.
        </Text>
      </View>
    </ScrollView>
  );
}
