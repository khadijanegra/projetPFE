import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const apiUrl = process.env.API_URL;

const Consultshop = (props: any) => {
  const [shopData, setShopData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const shopId = props.route.params.shopId;

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/shops/${shopId}`);
        setShopData(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchShopData();
  }, [shopId]);

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/shops/${shopId}`, shopData);
      setIsEditing(false);
      alert("Modifications enregistrées avec succès!");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const handleCreateEvent = async () => {
    props.navigation.navigate("formevent", { shopId });
  };

  if (loading) return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#6366F1" />
      <Text style={styles.loadingText}>Chargement des données...</Text>
    </View>
  );

  if (error) return (
    <View style={styles.errorContainer}>
      <Ionicons name="alert-circle" size={48} color="#EF4444" />
      <Text style={styles.errorText}>Erreur lors du chargement des données du magasin</Text>
      <TouchableOpacity
        style={styles.retryButton}
        onPress={() => setError(false)}
      >
        <Text style={styles.buttonText}>Réessayer</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {shopData && (
        <View style={styles.contentContainer}>
          {/* Header avec image */}
          <View style={styles.headerImageContainer}>
            <Image
              source={{ uri: `${apiUrl}/fetchshopImages/${shopData.shopImage}` }}
              style={styles.headerImage}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => props.navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Contenu principal */}
          <View style={styles.mainContent}>
            <View style={styles.infoCard}>
              {/* Titre */}
              <View style={styles.titleContainer}>
                <Text style={styles.shopName}>{shopData.shop_nom}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={20} color="#F59E0B" />
                  <Text style={styles.ratingText}>4.8</Text>
                </View>
              </View>

              {/* Section informations */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informations du magasin</Text>

                {/* Champ Description */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Description</Text>
                  <TextInput
                    style={[styles.input, isEditing && styles.editableInput]}
                    value={shopData.shop_desc}
                    onChangeText={(text) =>
                      setShopData({ ...shopData, shop_desc: text })
                    }
                    editable={isEditing}
                    multiline
                    numberOfLines={3}
                  />
                </View>

                {/* Champ Localisation */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Localisation</Text>
                  <View style={styles.inputWithIcon}>
                    <Ionicons name="location-outline" size={18} color="#6366F1" />
                    <TextInput
                      style={[styles.input, isEditing && styles.editableInput]}
                      value={shopData.shop_local}
                      onChangeText={(text) =>
                        setShopData({ ...shopData, shop_local: text })
                      }
                      editable={isEditing}
                    />
                  </View>
                </View>

                {/* Champ Numéro de téléphone */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Téléphone</Text>
                  <View style={styles.inputWithIcon}>
                    <Ionicons name="call-outline" size={18} color="#6366F1" />
                    <TextInput
                      style={[styles.input, isEditing && styles.editableInput]}
                      value={shopData.phone}
                      onChangeText={(text) =>
                        setShopData({ ...shopData, phone: text })
                      }
                      editable={isEditing}
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>

                {/* Horaires */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Horaires d'ouverture</Text>
                  <View style={styles.timeContainer}>
                    <View style={styles.timeInput}>
                      <Text style={styles.timeLabel}>Ouverture</Text>
                      <TextInput
                        style={[styles.input, isEditing && styles.editableInput]}
                        value={shopData.shop_date_ouv}
                        onChangeText={(text) =>
                          setShopData({ ...shopData, shop_date_ouv: text })
                        }
                        editable={isEditing}
                      />
                    </View>
                    <View style={styles.timeInput}>
                      <Text style={styles.timeLabel}>Fermeture</Text>
                      <TextInput
                        style={[styles.input, isEditing && styles.editableInput]}
                        value={shopData.shop_date_ferm}
                        onChangeText={(text) =>
                          setShopData({ ...shopData, shop_date_ferm: text })
                        }
                        editable={isEditing}
                      />
                    </View>
                  </View>
                </View>
              </View>

              {/* Boutons d'action */}
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.button, isEditing ? styles.saveButton : styles.editButton]}
                  onPress={() => {
                    if (isEditing) handleSave();
                    setIsEditing(!isEditing);
                  }}
                >
                  <View style={styles.buttonContent}>
                    <Ionicons
                      name={isEditing ? "checkmark-circle" : "pencil"}
                      size={20}
                      color="white"
                    />
                    <Text style={styles.buttonText}>
                      {isEditing ? "Enregistrer" : "Modifier"}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.eventButton]}
                  onPress={handleCreateEvent}
                >
                  <View style={styles.buttonContent}>
                    <Ionicons name="add-circle" size={20} color="white" />
                    <Text style={styles.buttonText}>Évènement</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Section supplémentaire */}
          <View style={styles.aboutSection}>
            <Text style={styles.sectionTitle}>À propos</Text>
            <View style={styles.aboutCard}>
              <Text style={styles.aboutText}>
                Ce magasin propose une sélection de produits de qualité pour répondre à vos besoins.
              </Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  contentContainer: {
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingText: {
    marginTop: 16,
    color: '#64748B',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    color: '#1E293B',
    marginTop: 16,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 24,
    backgroundColor: '#6366F1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  headerImageContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 240,
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  mainContent: {
    paddingHorizontal: 16,
    marginTop: -24,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  shopName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  ratingText: {
    marginLeft: 4,
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
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 16,
    color: '#1E293B',
    fontSize: 16,
  },
  editableInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingLeft: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeInput: {
    width: '48%',
  },
  timeLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#6366F1',
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  eventButton: {
    backgroundColor: '#1E293B',
    marginLeft: 8,
  },
  aboutSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  aboutCard: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 16,
  },
  aboutText: {
    color: '#64748B',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Consultshop;