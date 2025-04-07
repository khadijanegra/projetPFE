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


const EventForm = (props : any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

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

  const [titre, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date_debut, setStartDate] = useState(new Date());
  const [date_fin, setEndDate] = useState(new Date());
  const [prix, setPrice] = useState("");
  const [limite, setPlaceLimit] = useState(false);
  const [nbr_place, setMaxPlaces] = useState("");
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [shopID , setshopID]= useState()
   const [event_id , seteventid] = useState()

   console.log("apiUrl:", apiUrl);
   console.log("*************");

  const handleSubmit = async () => {
    if (!titre || !description || ! prix ||!date_fin ||!date_debut) {
      Alert.alert("Veuillez d'abord uploader une image !");
      return;
    }

    const eventData = {
      titre,
      description,
      date_debut,
      date_fin,
      prix,
      limite,
      nbr_place: limite? nbr_place : null,
      shop_id : props.route.params.shopId,
    };

    try {
      const response = await axios.post(`${apiUrl}/event/createvent`,eventData );
      console.log("apiUrl:", apiUrl);

      if (response.status === 201) {
        const event_id = response.data.id;
        seteventid(event_id);
        Alert.alert("évènement créé avec succès");
        setModalVisible(true);
        return true;
      } else {
        Alert.alert("Erreur lors de la création de votre évènement");
        return false;
      }
    }catch (error) {
      console.log("Erreur lors de la requête axios :", error);
      if (axios.isAxiosError(error)) {
        console.log("Message d'erreur :", error.message);
        console.log("Réponse serveur :", error.response?.data);
        console.log("Status :", error.response?.status);
      }
      Alert.alert("Erreur lors de la connexion");
    }
    
  };

  const showStartDatePicker = () => setStartDatePickerVisibility(true);
  const hideStartDatePicker = () => setStartDatePickerVisibility(false);
  
  const showEndDatePicker = () => setEndDatePickerVisibility(true);
  const hideEndDatePicker = () => setEndDatePickerVisibility(false);


  const handleStartDateConfirm = (date : Date) => {
  setStartDate(date);
  hideStartDatePicker();
};

const handleEndDateConfirm = (date : Date) => {
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
    <ScrollView style={tw`bg-white`} contentContainerStyle={tw`p-4`}>
      
      <LinearGradient
  colors={["#E0B3FF", "#F3E8FF"]}
  style={tw`flex-1 p-6 shadow-lg rounded-3xl`}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
>
  

          {/* Header */}
          <View style={tw`items-center mb-8`}>
            <Text style={tw`text-3xl font-bold text-black ml-9`}>
            𝐏𝐎𝐔𝐑 𝐕𝐎𝐓𝐑𝐄 𝐄́𝐕𝐄́𝐍𝐄𝐌𝐄𝐍𝐓            </Text>
            <Text style={tw`mt-2 text-gray-600 ml-6`}>
            Créez un événement mémorable 🎉💫
            </Text>
          </View>

          {/* Basic Info Section */}
          <View style={tw`mb-8`}>
            <Text style={tw`mb-4 text-xl font-bold text-black`}>
            𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧𝐬 𝐩𝐫𝐢𝐧𝐜𝐢𝐩𝐚𝐥𝐞𝐬             </Text>

            {/* Event Title */}
            <View
              style={tw`flex-row items-center p-3 mb-4 bg-white shadow-sm rounded-xl`}
            >
              <Ionicons
                name="calendar"
                size={20}
                color="#EF5350"
                style={tw`mr-3`}
              />
              <TextInput
                style={tw`flex-1 text-gray-800`}
                placeholder="Titre de l'événement"
                value={titre}
                onChangeText={setTitle}
              />
            </View>

            {/* Description */}
            <View style={tw`p-3 mb-4 bg-white shadow-sm rounded-xl  `}>
              <TextInput
                style={tw`h-32 text-gray-800`}
                multiline
                placeholder="Description détaillée..."
                value={description}
                onChangeText={setDescription}
              />
            </View>

            {/* Dates Section */}
            <Text style={tw`mb-4 text-xl font-bold text-black`}>
            𝗗𝗮𝘁𝗲𝘀 𝗲𝘁 𝗵𝗼𝗿𝗮𝗶𝗿𝗲𝘀
            </Text>

            <TouchableOpacity
  style={tw`flex-row items-center p-3 mb-4 bg-white shadow-sm rounded-xl`}
  onPress={showStartDatePicker}
>
  <Ionicons name="time" size={20} color="#EF5350" style={tw`mr-3`} />
  <Text style={tw`text-gray-700`}>
    {formatDate(date_debut)}
  </Text>
</TouchableOpacity>

{/* End Date */}
<TouchableOpacity
  style={tw`flex-row items-center p-3 mb-4 bg-white shadow-sm rounded-xl`}
  onPress={showEndDatePicker}
>
  <Ionicons name="time" size={20} color="#EF5350" style={tw`mr-3`} />
  <Text style={tw`text-gray-700`}>
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
            <View
              style={tw`flex-row items-center p-3 mb-4 bg-white shadow-sm rounded-xl`}
            >
              <FontAwesome
                name="money"
                size={20}
                color="#EF5350"
                style={tw`mr-3`}
              />
              <TextInput
                style={tw`flex-1 text-gray-700`}
                placeholder="Prix (€)"
                keyboardType="numeric"
                value={prix}
                onChangeText={setPrice}
              />
            </View>

            {/* Places Limit */}
            <View style={tw`mb-4`}>
  <Text style={tw`text-gray-700 mb-2`}>Nombre de places</Text>
  <View style={tw`flex-row items-center mb-2`}>
    <TouchableOpacity
      style={tw`mr-4 flex-row items-center`}
      onPress={() => setPlaceLimit(false)} // false pour "Non limité"
    >
      <View style={tw`w-5 h-5 rounded-full border border-gray-400 mr-2 items-center justify-center`}>
        {limite === false && <View style={tw`w-3 h-3 rounded-full bg-blue-500`} />}
      </View>
      <Text>Non limité</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={tw`flex-row items-center`}
      onPress={() => setPlaceLimit(true)} // true pour "Limité"
    >
      <View style={tw`w-5 h-5 rounded-full border border-gray-400 mr-2 items-center justify-center`}>
        {limite === true && <View style={tw`w-3 h-3 rounded-full bg-blue-500`} />}
      </View>
      <Text>Limité</Text>
    </TouchableOpacity>
  </View>

  {limite === true && (
    <View style={tw`flex-row items-center p-3 bg-white shadow-sm rounded-xl`}>
      <Ionicons
        name="people"
        size={20}
        color="#EF5350"
        style={tw`mr-3`}
      />
      <TextInput
        style={tw`flex-1 text-gray-700`}
        placeholder="Nombre maximum de places"
        keyboardType="numeric"
        value={nbr_place}
        onChangeText={setMaxPlaces}
      />
    </View>
  )}
</View>

          </View>

          {/* Submit Button */}
          <TouchableOpacity onPress={handleSubmit}>
            <Text
              style={tw`p-4 text-lg font-bold text-center text-white bg-black rounded-xl`}
            >
              CRÉER L'ÉVÉNEMENT
            </Text>
          </TouchableOpacity>

          {/* Success Modal */}
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
                  Votre événement a été créé avec succès !
                </Text>
                <TouchableOpacity
                  style={tw`px-12 py-4 bg-yellow-400 rounded-full`}
                 onPress={() => setModalVisible(false)}

                >
                  <Text style={tw`text-xl font-bold text-white`}>
                    Confirmer
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Modal>
        </LinearGradient>
    </ScrollView>
  );
};

export default EventForm;
