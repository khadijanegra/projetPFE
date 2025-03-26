import React, { useCallback, useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Animated, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

const apiUrl = process.env.API_URL;

const LocationsMap = () => {
  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Récupérer les établissements
  const fetchEstablishments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/shops/`);
      setEstablishments(response.data.shop_local);
      console.log(establishments)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching establishments:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEstablishments();
  }, [fetchEstablishments]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={tw`bg-white`}>
      <View style={tw`h-64`}>
        <MapView
          style={tw`w-full h-full`}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {establishments.map((establishment, index) => {
            const { latitude, longitude, name } = establishment;
            return (
              <Marker
                key={index}
                coordinate={{ latitude, longitude }}
                title={name}
                pinColor="#3b82f6"
              />
            );
          })}
        </MapView>
      </View>
      
      <View style={tw`p-4`}>
        {establishments.map((establishment, index) => (
          <View key={index} style={tw`mb-4 bg-white rounded-xl p-4 shadow-sm`}>
            <Text style={tw`text-lg font-semibold text-gray-900`}>{establishment.name}</Text>
            <Text style={tw`text-gray-600`}>{establishment.description}</Text>
            <Text style={tw`text-sm text-gray-500`}>{establishment.address}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default LocationsMap;
