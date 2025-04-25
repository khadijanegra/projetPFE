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
import { Keyboard } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";
const apiUrl = process.env.API_URL;

const formevent = (props: any) => {
  // Couleurs personnalisées
  const colors = {
    primary: "#000000",       // Noir
    secondary: "#FFFFFF",     // Blanc
    accent: "#FFEBF1",       // Rose très clair
    text: "#333333",         // Gris foncé
    muted: "#888888",        // Gris moyen
    border: "#E0E0E0"       // Gris clair pour bordures
  };

  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [titre, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date_debut, setStartDate] = useState(new Date());
  const [date_fin, setEndDate] = useState(new Date());
  const [prix, setPrice] = useState("");
  const [limite, setPlaceLimit] = useState(false);
  const [nbr_place, setMaxPlaces] = useState("");
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [shopID, setshopID] = useState();
  const [event_id, seteventid] = useState();

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

  const handleSubmit = async () => {
    if (!titre || !description || !prix || !date_fin || !date_debut) {
      Alert.alert("Veuillez remplir tous les champs obligatoires !");
      return;
    }

    const eventData = {
      titre,
      description,
      date_debut,
      date_fin,
      prix,
      limite,
      nbr_place: limite ? nbr_place : null,
      shop_id: props.route.params.shopId,
    };

    try {
      const response = await axios.post(`${apiUrl}/event/createvent`, eventData);
      if (response.status === 201) {
        const event_id = response.data.id;
        seteventid(event_id);
        Alert.alert("Évènement créé avec succès");
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Erreur:", error);
      Alert.alert("Erreur lors de la création");
    }
  };

  // Fonctions pour le date picker...
  const showStartDatePicker = () => setStartDatePickerVisibility(true);
  const hideStartDatePicker = () => setStartDatePickerVisibility(false);
  const showEndDatePicker = () => setEndDatePickerVisibility(true);
  const hideEndDatePicker = () => setEndDatePickerVisibility(false);

  const handleStartDateConfirm = (date: Date) => {
    setStartDate(date);
    hideStartDatePicker();
  };

  const handleEndDateConfirm = (date: Date) => {
    setEndDate(date);
    hideEndDatePicker();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString("fr-FR", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <ScrollView style={{ backgroundColor: colors.secondary }} contentContainerStyle={tw`p-4`}>
      <View style={[tw`p-6 rounded-3xl`, { backgroundColor: colors.accent }]}>
        {/* Header */}
        <View style={tw`items-center mb-8`}>
          <Text style={[tw`text-3xl font-bold`, { color: colors.primary }]}>
            𝐏𝐎𝐔𝐑 𝐕𝐎𝐓𝐑𝐄 𝐄́𝐕𝐄́𝐍𝐄𝐌𝐄𝐍𝐓
          </Text>
          <Text style={[tw`mt-2`, { color: colors.muted }]}>
            Créez un événement mémorable 🎉💫
          </Text>
        </View>

        {/* Basic Info Section */}
        <View style={tw`mb-8`}>
          <Text style={[tw`mb-4 text-xl font-bold`, { color: colors.primary }]}>
            𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧𝐬 𝐩𝐫𝐢𝐧𝐜𝐢𝐩𝐚𝐥𝐞𝐬
          </Text>

          {/* Event Title */}
          <View style={[tw`flex-row items-center p-3 mb-4 rounded-xl`, 
                       { backgroundColor: colors.secondary, borderWidth: 1, borderColor: colors.border }]}>
            <Ionicons name="calendar" size={20} color={colors.primary} style={tw`mr-3`} />
            <TextInput
              style={[tw`flex-1`, { color: colors.text }]}
              placeholder="Titre de l'événement"
              placeholderTextColor={colors.muted}
              value={titre}
              onChangeText={setTitle}
            />
          </View>

          {/* Description */}
          <View style={[tw`p-3 mb-4 rounded-xl`, 
                       { backgroundColor: colors.secondary, borderWidth: 1, borderColor: colors.border }]}>
            <TextInput
              style={[tw`h-32`, { color: colors.text }]}
              multiline
              placeholder="Description détaillée..."
              placeholderTextColor={colors.muted}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          {/* Dates Section */}
          <Text style={[tw`mb-4 text-xl font-bold`, { color: colors.primary }]}>
            𝗗𝗮𝘁𝗲𝘀 𝗲𝘁 𝗵𝗼𝗿𝗮𝗶𝗿𝗲𝘀
          </Text>

          <TouchableOpacity
            style={[tw`flex-row items-center p-3 mb-4 rounded-xl`, 
                   { backgroundColor: colors.secondary, borderWidth: 1, borderColor: colors.border }]}
            onPress={showStartDatePicker}
          >
            <Ionicons name="time" size={20} color={colors.primary} style={tw`mr-3`} />
            <Text style={{ color: colors.text }}>
              {formatDate(date_debut)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[tw`flex-row items-center p-3 mb-4 rounded-xl`, 
                   { backgroundColor: colors.secondary, borderWidth: 1, borderColor: colors.border }]}
            onPress={showEndDatePicker}
          >
            <Ionicons name="time" size={20} color={colors.primary} style={tw`mr-3`} />
            <Text style={{ color: colors.text }}>
              {formatDate(date_fin)}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isStartDatePickerVisible}
            mode="datetime"
            onConfirm={handleStartDateConfirm}
            onCancel={hideStartDatePicker}
          />

          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="datetime"
            onConfirm={handleEndDateConfirm}
            onCancel={hideEndDatePicker}
          />

          {/* Price */}
          <View style={[tw`flex-row items-center p-3 mb-4 rounded-xl`, 
                       { backgroundColor: colors.secondary, borderWidth: 1, borderColor: colors.border }]}>
            <FontAwesome name="money" size={20} color={colors.primary} style={tw`mr-3`} />
            <TextInput
              style={[tw`flex-1`, { color: colors.text }]}
              placeholder="Prix (€)"
              placeholderTextColor={colors.muted}
              keyboardType="numeric"
              value={prix}
              onChangeText={setPrice}
            />
          </View>

          {/* Places Limit */}
          <View style={tw`mb-4`}>
            <Text style={{ color: colors.text }}>Nombre de places</Text>
            <View style={tw`flex-row items-center mb-2`}>
              <TouchableOpacity
                style={tw`mr-4 flex-row items-center`}
                onPress={() => setPlaceLimit(false)}
              >
                <View style={[tw`w-5 h-5 rounded-full mr-2 items-center justify-center`, 
                            { borderWidth: 1, borderColor: colors.muted }]}>
                  {!limite && <View style={[tw`w-3 h-3 rounded-full`, { backgroundColor: colors.primary }]} />}
                </View>
                <Text style={{ color: colors.text }}>Non limité</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`flex-row items-center`}
                onPress={() => setPlaceLimit(true)}
              >
                <View style={[tw`w-5 h-5 rounded-full mr-2 items-center justify-center`, 
                            { borderWidth: 1, borderColor: colors.muted }]}>
                  {limite && <View style={[tw`w-3 h-3 rounded-full`, { backgroundColor: colors.primary }]} />}
                </View>
                <Text style={{ color: colors.text }}>Limité</Text>
              </TouchableOpacity>
            </View>

            {limite && (
              <View style={[tw`flex-row items-center p-3 rounded-xl`, 
                          { backgroundColor: colors.secondary, borderWidth: 1, borderColor: colors.border }]}>
                <Ionicons name="people" size={20} color={colors.primary} style={tw`mr-3`} />
                <TextInput
                  style={[tw`flex-1`, { color: colors.text }]}
                  placeholder="Nombre maximum de places"
                  placeholderTextColor={colors.muted}
                  keyboardType="numeric"
                  value={nbr_place}
                  onChangeText={setMaxPlaces}
                />
              </View>
            )}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          onPress={handleSubmit}
          style={[tw`p-4 rounded-xl`, { backgroundColor: colors.primary }]}
        >
          <Text style={[tw`text-lg font-bold text-center`, { color: colors.secondary }]}>
            CRÉER L'ÉVÉNEMENT
          </Text>
        </TouchableOpacity>

        {/* Success Modal */}
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={[tw`items-center justify-end flex-1`, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
            <Animated.View
              style={[
                tw`items-center w-full p-8 rounded-t-3xl`,
                { 
                  transform: [{ translateY: slideAnim }],
                  backgroundColor: colors.secondary
                },
              ]}
            >
              <Image
                source={require("../../images/Illustration.png")}
                style={tw`w-40 h-40 mb-4 rounded-full`}
              />
              <Text style={[tw`mb-2 text-2xl font-bold`, { color: colors.primary }]}>
                Félicitations !
              </Text>
              <Text style={[tw`mb-6 text-center`, { color: colors.muted }]}>
                Votre événement a été créé avec succès !
              </Text>
              <TouchableOpacity
                style={[tw`px-12 py-4 rounded-full`, { backgroundColor: colors.primary }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[tw`text-xl font-bold`, { color: colors.secondary }]}>
                  Confirmer
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default formevent;