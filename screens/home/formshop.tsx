import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Animated,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import axios from "axios";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
//import { Picker } from "@react-native-picker/picker";

const apiUrl = process.env.API_URL;

const FormShop = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current; // Position initiale en bas

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0, // Position finale (zéro signifie en haut)
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(300); // Réinitialiser avant la prochaine ouverture
    }
  }, [modalVisible]);

  const [shopNom, setShopNom] = useState("");
  const [shopDesc, setShopDesc] = useState("");
  const [shopLocal, setShopLocal] = useState("");
  const [shopDateOuv, setShopDateOuv] = useState("");
  const [shopDateFerm, setShopDateFerm] = useState("");
  const [showPicker, setShowPicker] = useState<{type: "ouverture" | "fermeture" | null;}>({ type: null });
  const [phone, setPhone] = useState("");
  const [shopImage, setShopImage] = useState<any>(null); // Updated for clarity
  const [shopId, setShopId] = useState<any>(null);


  const [categorie, setcategorie] = useState("");
const [showCategoryPicker, setShowCategoryPicker] = useState(false);


const categories = [
  { label: "Sélectionnez une catégorie", value: "" },
  { label: "Hôtel", value: "Hôtel" },
  { label: "Café", value: "Café" },
  { label: "Salon de thé", value: "Salon de thé" },
  { label: "Restaurant", value: "restaurant" },
];



  // Request Camera and Media Library Permissions on mount
  useEffect(() => {
    const getPermissions = async () => {
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus !== "granted" || mediaStatus !== "granted") {
        alert("Camera and Media Library permissions are required");
      }
    };

    getPermissions();
  }, []);

  const onChangeTime = (event: any, selectedTime?: Date) => {
    if (selectedTime) {
      const formattedTime = selectedTime.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      if (showPicker.type === "ouverture") {
        setShopDateOuv(formattedTime);
      } else if (showPicker.type === "fermeture") {
        setShopDateFerm(formattedTime);
      }
    }
    setShowPicker({ type: null }); 
  };

  const showDatePicker = (type: "ouverture" | "fermeture") => {
    setShowPicker({ type });
  };

  const pickImage = async () => {
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
        const response = await fetch(`${apiUrl}/uploadshopImage`, {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const responseText = await response.json(); // Assurez-vous que votre backend retourne un JSON avec le nom de l'image
        if (responseText.fileName) {
          setShopImage(responseText.fileName); // Stocke le nom du fichier
          console.log("Nom du fichier uploadé :", responseText.fileName);
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  const handleSubmit = async () => {
    if (!shopImage) {
      Alert.alert("Veuillez d'abord uploader une image !");
      return;
    }

    const shopData = {
      shop_nom: shopNom,
      phone,
      shop_desc: shopDesc,
      shop_local: shopLocal,
      shop_date_ouv: shopDateOuv,
      shop_date_ferm: shopDateFerm,
      shopImage, // Nom du fichier uploadé
      user_id: props.route.params.id,
      categorie : categorie,
    };

    try {
      const response = await axios.post(`${apiUrl}/shops/`, shopData);

      if (response.status === 201) {
        const shopId = response.data.id;
        setShopId(shopId);
        Alert.alert("Shop créé avec succès");
        setModalVisible(true);
        return true;
      } else {
        Alert.alert("Erreur lors de la création de votre Shop");
        return false;
      }
    } catch (error) {
      Alert.alert("Erreur lors de la connexion");
      return false;
    }
  };

  const goToShopProfile = () => {
    setModalVisible(false);
    if (shopId) {
      // props.navigation.navigate("profileshop", { shopId });
    }
  };

  return (
    <ScrollView style={tw`bg-red-100`} contentContainerStyle={tw`p-4`}>
      <TouchableWithoutFeedback onPress={() => setShowCategoryPicker(false)}>
        <LinearGradient
          colors={["#F8FAFC", "#F1F5F9"]}
          style={tw`flex-1 p-6 shadow-lg rounded-3xl`}
        >
          {/* Header */}
          <View style={tw`items-center mb-8`}>
            <Text style={tw`text-3xl font-bold text-black`}>
            𝗖𝗿𝗲́𝗲𝘇 𝘃𝗼𝘁𝗿𝗲 𝗦𝗵𝗼𝗽
            </Text>
            <Text style={tw`mt-2 text-gray-600`}>
            𝘙𝘦𝘫𝘰𝘪𝘨𝘯𝘦𝘻 𝘯𝘰𝘵𝘳𝘦 𝘤𝘰𝘮𝘮𝘶𝘯𝘢𝘶𝘵𝘦́ 𝘥𝘦 𝘱𝘳𝘰𝘧𝘦𝘴𝘴𝘪𝘰𝘯𝘯𝘦𝘭𝘴
            </Text>
          </View>

          {/* Basic Info Section */}
          <View style={tw`mb-8`}>
            <Text style={tw`mb-4 text-xl font-bold text-black`}>
            𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻𝘀 𝗽𝗿𝗶𝗻𝗰𝗶𝗽𝗮𝗹𝗲𝘀
            </Text>

            {/* Shop Name */}
            <View
              style={tw`flex-row items-center p-3 mb-4 bg-white shadow-sm rounded-xl`}
            >
              <Ionicons
                name="business"
                size={20}
                color="#EF5350"
                style={tw`mr-3`}
              />
              <TextInput
                style={tw`flex-1 text-gray-700`}
                placeholder="Nom de l'établissement"
                value={shopNom}
                onChangeText={setShopNom}
              />
            </View>
           
            <View
              style={tw`flex-row items-center p-3 mb-4 bg-white shadow-sm rounded-xl`}
            >
             <FontAwesome
                name="phone"
                size={20}
                color="#EF5350"
                style={tw`mr-3`}
              />
              <TextInput
                style={tw`flex-1 text-gray-700`}
                placeholder="Numéro de téléphone"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            <View style={tw`mb-4`}>
              
              <TouchableOpacity
                onPress={() => setShowCategoryPicker(true)}
                style={tw`p-3 bg-white rounded-lg border border-gray-200`}
              >
                <View style={tw`flex-row   items-center`}>

                <Ionicons
                  name="pricetag"
                  size={18}
                  color={categorie ? "#EF5350" : "#EF5350"}
                  style={tw`mr-2`}
                />
                  <Text
                    style={tw`${
                      !categorie ? "text-gray-400" : "text-gray-700"
                    }`}


                  >
                    {categorie || "Sélectionnez une catégorie"}
                  </Text>

                  <Ionicons name="chevron-down" size={16} color="#CBD5E1" style={tw`ml-2`} />
                </View>
              </TouchableOpacity>

              <Modal
                visible={showCategoryPicker}
                transparent={true}
                animationType="slide"
              >
                <View style={tw`flex-1 justify-center bg-black bg-opacity-50`}>
                  <View style={tw`m-4 bg-white rounded-lg p-4`}>
                    <Text style={tw`text-lg font-bold mb-4`}>
                      Choisir une catégorie
                    </Text>
                    {categories.map((cat) => (
                      <TouchableOpacity
                        key={cat.value}
                        onPress={() => {
                          setcategorie(cat.value);
                          setShowCategoryPicker(false);
                        }}
                        style={tw`p-3 ${
                          categorie === cat.value ? "bg-gray-100" : ""
                        }`}
                      >
                        <Text style={tw`text-gray-700`}>{cat.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </Modal>
            </View>

            {/* Description */}
            <View style={tw`p-3 bg-white shadow-sm rounded-xl`}>
              <TextInput
                style={tw`h-32 text-gray-700`}
                multiline
                placeholder="Description détaillée..."
                value={shopDesc}
                onChangeText={setShopDesc}
              />
            </View>
          </View>

          {/* Location Section */}
          <View style={tw`mb-8`}>
            <Text style={tw`mb-4 text-xl font-bold text-black`}>
            𝗟𝗼𝗰𝗮𝗹𝗶𝘀𝗮𝘁𝗶𝗼𝗻
            </Text>
            <View
              style={tw`flex-row items-center p-3 bg-white shadow-sm rounded-xl`}
            >
              <Ionicons
                name="location-sharp"
                size={20}
                color="#EF5350"
                style={tw`mr-3`}
              />
              <TextInput
                style={tw`flex-1 text-gray-700`}
                placeholder="URL de localisation Google Maps"
                value={shopLocal}
                onChangeText={setShopLocal}
              />
            </View>
          </View>

          {/* Opening Hours Section */}
          <View style={tw`mb-8`}>
            <Text style={tw`mb-4 text-xl font-bold text-black`}>
            𝗛𝗼𝗿𝗮𝗶𝗿𝗲𝘀 𝗱'𝗼𝘂𝘃𝗲𝗿𝘁𝘂𝗿𝗲
            </Text>

            <View style={tw`flex-row justify-between`}>
              {/* Champ Heure d'ouverture */}
              <TouchableOpacity
                onPress={() => showDatePicker("ouverture")}
                style={tw`flex-1 mr-2`}
              >
                <View
                  style={tw`p-4 bg-white rounded-xl shadow-sm border border-gray-100`}
                >
                  <Text style={tw`text-xs text-gray-500 mb-1`}>Ouverture</Text>
                  <View style={tw`flex-row items-center justify-between`}>
                    <View style={tw`flex-row items-center`}>
                      <Ionicons
                        name="time-outline"
                        size={20}
                        color="#F59E0B"
                        style={tw`mr-2`}
                      />
                      <Text style={tw`text-gray-700 `}>
                        {shopDateOuv || "HH:MM"}
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color="#CBD5E1"
                    />
                  </View>
                </View>
              </TouchableOpacity>

              {/* Champ Heure de fermeture */}
              <TouchableOpacity
                onPress={() => showDatePicker("fermeture")}
                style={tw`flex-1 ml-2`}
              >
                <View
                  style={tw`p-4 bg-white rounded-xl shadow-sm border border-gray-100`}
                >
                  <Text style={tw`text-xs text-gray-500 mb-1`}>Fermeture</Text>
                  <View style={tw`flex-row items-center justify-between`}>
                    <View style={tw`flex-row items-center`}>
                      <Ionicons
                        name="time-outline"
                        size={20}
                        color="#F59E0B"
                        style={tw`mr-2`}
                      />
                      <Text style={tw`text-gray-700 `}>
                        {shopDateFerm || "HH:MM"}
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color="#CBD5E1"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* DatePicker */}
            {showPicker.type && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                display="spinner"
                onChange={onChangeTime}
                themeVariant="light"
                textColor="#000000"
              />
            )}
          </View>

          {/* Image Upload Section */}
          <View style={tw`mb-8`}>
            <Text style={tw`mb-4 text-xl font-bold text-black`}>
            𝗣𝗵𝗼𝘁𝗼 𝗱𝗲 𝗽𝗿𝗼𝗳𝗶𝗹 
            </Text>
            <TouchableOpacity
              style={tw`items-center justify-center h-40 bg-white border-2 border-yellow-300 border-dashed rounded-2xl`}
              onPress={pickImage}
            >
              {shopImage ? (
                <Image
                  source={{ uri: shopImage }}
                  style={tw`w-full h-full rounded-2xl`}
                />
              ) : (
                <>
                  <Ionicons name="cloud-upload" size={40} color="#FBC02D" />
                  <Text style={tw`mt-2 text-blue-600`}>
                    Télécharger votre Image
                  </Text>
                  <Text style={tw`text-xs text-gray-500`}>
                    Format JPG ou PNG
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity onPress={handleSubmit}>
            <Text
              style={tw`p-4 text-lg font-bold text-center text-white bg-red-300 rounded-xl`}
            >
              𝙑𝙖𝙡𝙞𝙙𝙚𝙧 𝙡𝙖 𝙘𝙧𝙚́𝙖𝙩𝙞𝙤𝙣
            </Text>
          </TouchableOpacity>

          {/* Modal */}
          <Modal animationType="fade" transparent={true} visible={modalVisible}>
            <View
              style={tw`items-center justify-end flex-1 bg-black bg-opacity-50`}
            >
              <Animated.View
                style={[
                  tw`items-center w-full p-8 bg-white rounded-t-3xl`,
                  { transform: [{ translateY: slideAnim }] },
                ]}
              >
                <Image
                  source={require("../../images/Illustration.png")}
                  style={tw`w-40 h-40 mb-4 rounded-full`}
                />
                <Text style={tw`mb-2 text-2xl font-bold text-gray-900`}>
                  Félicitations !
                </Text>
                <Text style={tw`mb-6 text-center text-gray-600`}>
                  Votre établissement a été créé avec succès !
                </Text>
                <TouchableOpacity
                  style={tw`px-12 py-4 bg-yellow-400 rounded-full`}
                  onPress={goToShopProfile}
                >
                  <Text style={tw`text-xl font-bold text-white`}>
                    Confirmer
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Modal>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default FormShop;
