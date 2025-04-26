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
  StyleSheet
} from "react-native";
import { Keyboard } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";

const apiUrl = process.env.API_URL;

const FormEvent = (props: any) => {
  // Couleurs modernes
  const colors = {
    primary: "#4F46E5",       // Indigo
    secondary: "#FFFFFF",     // Blanc
    background: "#F8FAFC",    // Fond très clair
    accent: "#EC4899",        // Rose vif
    textDark: "#1E293B",      // Gris très foncé
    textMedium: "#64748B",    // Gris moyen
    textLight: "#94A3B8",     // Gris clair
    border: "#E2E8F0",        // Bordure claire
    success: "#10B981"        // Vert
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
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Créez votre événement</Text>
          <Text style={styles.headerSubtitle}>Rendez-le mémorable 🎉💫</Text>
        </View>

        {/* Basic Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations principales</Text>

          {/* Event Title */}
          <View style={styles.inputContainer}>
            <Ionicons name="calendar" size={20} color={colors.primary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Titre de l'événement"
              placeholderTextColor={colors.textLight}
              value={titre}
              onChangeText={setTitle}
            />
          </View>

          {/* Description */}
          <View style={[styles.inputContainer, { height: 120 }]}>
            <TextInput
              style={[styles.input, { textAlignVertical: 'top' }]}
              multiline
              placeholder="Description détaillée..."
              placeholderTextColor={colors.textLight}
              value={description}
              onChangeText={setDescription}
            />
          </View>
        </View>

        {/* Dates Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dates et horaires</Text>

          <TouchableOpacity
            style={styles.inputContainer}
            onPress={showStartDatePicker}
          >
            <Ionicons name="time" size={20} color={colors.primary} style={styles.inputIcon} />
            <Text style={styles.dateText}>{formatDate(date_debut)}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.inputContainer}
            onPress={showEndDatePicker}
          >
            <Ionicons name="time" size={20} color={colors.primary} style={styles.inputIcon} />
            <Text style={styles.dateText}>{formatDate(date_fin)}</Text>
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
        </View>

        {/* Price Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tarification</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="money" size={20} color={colors.primary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Prix (€)"
              placeholderTextColor={colors.textLight}
              keyboardType="numeric"
              value={prix}
              onChangeText={setPrice}
            />
          </View>
        </View>

        {/* Places Limit Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Places disponibles</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setPlaceLimit(false)}
            >
              <View style={styles.radioCircle}>
                {!limite && <View style={styles.radioSelected} />}
              </View>
              <Text style={styles.radioLabel}>Non limité</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setPlaceLimit(true)}
            >
              <View style={styles.radioCircle}>
                {limite && <View style={styles.radioSelected} />}
              </View>
              <Text style={styles.radioLabel}>Limité</Text>
            </TouchableOpacity>
          </View>

          {limite && (
            <View style={styles.inputContainer}>
              <Ionicons name="people" size={20} color={colors.primary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nombre maximum de places"
                placeholderTextColor={colors.textLight}
                keyboardType="numeric"
                value={nbr_place}
                onChangeText={setMaxPlaces}
              />
            </View>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>CRÉER L'ÉVÉNEMENT</Text>
        </TouchableOpacity>

        {/* Success Modal */}
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.modalOverlay}>
            <Animated.View
              style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}
            >
              <Image
                source={require("../../images/Illustration.png")}
                style={styles.modalImage}
              />
              <Text style={styles.modalTitle}>Félicitations !</Text>
              <Text style={styles.modalText}>Votre événement a été créé avec succès !</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Confirmer</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748B',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4F46E5',
  },
  radioLabel: {
    fontSize: 16,
    color: '#1E293B',
  },
  submitButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 32,
    alignItems: 'center',
  },
  modalImage: {
    width: 160,
    height: 160,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default FormEvent;