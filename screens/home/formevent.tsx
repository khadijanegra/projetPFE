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
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

const EventForm = () => {
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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [price, setPrice] = useState("");
  const [placeLimit, setPlaceLimit] = useState("non_limite");
  const [maxPlaces, setMaxPlaces] = useState("");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleSubmit = () => {
    if (!title || !description || !price) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (placeLimit === "limite" && !maxPlaces) {
      Alert.alert("Erreur", "Veuillez spécifier le nombre de places");
      return;
    }

    const eventData = {
      title,
      description,
      startDate,
      endDate,
      price,
      placeLimit,
      maxPlaces: placeLimit === "limite" ? maxPlaces : null,
    };

    console.log("Événement créé:", eventData);
    setModalVisible(true);
  };

  const onChangeStartDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };
  
  const onChangeEndDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };
  

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  

  const goToEvent = () => {
    setModalVisible(false);
    // navigation.navigate("EventScreen", { eventId });
  };

  return (
    <ScrollView style={tw`bg-white`} contentContainerStyle={tw`p-4`}>
      <TouchableWithoutFeedback>
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
                value={title}
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

            <View style={tw`flex-row justify-between mb-4`}>
              {/* Start Date */}
              <TouchableOpacity
                onPress={() => setShowStartDatePicker(true)}
                style={tw`flex-1 mr-2`}
              >
                <View
                  style={tw`p-4 bg-white rounded-xl shadow-sm border border-gray-100`}
                >
                  <Text style={tw`text-xs text-gray-500 mb-1`}>Début</Text>
                  <View style={tw`flex-row items-center justify-between`}>
                    <View style={tw`flex-row items-center`}>
                      <Ionicons
                        name="time-outline"
                        size={20}
                        color="#F59E0B"
                        style={tw`mr-2`}
                      />
                      <Text style={tw`text-gray-700`}>
                        {formatDate(startDate)}
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

              {/* End Date */}
              <TouchableOpacity
                onPress={() => setShowEndDatePicker(true)}
                style={tw`flex-1 ml-2`}
              >
                <View
                  style={tw`p-4 bg-white rounded-xl shadow-sm border border-gray-100`}
                >
                  <Text style={tw`text-xs text-gray-500 mb-1`}>Fin</Text>
                  <View style={tw`flex-row items-center justify-between`}>
                    <View style={tw`flex-row items-center`}>
                      <Ionicons
                        name="time-outline"
                        size={20}
                        color="#F59E0B"
                        style={tw`mr-2`}
                      />
                      <Text style={tw`text-gray-700`}>
                        {formatDate(endDate)}
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

            {/* Date Pickers */}
            {showStartDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="datetime"
                display="spinner"
                onChange={onChangeStartDate}
              />
            )}
            {showEndDatePicker && (
              <DateTimePicker
                value={endDate}
                mode="datetime"
                display="spinner"
                onChange={onChangeEndDate}
              />
            )}

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
                value={price}
                onChangeText={setPrice}
              />
            </View>

            {/* Places Limit */}
            <View style={tw`mb-4`}>
              <Text style={tw`text-gray-700 mb-2`}>Nombre de places</Text>
              <View style={tw`flex-row items-center mb-2`}>
                <TouchableOpacity
                  style={tw`mr-4 flex-row items-center`}
                  onPress={() => setPlaceLimit("non_limite")}
                >
                  <View style={tw`w-5 h-5 rounded-full border border-gray-400 mr-2 items-center justify-center`}>
                    {placeLimit === "non_limite" && <View style={tw`w-3 h-3 rounded-full bg-blue-500`} />}
                  </View>
                  <Text>Non limité</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`flex-row items-center`}
                  onPress={() => setPlaceLimit("limite")}
                >
                  <View style={tw`w-5 h-5 rounded-full border border-gray-400 mr-2 items-center justify-center`}>
                    {placeLimit === "limite" && <View style={tw`w-3 h-3 rounded-full bg-blue-500`} />}
                  </View>
                  <Text>Limité</Text>
                </TouchableOpacity>
              </View>

              {placeLimit === "limite" && (
                <View
                  style={tw`flex-row items-center p-3 bg-white shadow-sm rounded-xl`}
                >
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
                    value={maxPlaces}
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
                  onPress={goToEvent}
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

export default EventForm;
