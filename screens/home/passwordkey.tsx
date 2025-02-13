import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState }from "react";
import { View, Text, TextInput, TouchableOpacity ,Image,Modal , Animated} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import { useEffect } from "react";
import { useRef } from "react";


  export default function Passwordkey() {
 
  const [code , setCode] = useState("");
  const [password , setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
   const slideAnim = useRef(new Animated.Value(300)).current; // Position initiale en bas
  
    useEffect(() => {
      if (modalVisible) {
        Animated.timing(slideAnim, {
          toValue: 0, // Position finale (zéro signifie en haut)
          duration: 500,
          useNativeDriver: true,
        }).start();
      } else {
        slideAnim.setValue(300); // Réinitialiser avant la prochaine ouverture
      }
    }, [modalVisible]);

  return (
    <SafeAreaView style={tw`flex-1 p-4 bg-yellow-100`}>
      <Text style={tw`mb-6 text-2xl font-bold text-center`}>
        Réinitialisation du mot de passe
      </Text>

      <Text style={tw`mb-4 mr-48 text-center text`}>
      Entrez le code reçu : 
      </Text>

      <View style={tw`flex-row items-center w-full px-4 mb-4 border border-gray-300 rounded-full`}>
      <Icon name="lock" size={20} color="#888" style={tw`mr-2`} />
        <TextInput
          
          onChangeText={setCode}
          placeholder="Code "
          secureTextEntry={true}
          style={tw`flex-1 h-12`}
        />
      </View>
      <Text style={tw`mb-4 mr-20 text-center text`}>
      Choisissez un nouveau mot de passe :
      </Text>

      <View style={tw`flex-row items-center w-full px-4 mb-4 border border-gray-300 rounded-full`}>
      <Icon name="lock" size={20} color="#888" style={tw`mr-2`} />
        <TextInput
          
          onChangeText={setPassword}
          placeholder="nouveau mot de passe "
          secureTextEntry={true}
          style={tw`flex-1 h-12`}
        />
      </View>
      

      <TouchableOpacity style={tw`items-center justify-center w-full h-12 bg-yellow-500 rounded-full`} onPress={() => setModalVisible(true)}>
        <Text style={tw`text-lg font-bold text-center text-white`}>Confirmer</Text>
      </TouchableOpacity>


      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={tw`items-center justify-center flex-1 bg-black bg-opacity-50`}>

          
          <View style={tw`items-center p-6 bg-white rounded-lg`}> 
          <Animated.View
              style={[
                tw`items-center w-full p-6 bg-white rounded-t-2xl`,
                { transform: [{ translateY: slideAnim }] },
              ]}
            ></Animated.View>
            <Image 
              source={require('../../images/Illustration.png')}
              style={tw`w-32 h-32 mb-4`} 
            />
            <Text style={tw`mb-4 text-lg font-semibold text-gray-900`}>     Création enregistrée !{'\n'} merci pour votre confiance</Text>
            <TouchableOpacity style={tw`p-3 px-6 bg-yellow-400 rounded-xl`} onPress={() => setModalVisible(false)}>
              <Text style={tw`font-bold text-center text-black-500`}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}