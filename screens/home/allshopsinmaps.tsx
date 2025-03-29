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
  }
  // w sta3malneh linaa fi type 
  const [shops, setshops] = useState<shop[]>([]);
  const [loading, setLoading] = useState(true);



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
      const response = await axios.get(`${apiUrl}/shops/`);
      
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
    <ScrollView style={tw`bg-white`}>
     
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
                  onPress={() => goToprofileshop(i)}
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
    </ScrollView>
  );
};

export default LocationsMap;
