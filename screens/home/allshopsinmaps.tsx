import React, { useCallback, useState, useEffect } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity} from "react-native";
import tw from "tailwind-react-native-classnames";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";


const apiUrl = process.env.API_URL;

const LocationsMap = (props : any) => {
//7adharna typescript lil shop comme un type 
  interface shop {
    _id: string;
    shop_nom: string;
    shop_local: string;
    coordinates?: { latitude: number; longitude: number } | null;
    categorie?: string; 
    service?: string[];
    shop_desc?:String;

  }
  interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }
  
  // w sta3malneh linaa fi type 
  const [shops, setshops] = useState<shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedShop, setSelectedShop] = useState<shop | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null); // Pour suivre la région actuelle




  // Fonction bech nkharjou il attitude w langitude 
  const extractCoordinates = (url : String) => {
    const regex = /@([-?\d.]+),([-?\d.]+)/;
    const match = url.match(regex);

    if (match) {
      const latitude = parseFloat(match[1]);
      const longitude = parseFloat(match[2]);
      return { latitude, longitude };
    } else {
      return null; // Si aucune coordonnée n'est trouvée
    }
  };

  // jibnehom les shops bil API 
  const fetchshops = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/shops/getallshops`);
      
      // njibou les coordinates mte3 kol shop
      const shopsdata = response.data.map(shop => { // il establishmentsWithCoordinates chna3mlou feha hedha 
        //chnapplikiw il fcts mte3naa 3ala il shops.local_shop lkoll illi 3anna w nistokiwhom fil coordinates
        const coordinates = extractCoordinates(shop.shop_local);
        return { ...shop, coordinates }; // bech en cas de MAJ titbaddel linaa zeda 
      });

     
      // nistokiw  
      setshops(shopsdata); // affectation  lil establishmentsWithCoordinates fi establishements
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
    // Filtrer les magasins en fonction de la région actuelle de la carte
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
    setCurrentRegion(region); // Mettre à jour la région à chaque changement de la carte
  };

 
  // 
  const getMapRegion = () => {
    if (shops.length === 0) return null;
    // tawa fil establshments illi fehaa dinya lkollll chne5dhouhaa w ne5dhou min attitude w langitude ken mochhom null
    const latitudes = shops
      .map((i) => i.coordinates) /*khdhina min establishments il coorrdinates */
      .filter((coords) => coords !== null) /*khdhina minha ken ili michhom null */
      .map((coords) => coords.latitude ); /*khdhina min il coordinates ken il attitude  */

    const longitudes = shops
      .map((i) => i.coordinates)
      .filter((coords) => coords !== null)
      .map((coords) => coords.longitude);

    if (latitudes.length === 0 || longitudes.length === 0) return null;

    // Trouver les valeurs minimales et maximales pour la latitude et la longitude
    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLon = Math.min(...longitudes);
    const maxLon = Math.max(...longitudes);

     // ntal3ou il  marge mte3 il carte (il zoom milli5er)
    const latitudeDelta = maxLat - minLat + 0.1;
    const longitudeDelta = maxLon - minLon + 0.1;

    // ntal3ou il  le centre de la carte
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
    setShowDetails(true); // Toujours afficher les détails
  };
  
  const region = getMapRegion();

  const tunisiaRegion = {
    latitude: 33.8869, // Centre approximatif de la Tunisie
    longitude: 9.5375, // Centre approximatif de la Tunisie
    latitudeDelta: 5.0, // Largeur du zoom pour couvrir la Tunisie
    longitudeDelta: 5.0, // Largeur du zoom pour couvrir la Tunisie
  };

  const goToprofileshop = (shop: shop) => {
    props.navigation.navigate("profileshop", {
      shopId: shop._id, 
      id: props.route.params.id
   });
  }

  return (
    <ScrollView style={tw`bg-gray-200`}>
     <View style={tw`flex flex-col `} >
      <View style={tw`p-4`}>
        {/* Affichage de la carte avec tous les magasins */}
        {region && (
          <MapView
          style={tw`w-full h-64 rounded-lg shadow-lg`}
          mapType="standard"
          showsUserLocation
          minZoomLevel={10}
          initialRegion={tunisiaRegion}  
          showsMyLocationButton={true}
          onRegionChangeComplete={handleRegionChange}
          >
            {shops.map((i, index) => {
              const coordinates = i.coordinates;

              // Si les coordonnées sont null, ne pas afficher le marqueur
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
                    <Icon name="map-marker" size={30} color="#3b82f6" />
                    <Text style={tw`text-sm mt-2 text-center font-bold`}>
                      {i.shop_nom}
                    </Text>
                  </View>
                </Marker>
              );
            })}
          </MapView>
        )}
      </View>
      {currentRegion && (
          <View style={tw`p-4`}>
            <Text style={tw`text-lg font-bold`}>Magasins dans la zone actuelle :</Text>
            {getShopsWithinRegion(currentRegion).map((shop) => (
              <Text key={shop._id} style={tw`text-md text-gray-800`}>
                • {shop.shop_nom}
              </Text>
            ))}
          </View>
        )}
      {selectedShop && showDetails && (
  <View style={tw`p-4 bg-white shadow-lg rounded-lg mt-12 bottom-5 mx-4`}>
    <View style={tw`flex flex-row justify-between w-full `}>
    <Text style={tw`text-lg font-bold`}>{selectedShop.shop_nom}</Text>
    <Text style={tw`text-sm text-gray-600 `}> {selectedShop.categorie}</Text>
    </View>
    <Text style={tw`text-sm text-gray-600 mb-3 `}>{selectedShop.shop_desc}</Text>

    {selectedShop.service && selectedShop.service.length > 0 && (
      <View>
        {selectedShop.service.map((service: string, index: number) => (
          <Text key={index} style={tw`text-sm text-gray-600`}>
            • {service}
          </Text>
        ))}
      </View>
    )}

    <TouchableOpacity 
      style={tw`mt-2 bg-red-300 p-2 rounded-lg`} 
      onPress={() => goToprofileshop(selectedShop)}
    >
      <Text style={tw`text-black text-center font-bold`}>Voir le Shop</Text>
    </TouchableOpacity>
  </View>
)}
</View>
    </ScrollView>
  );
};

export default LocationsMap;
