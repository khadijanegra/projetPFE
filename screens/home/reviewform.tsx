import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Modal,
  Animated,
  ActivityIndicator
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
const apiUrl = process.env.API_URL;


const Reviewform = (props: any) => {
  const [note_service, setRatingservice] = useState(0);
  const [note_ambiance, setRatingambiance] = useState(0);
  const [note_cuisine, setRatingcuisine] = useState(0);
  const [review_id, setReview_id] = useState("");
  const [commentaire, setReview] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [user_id , setuser_id]= useState("")
  const [ shop_id , setshop_id] = useState("")
  const [date, setDate] = useState("");
  const [reviewImages , setReviewImages] = useState<any>(null);



    const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [locationshop , setLocationshop] = useState<Location.LocationObjectCoords | null>(null);
    const [isNearby, setIsNearby] = useState(false);


    const getLocationHandler = async () => {
      setIsLoading(true); 
  
      const { status } = await Location.requestForegroundPermissionsAsync();
      // thabet est ce que location f telll mahloula ou nn 
      if (status !== 'granted') {
        setErrorMsg("Autorisation refusée. Activez la localisation.");
        setIsLoading(false);
        return;
      }
  // nestokiw location ili l9ineha fl variable location bl method getcurrentposition 
      const location = await Location.getCurrentPositionAsync({});
      //n7oto feha location ili l9ineha 
      setLocation(location.coords); // .cord : les cordonnees attitude longitude
      console.log(location.coords.altitude, location.coords.longitude); //jebnehom min navigation mn page profilshop 
      setErrorMsg(null);
      setIsLoading(false);
    };
   


    useEffect(() => {
      if (props.route.params?.coordinates) {
        setLocationshop(props.route.params.coordinates);
        console.log(props.route.params.coordinates);
      }
    }, [props.route.params?.coordinates]);


  
    const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371000; // Rayon de la Terre en mètres
      const toRad = (angle: number) => (Math.PI * angle) / 180;
    
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
    
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
      return R * c; // Distance en mètres
    };
    

    useEffect(() => {
      if (location && locationshop) {
        const distance = haversineDistance(
          location.latitude, 
          location.longitude, 
          locationshop.latitude, 
          locationshop.longitude
        );
    
        console.log(`Distance entre client et shop : ${distance.toFixed(2)} mètres`);
    
        if (distance <= 100000) {
          setIsNearby(true);
       } else {
        setIsNearby(false);
        }
      }
    }, [location, locationshop]);


  const pickReviewImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      const filename = uri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename || "");
      const type = match ? `image/${match[1]}` : "image";
  
      let formData = new FormData();
      formData.append("file", {
        uri,
        name: filename,
        type,
      } as any);
  
      try {
        const response = await fetch(`${apiUrl}/uploadreviewImage`, {

          method: "POST",
          body: formData,

          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        const responseText = await response.json(); // Assurez-vous que votre backend retourne un JSON avec le nom de l'image
        if (responseText.fileName) {
          setReviewImages(responseText.fileName); // Stocke le nom du fichier
          console.log("Nom du fichier uploadé :", responseText.fileName);
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };




  const handleSubmit = async () => {
    const currentDate = new Date().toISOString(); // Récupère la date actuelle au format ISO
      setDate(currentDate);
      
    const ReviewDtata = {
      note_service: note_service,
      note_ambiance: note_ambiance,
      note_cuisine: note_cuisine,
      commentaire: commentaire,
      user_id: props.route.params.user_id, 
      shop_id: props.route.params.shop_id,
      date: currentDate,
      reviewImages // ism il dossier illi chykounou fih les images 
    };
    
    try {
      const response = await axios.post(`${apiUrl}/review/postreviews`,ReviewDtata);
      if (response.status === 201) {
        console.log(note_ambiance);
        const review_id = response.data.id;
        setReview_id(review_id);
        setModalVisible(false)
        navigateToHome()
        console.log(props.route.params.user_id)
        return true;
      } else {
        Alert.alert("Erreur lors de la création de votre Review");
        return false;
      }
    } catch (error) {
      Alert.alert("Erreur lors de la connexion");
      return false;
    }
  };



  const [modalVisible, setModalVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(300)).current; // Position initiale en bas
  
    useEffect(() => {
      if (modalVisible) {
        Animated.timing(slideAnim, {
          toValue: 0, 
          duration: 500,
          useNativeDriver: true,
        }).start();
      } else {
        slideAnim.setValue(300); 
      }
    }, [modalVisible]);




    const navigateToHome = () => {
      console.log("Navigating to Home with user_id:", props.route.params.user_id);
      setModalVisible(false);
      props.navigation.navigate("acceuilpage", { id: props.route.params.user_id });
  };
  return (
    <ScrollView>
      <View style={tw`flex-1 p-5 bg-white`}>
        <Text style={tw`mb-4 text-lg text-gray-800 mr-15`}>
          Dites-nous ce que vous en pensez
        </Text>

        <View style={tw`items-center w-11/12 p-5 mx-auto mb-4 rounded-lg `}>
          {/* Image et titre */}
          <View style={tw`items-center mb-3`}>
            <Image
              source={require("../../images/service.png")}
              style={tw`w-24 h-24 border-4 border-gray-200 rounded-3xl`}
            />
            <Text style={tw`mt-2 text-lg font-bold text-gray-700`}>
              Service
            </Text>
          </View>

          {/* Étoiles de notation */}
          <View style={tw`flex-row justify-center mb-4`}>
            {[1, 2, 3, 4, 5].map((num) => (
              <TouchableOpacity key={num} onPress={() => setRatingservice(num)}>
                <FontAwesome
                  name={num <= note_service ? "star" : "star-o"}
                  size={35}
                  color={num <= note_service ? "#FFD700" : "gray"}
                  style={tw`mx-2`}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={tw`items-center w-11/12 p-5 mx-auto rounded-lg `}>
          {/* Image et titre */}
          <View style={tw`items-center mb-3`}>
            <Image
              source={require("../../images/ambiance.png")}
              style={tw`w-24 h-24 border-2 border-gray-200 rounded-3xl`}
            />
            <Text style={tw`mt-2 text-lg font-bold text-gray-700`}>
              Ambiance
            </Text>
          </View>

          {/* Étoiles de notation */}
          <View style={tw`flex-row justify-center`}>
            {[1, 2, 3, 4, 5].map((num) => (
              <TouchableOpacity
                key={num}
                onPress={() => setRatingambiance(num)}
              >
                <FontAwesome
                  name={num <= note_ambiance ? "star" : "star-o"}
                  size={35}
                  color={num <= note_ambiance ? "#FFD700" : "gray"}
                  style={tw`mx-2`}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={tw`items-center w-11/12 p-5 mx-auto rounded-lg `}>
          {/* Image et titre */}
          <View style={tw`items-center mb-3`}>
            <Image
              source={require("../../images/cuisine.png")}
              style={tw`w-24 h-24 border-2 border-gray-200 rounded-3xl`}
            />
            <Text style={tw`mt-2 text-lg font-bold text-gray-700`}>
              Cuisine
            </Text>
          </View>

          {/* Étoiles de notation */}
          <View style={tw`flex-row justify-center`}>
            {[1, 2, 3, 4, 5].map((num) => (
              <TouchableOpacity key={num} onPress={() => setRatingcuisine(num)}>
                <FontAwesome
                  name={num <= note_cuisine ? "star" : "star-o"}
                  size={35}
                  color={num <= note_cuisine ? "#FFD700" : "gray"}
                  style={tw`mx-2`}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={tw`w-11/12 p-5 mx-auto bg-white rounded-lg`}>
          {/* Champ de texte avec placeholder en haut et icône */}
          <View style={tw`relative p-4 border border-gray-300 rounded-lg`}>
            <Text style={tw`absolute text-lg text-gray-500 top-2 left-4`}>
              Votre avis
            </Text>
            <TextInput
              style={tw`pt-6 text-base text-gray-800 h-28`}
              placeholderTextColor="gray"
              value={commentaire}
              onChangeText={setReview}
              multiline
            />
            <TouchableOpacity
              style={tw`absolute top-3 right-3`}
              onPress={pickReviewImage}
            >
              <FontAwesome name="camera" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          {/* Affichage de l'image uploadée */}
          {image && (
            <Image
              source={{ uri: image }}
              style={tw`w-full h-40 mt-4 rounded-lg`}
            />
          )}

          {/* Bouton d'envoi */}

          <TouchableOpacity onPress={() => setModalVisible(true)} >
          <Text
            style={tw`p-4 text-lg font-bold text-center text-white bg-red-300 rounded-full mt-8`}
          >
            Publier mon avis 🌟
          </Text>
        </TouchableOpacity>

        <Modal animationType="fade" transparent={true} visible={modalVisible}>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
    <View style={{ width: 350, padding: 8, backgroundColor: 'white', borderRadius: 25, alignItems: 'center' }}>
      
     
      <Text style={{ fontSize: 15, color: 'gray-500', textAlign: 'center', marginBottom: 15 , marginTop:15 }}>
        Pour garantir l’authenticité des avis, votre localisation doit être verifiée près de l’établissement.
      </Text>

      <TouchableOpacity 
        onPress={getLocationHandler} 
        style={{ padding: 10, backgroundColor: 'black', borderRadius: 10, width: '100%', alignItems: 'center' }}
      >
        {isLoading ? <ActivityIndicator color="white" /> : <Text style={{ color: 'white' }}> 📍 Vérification de votre position</Text>}
      </TouchableOpacity>

      {errorMsg && <Text style={{ color: 'red', marginTop: 10 }}>{errorMsg}</Text>}

      {location && (
       <View style={tw`p-2`}>
       <MapView
          style={{ width: 300, height: 200, marginTop: 15, borderRadius: 40 ,  borderWidth: 2,   borderColor: "#000", overflow: "hidden",  }}
          showsUserLocation={true}
          minZoomLevel={15}  
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title="Votre position" />
        </MapView>
   
       <View style={tw` mt-6 p-3 rounded-lg`}>
         {isNearby ? (
           <>
             <Text style={tw`text-green-600  text-center p-3 font-bold text-lg`}>
               Vous êtes proche de l'établissement. votre avis sera envoyer !
             </Text>
             <TouchableOpacity
               style={tw`mt-3 bg-red-400 p-3 rounded-lg`}
               onPress={handleSubmit}
             >
               <Text style={tw`text-white text-center font-bold`}>
                 Publier 
               </Text>
             </TouchableOpacity>
           </>
         ) : (
           <Text style={tw`text-red-600 text-center font-bold text-lg`}>
             Vous êtes trop loin , Votre avis ne sera pas être publier .
           </Text>
         )}
       </View>
     </View>
      )}
      
      <TouchableOpacity 
        onPress={() => setModalVisible(false)} 
        style={tw `mt-3 bg-black p-3 rounded-lg`}
      >
        <Text style={tw`text-white text-center font-bold`}>Fermer</Text>
      </TouchableOpacity>

    </View>
  </View>
</Modal>
        </View>
      </View>
    </ScrollView>
  );
};
//gigigigigigigi
export default Reviewform;
