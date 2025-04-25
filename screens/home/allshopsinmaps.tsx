import React, { useCallback, useState, useEffect } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import tw from "tailwind-react-native-classnames";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from 'expo-linear-gradient';

const apiUrl = process.env.API_URL;

const LocationsMap = (props: any) => {
  interface shop {
    _id: string;
    shop_nom: string;
    shop_local: string;
    coordinates?: { latitude: number; longitude: number } | null;
    categorie?: string;
    service?: string[];
    shop_desc?: String;
  }

  interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }
  const [shops, setshops] = useState<shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedShop, setSelectedShop] = useState<shop | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);

  const extractCoordinates = (url: String) => {
    const regex = /@([-?\d.]+),([-?\d.]+)/;
    const match = url.match(regex);
    if (match) {
      const latitude = parseFloat(match[1]);
      const longitude = parseFloat(match[2]);
      return { latitude, longitude };
    } else {
      return null;
    }
  };

  const fetchshops = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/shops/getallshops`);
      const shopsdata = response.data.map(shop => {
        const coordinates = extractCoordinates(shop.shop_local);
        return { ...shop, coordinates };
      });
      setshops(shopsdata);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching establishments:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchshops();
  }, [fetchshops]);

  const getShopsWithinRegion = (region: Region) => {
    return shops.filter(shop => {
      if (!shop.coordinates) return false;
      const { latitude, longitude } = shop.coordinates;
      return (
        latitude >= region.latitude - region.latitudeDelta &&
        latitude <= region.latitude + region.latitudeDelta &&
        longitude >= region.longitude - region.longitudeDelta &&
        longitude <= region.longitude + region.longitudeDelta
      );
    });
  };

  const handleRegionChange = (region: Region) => {
    setCurrentRegion(region);
  };

  const getMapRegion = () => {
    if (shops.length === 0) return null;
    const latitudes = shops
      .map(i => i.coordinates)
      .filter(coords => coords !== null)
      .map(coords => coords.latitude);

    const longitudes = shops
      .map(i => i.coordinates)
      .filter(coords => coords !== null)
      .map(coords => coords.longitude);

    if (latitudes.length === 0 || longitudes.length === 0) return null;

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLon = Math.min(...longitudes);
    const maxLon = Math.max(...longitudes);

    const latitudeDelta = maxLat - minLat + 0.1;
    const longitudeDelta = maxLon - minLon + 0.1;
    const latitude = (minLat + maxLat) / 2;
    const longitude = (minLon + maxLon) / 2;

    return {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    };
  };

  const handleMarkerPress = (shopData: shop) => {
    setSelectedShop(shopData);
    setShowDetails(true);
  };

  const region = getMapRegion();

  const tunisiaRegion = {
    latitude: 33.8869,
    longitude: 9.5375,
    latitudeDelta: 5.0,
    longitudeDelta: 5.0,
  };

  const goToprofileshop = (shop: shop) => {
    props.navigation.navigate("profileshop", {
      shopId: shop._id,
      id: props.route.params.id,
    });
  };

  const getMarkerIconName = (categorie?: string) => {
    switch (categorie?.toLowerCase()) {
      case "restaurant":
        return "cutlery";
      case "café":
        return "coffee";
      case "hôtel":
        return "hotel";
      default:
        return "map-marker";
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category?.toLowerCase()) {
      case "restaurant":
        return "#e11d48";
      case "café":
        return "#10b981";
      case "hôtel":
        return "#3b82f6";
      default:
        return "#6b7280";
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {loading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={tw`mt-4 text-lg text-gray-700`}>Chargement des magasins...</Text>
        </View>
      ) : (
        <>
          <View style={tw`p-4`}>
            <Text style={tw`text-2xl font-bold text-gray-900 mb-2`}>Carte des Magasins</Text>
            <Text style={tw`text-gray-600 mb-4`}>Trouvez des magasins près de chez vous</Text>
            
            {region && (
              <View style={tw`rounded-2xl overflow-hidden shadow-xl`}>
                <MapView
                  style={tw`w-full h-72`}
                  mapType="standard"
                  showsUserLocation
                  minZoomLevel={10}
                  initialRegion={tunisiaRegion}
                  showsMyLocationButton={true}
                  onRegionChangeComplete={handleRegionChange}
                  customMapStyle={[
                    {
                      featureType: "poi",
                      elementType: "labels",
                      stylers: [{ visibility: "off" }],
                    },
                    {
                      featureType: "poi.business",
                      elementType: "all",
                      stylers: [{ visibility: "off" }],
                    },
                  ]}
                >
                  {shops.map((i, index) => {
                    const coordinates = i.coordinates;
                    if (!coordinates) return null;

                    return (
                      <Marker
                        key={index}
                        coordinate={{
                          latitude: coordinates.latitude,
                          longitude: coordinates.longitude,
                        }}
                        onPress={() => handleMarkerPress(i)}
                      >
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                          <View style={[tw`p-2 rounded-full`, { backgroundColor: 'rgba(255, 255, 255, 0.8)' }]}>
                            <Icon
                              name={getMarkerIconName(i.categorie)}
                              size={24}
                              color={getCategoryColor(i.categorie)}
                            />
                          </View>
                          <Text style={[tw`text-xs mt-1 text-center font-bold`, { color: getCategoryColor(i.categorie) }]}>
                            {i.shop_nom}
                          </Text>
                        </View>
                      </Marker>
                    );
                  })}
                </MapView>
              </View>
            )}
          </View>

          {currentRegion && (
            <View style={tw`px-4 mb-4`}>
              <Text style={tw`text-lg font-bold text-gray-900 mb-2`}>Magasins dans la zone</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`-mx-4`}>
                {getShopsWithinRegion(currentRegion).map((shop) => (
                  <TouchableOpacity 
                    key={shop._id} 
                    style={[tw`mx-2 p-3 rounded-xl shadow-sm`, { backgroundColor: 'white', width: 160 }]}
                    onPress={() => handleMarkerPress(shop)}
                  >
                    <View style={tw`flex-row items-center mb-1`}>
                      <View style={[tw`p-1 rounded-full mr-2`, { backgroundColor: `${getCategoryColor(shop.categorie)}20` }]}>
                        <Icon
                          name={getMarkerIconName(shop.categorie)}
                          size={14}
                          color={getCategoryColor(shop.categorie)}
                        />
                      </View>
                      <Text style={[tw`text-xs font-medium`, { color: getCategoryColor(shop.categorie) }]}>
                        {shop.categorie}
                      </Text>
                    </View>
                    <Text style={tw`text-sm font-bold text-gray-900`} numberOfLines={1}>{shop.shop_nom}</Text>
                    <Text style={tw`text-xs text-gray-500 mt-1`} numberOfLines={2}>{shop.shop_desc}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {selectedShop && showDetails && (
            <View style={[tw`absolute bottom-0 left-0 right-0 p-6 rounded-t-3xl`, { backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.1, shadowRadius: 8 }]}>
              <TouchableOpacity 
                style={tw`absolute top-4 right-4`}
                onPress={() => setShowDetails(false)}
              >
                <Icon name="times" size={20} color="#6b7280" />
              </TouchableOpacity>
              
              <View style={tw`flex-row items-start mb-4`}>
                <View style={[tw`p-3 rounded-lg mr-3`, { backgroundColor: `${getCategoryColor(selectedShop.categorie)}20` }]}>
                  <Icon
                    name={getMarkerIconName(selectedShop.categorie)}
                    size={24}
                    color={getCategoryColor(selectedShop.categorie)}
                  />
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-xl font-bold text-gray-900`}>{selectedShop.shop_nom}</Text>
                  <Text style={[tw`text-sm font-medium`, { color: getCategoryColor(selectedShop.categorie) }]}>
                    {selectedShop.categorie}
                  </Text>
                </View>
              </View>
              
              {selectedShop.shop_desc && (
                <Text style={tw`text-gray-600 mb-4`}>{selectedShop.shop_desc}</Text>
              )}

              {selectedShop.service && selectedShop.service.length > 0 && (
                <View style={tw`mb-4`}>
                  <Text style={tw`font-bold text-gray-900 mb-2`}>Services offerts :</Text>
                  <View style={tw`flex-row flex-wrap`}>
                    {selectedShop.service.map((service: string, index: number) => (
                      <View key={index} style={[tw`px-3 py-1 rounded-full mr-2 mb-2`, { backgroundColor: '#f3f4f6' }]}>
                        <Text style={tw`text-xs text-gray-700`}>{service}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              <TouchableOpacity
                style={tw`mt-2`}
                onPress={() => goToprofileshop(selectedShop)}
              >
                <LinearGradient
                  colors={[getCategoryColor(selectedShop.categorie), '#4f46e5']}
                  style={tw`p-3 rounded-xl items-center`}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={tw`text-white font-bold`}>Voir le Shop</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default LocationsMap;
