// LocationButton.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import tw from 'tailwind-react-native-classnames';
import MapView, { Marker } from 'react-native-maps';
import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from 'react-native-animatable';

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
      // chnit2akdou idha il localisation activee walee 
      // idha hiya activee ya3nii il status chitkoun granted 
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // idha michy granted famma ce message d'erreur
        setErrorMsg("Veuillez activer la localisation dans les paramètres 🔒");
        setIsLoading(false);
        return;
      }
// idha il location ma7loulaa donc chnistokiw il location illi l9inehaa linaa fil location variable 
      const location = await Location.getCurrentPositionAsync({});
      // ba3ed ma 5dhyna il location chne5dhiu l'attitude w langitude mte3haa bil coords 
      setLocation(location.coords);
      setErrorMsg(null);
      setIsLoading(false);
// idha tous ca passe bien chnet3adew lil page d'axcceuil snn hana rekchin 
      setTimeout(() => {
        props.navigation.navigate('acceuilpage');
      }, 3000);
    } catch (error) {
      setErrorMsg("Oops! Une erreur est survenue 🌧️");
      setIsLoading(false);
    }
  };

  return (
    <View style={tw`items-center flex-1 p-6 bg-yellow-100`}>
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
            tw`flex-row items-center px-8 py-4 bg-yellow-400 rounded-full shadow-lg`,
            isLoading && tw`opacity-80`
          ]}
        >
          {isLoading ? (
            <ActivityIndicator color="white" style={tw`mr-2`} />
          ) : (
            <Text style={tw`mr-3 text-3xl`}>📍</Text>
          )}
          <Text style={tw`text-lg font-bold text-black`}>
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