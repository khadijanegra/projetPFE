import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';

export default function Login() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}> 
      <View style={tw`items-center justify-center flex-1 px-6`}> 
        <Text style={tw`mb-6 text-2xl font-bold`}>Sign Up</Text>
        
      
        <TextInput
          placeholder="Email address"
          style={tw`w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg`}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={tw`w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg`}
        />

        <View style={tw`flex-row items-center mb-4`}> 
          
          <Text style={tw`text-gray-700`}>I accept Privacy Policy + Terms of Use</Text>
        </View>

        <TouchableOpacity style={tw`items-center justify-center w-full h-12 mb-6 bg-yellow-500 rounded-lg`}>
          <Text style={tw`text-lg font-bold text-white`}>Create Account</Text>
        </TouchableOpacity>

        <Text style={tw`mb-4 text-gray-500`}>Or continue with</Text>

        <View style={tw`flex-row justify-center`}> 
          <TouchableOpacity style={tw`mx-2`}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }} style={tw`w-10 h-10`} />
          </TouchableOpacity>
          <TouchableOpacity style={tw`mx-2`}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' }} style={tw`w-10 h-10`} />
          </TouchableOpacity>
          <TouchableOpacity style={tw`mx-2`}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png' }} style={tw`w-10 h-10`} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
