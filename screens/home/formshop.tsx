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
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet } from 'react-native';
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
  const [region , setregion] = useState("")


  const [categorie, setcategorie] = useState("");
const [showCategoryPicker, setShowCategoryPicker] = useState(false);
const [showRegionPicker, setShowRegionPicker] = useState(false);

const regions = [
  { label: "Tunis", value: "Tunis" },
  { label: "Ariana", value: "Ariana" },
  { label: "Ben Arous", value: "Ben Arous" },
  { label: "Manouba", value: "Manouba" },
  { label: "Nabeul", value: "Nabeul" },
  { label: "Zaghouan", value: "Zaghouan" },
  { label: "Bizerte", value: "Bizerte" },
  { label: "Béja", value: "Béja" },
  { label: "Jendouba", value: "Jendouba" },
  { label: "Le Kef", value: "Le Kef" },
  { label: "Siliana", value: "Siliana" },
  { label: "Kairouan", value: "Kairouan" },
  { label: "Kasserine", value: "Kasserine" },
  { label: "Sidi Bouzid", value: "Sidi Bouzid" },
  { label: "Sousse", value: "Sousse" },
  { label: "Monastir", value: "Monastir" },
  { label: "Mahdia", value: "Mahdia" },
  { label: "Sfax", value: "Sfax" },
  { label: "Gafsa", value: "Gafsa" },
  { label: "Tozeur", value: "Tozeur" },
  { label: "Kébili", value: "Kébili" },
  { label: "Médenine", value: "Médenine" },
  { label: "Tataouine", value: "Tataouine" }
];

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 16,
    marginTop: 24,
  },
  submitButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  timeSlotContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  imageUpload: {
    width: '100%',
    height: 200,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#EDF2F7',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 32,
    width: '100%',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
const [services, setServices] = useState<string[]>([]);
const [showServicePicker, setShowServicePicker] = useState(false);

const serviceOptions = [
  { label: "WiFi", value: "WiFi" },
  { label: "Espace Ouvert", value: "Espace Ouvert" },
  { label: "Espace Kids", value: "Espace Kids" },
  { label: "Parking", value: "Parking" },
  { label: "Musique Live", value: "Musique Live" },
  { label: "Climatisation", value: "Climatisation" },
  { label: "jeux de cartes", value: "jeux de cartes" },
  { label: "Terrasse extérieure", value: "Terrasse extérieure" },
  { label: "Coin lecture (livres, magazines)", value:"Coin lecture (livres, magazines)" },
  { label: "Animaux acceptés", value:"Animaux acceptés" },
];

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
      region : region,
      service:services
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
    <ScrollView 
      style={{ backgroundColor: '#F8FAFC' }} 
      contentContainerStyle={{ padding: 16 }}
    >
      <TouchableWithoutFeedback onPress={() => {
        setShowCategoryPicker(false);
        setShowRegionPicker(false);
        setShowServicePicker(false);
      }}>
        <View>
          {/* Header */}
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <Text style={{ fontSize: 28, fontWeight: '700', color: '#1E293B', marginBottom: 8 }}>
              Créez votre établissement
            </Text>
            <Text style={{ fontSize: 16, color: '#64748B', textAlign: 'center' }}>
              Rejoignez notre communauté de professionnels et augmentez votre visibilité
            </Text>
          </View>

          {/* Basic Info Section */}
          <Text style={styles.sectionTitle}>Informations principales</Text>

          {/* Shop Name */}
          <View style={styles.inputContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="business" size={20} color="#4F46E5" style={{ marginRight: 12 }} />
              <TextInput
                style={{ flex: 1, color: '#1E293B', fontSize: 16 }}
                placeholder="Nom de l'établissement"
                placeholderTextColor="#94A3B8"
                value={shopNom}
                onChangeText={setShopNom}
              />
            </View>
          </View>

          {/* Phone Number */}
          <View style={styles.inputContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name="phone" size={20} color="#4F46E5" style={{ marginRight: 12 }} />
              <TextInput
                style={{ flex: 1, color: '#1E293B', fontSize: 16 }}
                placeholder="Numéro de téléphone"
                placeholderTextColor="#94A3B8"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>

          {/* Category Picker */}
          <TouchableOpacity 
            onPress={() => setShowCategoryPicker(true)}
            style={styles.inputContainer}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="pricetag" size={20} color="#4F46E5" style={{ marginRight: 12 }} />
              <Text style={{ flex: 1, color: categorie ? '#1E293B' : '#94A3B8', fontSize: 16 }}>
                {categorie || "Sélectionnez une catégorie"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#94A3B8" />
            </View>
          </TouchableOpacity>

          {/* Services Picker */}
          <TouchableOpacity 
            onPress={() => setShowServicePicker(true)}
            style={styles.inputContainer}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="options" size={20} color="#4F46E5" style={{ marginRight: 12 }} />
              <Text style={{ flex: 1, color: services.length > 0 ? '#1E293B' : '#94A3B8', fontSize: 16 }}>
                {services.length > 0 ? services.join(", ") : "Sélectionnez des services"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#94A3B8" />
            </View>
          </TouchableOpacity>

          {/* Selected Services Tags */}
          {services.length > 0 && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 }}>
              {services.map((service) => (
                <View key={service} style={styles.tag}>
                  <Text style={{ color: '#5B21B6', fontSize: 14 }}>{service}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Region Picker */}
          <TouchableOpacity 
            onPress={() => setShowRegionPicker(true)}
            style={styles.inputContainer}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="location" size={20} color="#4F46E5" style={{ marginRight: 12 }} />
              <Text style={{ flex: 1, color: region ? '#1E293B' : '#94A3B8', fontSize: 16 }}>
                {region || "Sélectionnez une région"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#94A3B8" />
            </View>
          </TouchableOpacity>

          {/* Description */}
          <View style={styles.inputContainer}>
            <TextInput
              style={{ height: 120, color: '#1E293B', fontSize: 16, textAlignVertical: 'top' }}
              multiline
              placeholder="Description détaillée..."
              placeholderTextColor="#94A3B8"
              value={shopDesc}
              onChangeText={setShopDesc}
            />
          </View>

          {/* Location Section */}
          <Text style={styles.sectionTitle}>Localisation</Text>
          <View style={styles.inputContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="location-sharp" size={20} color="#4F46E5" style={{ marginRight: 12 }} />
              <TextInput
                style={{ flex: 1, color: '#1E293B', fontSize: 16 }}
                placeholder="URL de localisation Google Maps"
                placeholderTextColor="#94A3B8"
                value={shopLocal}
                onChangeText={setShopLocal}
              />
            </View>
          </View>

          {/* Opening Hours Section */}
          <Text style={styles.sectionTitle}>Horaires d'ouverture</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {/* Opening Time */}
            <TouchableOpacity 
              onPress={() => showDatePicker("ouverture")}
              style={[styles.timeSlotContainer, { flex: 1, marginRight: 8 }]}
            >
              <Text style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>Ouverture</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="time-outline" size={20} color="#4F46E5" style={{ marginRight: 8 }} />
                  <Text style={{ color: shopDateOuv ? '#1E293B' : '#94A3B8', fontSize: 16 }}>
                    {shopDateOuv || "HH:MM"}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
              </View>
            </TouchableOpacity>

            {/* Closing Time */}
            <TouchableOpacity 
              onPress={() => showDatePicker("fermeture")}
              style={[styles.timeSlotContainer, { flex: 1, marginLeft: 8 }]}
            >
              <Text style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>Fermeture</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="time-outline" size={20} color="#4F46E5" style={{ marginRight: 8 }} />
                  <Text style={{ color: shopDateFerm ? '#1E293B' : '#94A3B8', fontSize: 16 }}>
                    {shopDateFerm || "HH:MM"}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
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

          {/* Image Upload Section */}
          <Text style={styles.sectionTitle}>Photo de profil</Text>
          <TouchableOpacity 
            style={styles.imageUpload}
            onPress={pickImage}
          >
            {shopImage ? (
              <Image
                source={{ uri: shopImage }}
                style={{ width: '100%', height: '100%', borderRadius: 8 }}
                resizeMode="cover"
              />
            ) : (
              <>
                <MaterialIcons name="cloud-upload" size={48} color="#4F46E5" />
                <Text style={{ color: '#4F46E5', fontSize: 16, marginTop: 8, fontWeight: '500' }}>
                  Télécharger votre image
                </Text>
                <Text style={{ color: '#64748B', fontSize: 14, marginTop: 4 }}>
                  Format JPG ou PNG (max 5MB)
                </Text>
              </>
            )}
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '600' }}>
              Valider la création
            </Text>
          </TouchableOpacity>

          {/* Modal */}
          <Modal animationType="fade" transparent={true} visible={modalVisible}>
            <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <Animated.View
                style={[
                  styles.modalContainer,
                  { transform: [{ translateY: slideAnim }] }
                ]}
              >
                <Image
                  source={require("../../images/Illustration.png")}
                  style={{ width: 160, height: 160, marginBottom: 24 }}
                />
                <Text style={{ fontSize: 24, fontWeight: '700', color: '#1E293B', marginBottom: 8 }}>
                  Félicitations !
                </Text>
                <Text style={{ fontSize: 16, color: '#64748B', textAlign: 'center', marginBottom: 32 }}>
                  Votre établissement a été créé avec succès !
                </Text>
                <TouchableOpacity
                  style={{ 
                    backgroundColor: '#4F46E5', 
                    borderRadius: 12, 
                    paddingHorizontal: 32, 
                    paddingVertical: 16,
                    width: '100%',
                    alignItems: 'center'
                  }}
                  onPress={goToShopProfile}
                >
                  <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '600' }}>
                    Voir mon établissement
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Modal>

          {/* Category Picker Modal */}
          <Modal
            visible={showCategoryPicker}
            transparent={true}
            animationType="slide"
          >
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, margin: 24, padding: 24 }}>
                <Text style={{ fontSize: 20, fontWeight: '600', color: '#1E293B', marginBottom: 16 }}>
                  Choisir une catégorie
                </Text>
                <ScrollView style={{ maxHeight: 300 }}>
                  {categories.map((cat) => (
                    <TouchableOpacity
                      key={cat.value}
                      onPress={() => {
                        setcategorie(cat.value);
                        setShowCategoryPicker(false);
                      }}
                      style={{ 
                        padding: 16,
                        backgroundColor: categorie === cat.value ? '#EDE9FE' : 'transparent',
                        borderRadius: 8,
                        marginBottom: 8
                      }}
                    >
                      <Text style={{ color: '#1E293B', fontSize: 16 }}>
                        {cat.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </Modal>

          {/* [Les autres modals (region, services) suivent le même pattern...] */}
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default FormShop;