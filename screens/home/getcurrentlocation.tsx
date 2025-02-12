import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import tw from "tailwind-react-native-classnames";
import MapView, { Marker } from 'react-native-maps';

const LocationButton = () => {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getLocationHandler = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg("Veuillez Activez la localisation dans les paramètres.");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg("Erreur lors de la récupération de la localisation.");
    }
  };

  return (
    <View style={tw`items-center p-4`}>
      {/* bouton bech talla3 il localisation */}
      <TouchableOpacity 
        onPress={getLocationHandler} 
        style={tw`px-6 py-3 mt-4 bg-gray-400 rounded-full`}
      >
        <Text style={tw`font-bold text-white text-md`}>Déterminer ma position</Text>
      </TouchableOpacity>

      {/*affichage d'un message d'errerur en cas d'erreur */}
      {errorMsg ? <Text style={tw`mt-2 text-red-500`}>{errorMsg}</Text> : null}
        {/* affiche mte3 l'attitude w longitude detectee*/}
      {location && (
        <Text style={tw`mt-2 text-gray-700`}>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      )}

      {/* Carte Maps */}
      {location && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01, // Zoom plus précis
              longitudeDelta: 0.01,
            }}
          >
            {/* Marqueur de position */}
            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title="Vous êtes ici"
            />
          </MapView>
        </View>
      )}
    </View>
  );
};
// taille mte3 il carte : 
const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: 200, 
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default LocationButton;
