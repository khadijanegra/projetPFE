import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';
import tw from 'tailwind-react-native-classnames';

export default function Login() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}> 
      <View style={tw`flex-1 items-center justify-center px-6`}> 
        <Text style={tw`text-2xl font-bold mb-6`}>Sign Up</Text>
        
        <TextInput
          placeholder="Name"
          style={tw`w-full h-12 border border-gray-300 rounded-lg px-4 mb-4`}
        />
        <TextInput
          placeholder="Email address"
          style={tw`w-full h-12 border border-gray-300 rounded-lg px-4 mb-4`}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={tw`w-full h-12 border border-gray-300 rounded-lg px-4 mb-4`}
        />

        <View style={tw`flex-row items-center mb-4`}> 
          
          <Text style={tw`text-gray-700`}>I accept Privacy Policy + Terms of Use</Text>
        </View>

        <TouchableOpacity style={tw`w-full h-12 bg-yellow-500 rounded-lg items-center justify-center mb-6`}>
          <Text style={tw`text-white text-lg font-bold`}>Create Account</Text>
        </TouchableOpacity>

        <Text style={tw`text-gray-500 mb-4`}>Or continue with</Text>

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
