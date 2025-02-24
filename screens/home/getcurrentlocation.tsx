// LocationButton.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator,Image} from 'react-native';
import * as Location from 'expo-location';
import tw from 'tailwind-react-native-classnames';
import MapView, { Marker } from 'react-native-maps';
import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from 'react-native-animatable';
import axios from "axios";

const LocationButton = (props: any) => {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const goto = () => {
    props.navigation.navigate("acceuilpage")
  }


  const getLocationHandler = async () => {
    try {
      setIsLoading(true);
  
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg("Veuillez activer la localisation dans les paramètres 🔒");
        setIsLoading(false);
        return;
      }
  
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      setErrorMsg(null);
  
      // 🔥 Envoie la localisation au backend
      const userId = props.route.params.id; // Remplace par l'ID réel de l'utilisateur
      console.log("********************************************" + userId);
      const API_URL = `http://localhost:3000/user/users/${userId}/localisation`;
  
      await axios.put(API_URL, {
        localisation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }
      });
  
      console.log("Localisation mise à jour avec succès ✅");
      
      setIsLoading(false);
  
      // 🔄 Redirection après mise à jour
      setTimeout(() => {
        props.navigation.navigate('acceuilpage',{id : userId});
      }, 3000);
  
    } catch (error) {
      console.error("Erreur API:", error);
      setErrorMsg("Oops! Une erreur est survenue 🌧️");
      setIsLoading(false);
    }
  };
  

  return (
    <View style={tw`items-center flex-1 p-6 bg-red-100`}>
      <Image 
          source={require("../../images/getcurrent.png")} // Assurez-vous que le chemin de l'image est correct
          style={tw`w-30 h-30 mb-6 ml-8 `} 
        />
      <Animatable.View 
        animation="fadeInDown"
        style={tw`items-center mb-8`}
      >
        <Text style={tw`mt-8 mb-4 text-2xl font-bold text-center text-black-900`}>
          Super! On vous localise... 🌐
        </Text>
        <Text style={tw`text-lg text-center text-gray-700`}>
          Préparez-vous à découvrir des merveilles près de chez vous!
        </Text>
      </Animatable.View>

      <Animatable.View 
        animation="pulse" 
        iterationCount="infinite"
        style={tw`items-center w-full`}
      >
        <TouchableOpacity 
          onPress={getLocationHandler} 
          disabled={isLoading}
          style={[
            tw`flex-row items-center px-8 py-4 bg-black rounded-full shadow-lg`,
            isLoading && tw`opacity-80`
          ]}
        >
          {isLoading ? (
            <ActivityIndicator color="white" style={tw`mr-2`} />
          ) : (
            <Text style={tw`mr-3 text-3xl`}>📍</Text>
          )}
          <Text style={tw`text-lg font-bold text-white`}>
            {isLoading ? 'Recherche en cours...' : 'Détecter ma position'}
          </Text>
        </TouchableOpacity>
      </Animatable.View>

      {errorMsg && (
        <Animatable.View 
          animation="shake"
          style={tw`p-3 mt-4 bg-red-100 rounded-lg`}
        >
          <Text style={tw`text-center text-red-600`}>⚠️ {errorMsg}</Text>
        </Animatable.View>
      )}

      {location && (
        <Animatable.View 
          animation="fadeInUp"
          style={tw`w-full mt-8`}
        >
          <View style={tw`mb-4 `}>
            <Text style={tw`mb-2 text-lg font-semibold text-center text-blue-900`}>
              🎯 Votre Position détectée!
            </Text>

          </View>

          <View style={tw`w-full h-64 overflow-hidden border-2 border-black-200 rounded-2xl`}>
            <MapView
              style={tw`w-full h-full`}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{ 
                  latitude: location.latitude, 
                  longitude: location.longitude 
                }}
                title="Vous êtes ici"
                pinColor="#3b82f6"
              />
            </MapView>
          </View>
          <View>
  <TouchableOpacity
    style={tw`flex-row items-center self-end justify-center px-12 py-4 mt-12 bg-yellow-400 rounded-full`}
    onPress={goto}
  >
    <Icon name="arrow-right" size={25} style={tw`mr-2`} />
    <Text style={tw`text-xl text-center text-black`}>Next</Text>
  </TouchableOpacity>
</View>
        </Animatable.View>
      )}
    </View>
  );
};

export default LocationButton;