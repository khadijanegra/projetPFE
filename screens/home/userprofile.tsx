import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity , ScrollView} from "react-native";
import tw from "tailwind-react-native-classnames";
import Getcurrentlocation from "./getcurrentlocation";

const UserProfile = () => {
  const [name, setName] = useState("Joyce Johnson");
  const [surname, setSurname] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  
  return (
    <ScrollView style={tw`flex-1 bg-yellow-100`} contentContainerStyle={tw`p-4`}>  
    <View style={tw`flex-1 p-4 `}>      
      {/* Header */}
      <View style={tw`items-center mt-4`}>      
        <Image 
          source={require('../../images/Illustration.png')}
          style={tw`w-40 h-40 border-4 border-white rounded-full shadow-lg`}
        />
      </View>
      
      {/* Personal Info */}
      <Text style={tw`mt-6 text-xl font-bold`}>Vos informations personnelles</Text>
      <View >   
       <View style={tw`p-4 mt-2 bg-gray-100 rounded-lg shadow-lg`}>      
        <Text style={tw`text-lg font-bold text-gray-600`}>Votre nom</Text>
        <TextInput 
          style={tw`p-4 mt-1 bg-white border border-gray-300 rounded-lg`}
          value={name}
          onChangeText={setName}
          editable={isEditing}
        />
        </View>
        <View style={tw`p-4 mt-2 bg-gray-100 rounded-lg shadow-lg`}>      
        <Text style={tw`text-lg font-bold text-gray-600`}>Votre prenom</Text>
        <TextInput 
          style={tw`p-4 mt-1 bg-white border border-gray-300 rounded-lg`}
          value={name}
          onChangeText={setSurname}
          editable={isEditing}
        />
        </View>
      
      </View>
      
      {/* Contact Info */}
      <Text style={tw`mt-6 text-xl font-bold`}>Coordonnées</Text>
      <View style={tw`p-4 mt-2 bg-gray-100 rounded-lg shadow-lg`}>        
        <Text style={tw`text-gray-600`}>votre localisation </Text> 
        <View>
        {/* 3abiha bil localisation */}
        </View>
        <Text style={tw`mt-2 text-gray-600`}>Email <Text style={tw`font-bold text-black`}>user@mail.com</Text></Text>
      </View>
      
      {/* Edit Button */}
      <TouchableOpacity 
          style={tw`items-center py-3 mt-6 ${isEditing ? 'bg-pink-400' : 'bg-yellow-500'} rounded-lg`} 
          onPress={() => setIsEditing(!isEditing)}
        >      
          <Text style={tw`text-lg font-bold text-white`}>{isEditing ? "Enregistrer" : "Éditer le profil"}</Text>
        </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

export default UserProfile;
