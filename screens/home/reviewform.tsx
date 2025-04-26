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
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const apiUrl = process.env.API_URL;

const Reviewform = (props: any) => {
  // États existants
  const [note_service, setRatingservice] = useState(0);
  const [note_ambiance, setRatingambiance] = useState(0);
  const [note_cuisine, setRatingcuisine] = useState(0);
  const [commentaire, setReview] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [reviewImages, setReviewImages] = useState<any>(null);
  const [date, setDate] = useState("");
  
  // États pour la localisation
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [locationshop, setLocationshop] = useState<Location.LocationObjectCoords | null>(null);
  const [isNearby, setIsNearby] = useState(false);
  
  // États pour la vérification
  const [resultaaa, setresultaaa] = useState("");
  const [quality, setquality] = useState("");
  const [status, setstatus] = useState("");
  const [iscompatibel, setiscompatible] = useState(true);
  
  // États pour le modal
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  // Thème et styles
  const theme = {
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#ef4444",
    background: "#f8fafc",
    text: "#1e293b",
    border: "#e2e8f0",
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background,
    },
    section: {
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    ratingContainer: {
      alignItems: 'center',
      padding: 16,
      marginBottom: 8,
    },
    ratingImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 2,
      borderColor: theme.border,
      marginBottom: 8,
    },
    ratingTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 8,
    },
    starContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 8,
    },
    star: {
      marginHorizontal: 4,
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      minHeight: 120,
    },
    inputLabel: {
      position: 'absolute',
      top: 8,
      left: 12,
      color: theme.text,
      opacity: 0.6,
    },
    submitButton: {
      backgroundColor: theme.primary,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      width: '90%',
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 20,
      alignItems: 'center',
    },
    map: {
      width: '100%',
      height: 200,
      borderRadius: 8,
      marginVertical: 12,
    },
  });

  // Fonctions existantes (conservées inchangées)
  const getLocationHandler = async () => {
    setIsLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg("Autorisation refusée. Activez la localisation.");
      setIsLoading(false);
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
    setErrorMsg(null);
    setIsLoading(false);
  };

  const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371000;
    const toRad = (angle: number) => (Math.PI * angle) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

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
  
        const responseText = await response.json();
        if (responseText.fileName) {
          setReviewImages(responseText.fileName);
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  const handleSubmit = async () => {
    const currentDate = new Date().toISOString();
    setDate(currentDate);
    
    const ReviewDtata = {
      note_service,
      note_ambiance,
      note_cuisine,
      commentaire,
      user_id: props.route.params.user_id, 
      shop_id: props.route.params.shop_id,
      date: currentDate,
      reviewImages
    };
    
    try {
      const response = await axios.post(`${apiUrl}/review/postreviews`, ReviewDtata);
      if (response.status === 201) {
        setModalVisible(false);
        navigateToHome();
      } else {
        Alert.alert("Erreur lors de la création de votre Review");
      }
    } catch (error) {
      Alert.alert("Erreur lors de la connexion");
    }
  };

  const verificationreview = async () => {
    try {
      const response = await axios.post(`${apiUrl}/analyse-review/`, {
        texte: commentaire,
      });

      const { statusReview, imageQuality } = response.data;
      const moyenne = (note_service + note_ambiance + note_cuisine) / 3;

      const compatibleComment = !(
        (statusReview === 'good' && moyenne < 2.5) ||
        (statusReview === 'not good' && moyenne >= 2.5)
      );

      const compatibleImage = !reviewImages || imageQuality === 'clear';

      const everythingIsCompatible = compatibleComment && compatibleImage && statusReview === 'good';

      setstatus(statusReview);
      setquality(imageQuality);
      setiscompatible(everythingIsCompatible);

      if (!compatibleComment) {
        setresultaaa("❌ Incohérence entre les notes et le commentaire.");
      } else if (!compatibleImage) {
        setresultaaa("⚠️ Image inappropriée ou floue.");
      } else if (statusReview === 'not good') {
        setresultaaa("⚠️ Commentaire toxique ou inapproprié.");
      } else {
        setresultaaa("✅ Avis validé !");
      }

      setModalVisible(true);
    } catch (error) {
      console.error("Erreur lors de l'analyse du commentaire:", error);
      setresultaaa("❌ Une erreur est survenue.");
    }
  };

  const navigateToHome = () => {
    props.navigation.navigate("acceuilpage", { id: props.route.params.user_id });
  };

  // Effets
  useEffect(() => {
    if (props.route.params?.coordinates) {
      setLocationshop(props.route.params.coordinates);
    }
  }, [props.route.params?.coordinates]);

  useEffect(() => {
    if (location && locationshop) {
      const distance = haversineDistance(
        location.latitude, 
        location.longitude, 
        locationshop.latitude, 
        locationshop.longitude
      );
      setIsNearby(distance <= 8000000000000);
    }
  }, [location, locationshop]);

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

  // Composant d'évaluation réutilisable
  const RatingSection = ({ title, imageSource, rating, setRating }: {
    title: string;
    imageSource: any;
    rating: number;
    setRating: (value: number) => void;
  }) => (
    <View style={styles.ratingContainer}>
      <Image source={imageSource} style={styles.ratingImage} />
      <Text style={styles.ratingTitle}>{title}</Text>
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((num) => (
          <TouchableOpacity key={num} onPress={() => setRating(num)}>
            <FontAwesome
              name={num <= rating ? "star" : "star-o"}
              size={30}
              color={num <= rating ? "#FFD700" : "#d1d5db"}
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={tw`text-xl font-bold text-gray-800 mb-6`}>
        Partagez votre expérience
      </Text>

      {/* Sections d'évaluation */}
      <View style={styles.section}>
        <RatingSection
          title="Service"
          imageSource={require("../../images/service.png")}
          rating={note_service}
          setRating={setRatingservice}
        />
      </View>

      <View style={styles.section}>
        <RatingSection
          title="Ambiance"
          imageSource={require("../../images/ambiance.png")}
          rating={note_ambiance}
          setRating={setRatingambiance}
        />
      </View>

      <View style={styles.section}>
        <RatingSection
          title="Cuisine"
          imageSource={require("../../images/cuisine.png")}
          rating={note_cuisine}
          setRating={setRatingcuisine}
        />
      </View>

      {/* Section commentaire */}
      <View style={styles.section}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Votre avis</Text>
          <TextInput
            style={tw`pt-6 text-base text-gray-800`}
            placeholderTextColor="gray"
            value={commentaire}
            onChangeText={setReview}
            multiline
          />
          <TouchableOpacity
            style={tw`absolute top-3 right-3`}
            onPress={pickReviewImage}
          >
            <FontAwesome name="camera" size={24} color={theme.primary} />
          </TouchableOpacity>
        </View>

        {image && (
          <Image
            source={{ uri: image }}
            style={tw`w-full h-40 rounded-lg`}
          />
        )}

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={verificationreview}
        >
          <Text style={tw`text-white font-bold`}>Publier mon avis 🌟</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de vérification */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Animated.View 
            style={[
              styles.modalContent,
              { transform: [{ translateY: slideAnim }] }
            ]}
          >
            <Text style={tw`text-lg mb-3 text-center ${
              iscompatibel ? (status === 'not good' || quality !== 'clear'
                ? 'text-yellow-600'
                : 'text-green-600')
              : 'text-red-500'
            }`}>
              {resultaaa}
            </Text>

            {iscompatibel && (
              <>
                <Text style={tw`text-gray-500 text-center mb-4`}>
                  Pour garantir l'authenticité des avis, votre localisation doit être vérifiée près de l'établissement.
                </Text>

                <TouchableOpacity
                  onPress={getLocationHandler}
                  style={tw`p-3 bg-black rounded-lg w-full items-center`}
                >
                  {isLoading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={tw`text-white`}>📍 Vérification de votre position</Text>
                  )}
                </TouchableOpacity>

                {errorMsg && <Text style={tw`text-red-500 mt-2`}>{errorMsg}</Text>}

                {location && (
                  <View style={tw`w-full p-2`}>
                    <MapView
                      style={styles.map}
                      showsUserLocation={true}
                      minZoomLevel={15}
                      initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                      }}
                    >
                      <Marker
                        coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                        title="Votre position"
                      />
                    </MapView>

                    <View style={tw`mt-4`}>
                      {isNearby ? (
                        <>
                          <Text style={tw`text-green-600 text-center font-bold`}>
                            Vous êtes proche de l'établissement
                          </Text>
                          <TouchableOpacity
                            style={tw`mt-3 bg-green-500 p-3 rounded-lg`}
                            onPress={handleSubmit}
                          >
                            <Text style={tw`text-white text-center font-bold`}>
                              Confirmer la publication
                            </Text>
                          </TouchableOpacity>
                        </>
                      ) : (
                        <Text style={tw`text-red-600 text-center font-bold`}>
                          Vous êtes trop loin de l'établissement
                        </Text>
                      )}
                    </View>
                  </View>
                )}
              </>
            )}

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={tw`mt-4 bg-gray-200 p-3 rounded-lg w-full items-center`}
            >
              <Text style={tw`text-gray-800`}>Fermer</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Reviewform;