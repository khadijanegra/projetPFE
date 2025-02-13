import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity,Image,Modal,ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";

const PaymentForm = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={tw`bg-yellow-100 `} contentContainerStyle={tw`p-4`}>  
    <View style={tw`flex-1 p-6 bg-white bg-gray-100 rounded-lg`}>
      <View>
        <Text style={tw`mb-2 text-lg font-semibold text-gray-900`}>
          Nom de l'etablissement
        </Text>
        <TextInput
          style={tw`p-3 mb-4 text-gray-500 bg-gray-200 rounded-lg`}
          editable={true}
        />
      </View>

      <View>
        <Text style={tw`mb-2 text-lg font-semibold text-gray-900`}>
          Description
        </Text>
        <TextInput
          style={tw`w-full h-32 p-3 text-gray-500 bg-gray-200 rounded-lg`}
          placeholder="Enter description"
          multiline={true}
          textAlignVertical="top"
          editable={true}
        />
      </View>

      <Text style={tw`mb-2 text-lg font-semibold text-gray-900`}>
        Localisation URL
      </Text>
      <TextInput
        style={tw`p-3 mb-4 text-gray-500 bg-gray-200 rounded-lg shadow-xxl`}
        placeholder="1234 5678 9012 1314"
        editable={true}
      />

      <View style={tw`flex-row justify-between mb-4`}>
        <View style={tw`w-1/2 pr-2`}>
          <Text style={tw`mb-2 text-lg font-semibold text-gray-900`}>
            Date d'ouverture
          </Text>
          <TextInput
            style={tw`p-3 text-gray-500 bg-gray-200 rounded-lg`}
            placeholder="10/30"
            editable={false}
          />
        </View>
        <View style={tw`w-1/2 pl-2`}>
          <Text style={tw`mb-2 text-lg font-semibold text-gray-900`}>
            Date de férmeture
          </Text>
          <TextInput
            style={tw`p-3 text-gray-500 bg-gray-200 rounded-lg`}
            placeholder="123"
            editable={false}
          />
        </View>
      </View>
      <TouchableOpacity style={tw`p-4 mt-4 bg-yellow-500 rounded-lg`} onPress={() => setModalVisible(true)}>
        <Text style={tw`text-lg font-bold text-center text-white`}>Confirmer</Text>
      </TouchableOpacity>


      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={tw`items-center justify-center flex-1 bg-black bg-opacity-50`}>
          <View style={tw`items-center p-6 bg-white rounded-lg`}> 
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
    </View>
    </ScrollView>
  );
};

export default PaymentForm;
