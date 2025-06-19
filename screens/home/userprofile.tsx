import React, { useState, useCallback } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

type AvatarType = 'homme' | 'femme' | 'neutre';

const UserProfile = (props: any) => {
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarType>("homme");
  const apiUrl = process.env.API_URL;
  const [isEditing, setIsEditing] = useState(false);
  const [newNom, setNewNom] = useState("");
const [newPrenom, setNewPrenom] = useState("");


  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/users/${props.route.params.id}`);
      const userData = response.data;
      setName(userData.nom);
      setPrenom(userData.prenom);
      setEmail(userData.email);
      setNewNom(userData.nom);         // pour pré-remplir les champs modifiables
      setNewPrenom(userData.prenom);

    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [props.route.params.id]);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [fetchUserData])
  );
  type AvatarType = 'homme' | 'femme'; 
  const avatars: Record<AvatarType, any> = {
    homme: require('../../images/homme.jpg'),
    femme: require('../../images/OIP2.jpg'),
    
    
  };

  const handleSave = async () => {
    try {
    await axios.put(`${apiUrl}/user/users/${props.route.params.id}/nom`, { nom: newNom });
await axios.put(`${apiUrl}/user/users/${props.route.params.id}/prenom`, { prenom: newPrenom });
setName(newNom);
setPrenom(newPrenom);

      alert("Modifications enregistrées !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
    setIsEditing(false);
  };

  const goToDeleteAccount = () => {
    props.navigation.navigate("deleteAccount", {
      user_id: props.route.params.id,
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header avec avatar */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={avatars[selectedAvatar]}
            style={styles.avatar}
          />
          {isEditing && (
            <TouchableOpacity style={styles.editAvatarButton}>
              <MaterialIcons name="edit" size={20} color="#4F46E5" />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.userName}>{name} {prenom}</Text>
        <Text style={styles.userEmail}>{email}</Text>

        {isEditing && (
          <View style={styles.avatarSelector}>
            {Object.keys(avatars).map((avatar) => (
              <TouchableOpacity
                key={avatar}
                style={[
                  styles.avatarOption,
                  selectedAvatar === avatar && styles.selectedAvatarOption
                ]}
                onPress={() => setSelectedAvatar(avatar as AvatarType)}
              >
                <Image 
                  source={avatars[avatar as AvatarType]} 
                  style={styles.avatarOptionImage} 
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Section informations personnelles */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations Personnelles</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nom</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#64748B" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
             value={newNom}
  onChangeText={setNewNom}
  editable={isEditing}
              placeholder="Votre nom"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Prénom</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#64748B" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={newPrenom}
  onChangeText={setNewPrenom}
  editable={isEditing}
              placeholder="Votre prénom"
            />
          </View>
        </View>
      </View>

      {/* Section coordonnées */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Coordonnées</Text>
        
        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={20} color="#64748B" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Localisation</Text>
              <Text style={styles.infoValue}>Fonctionnalité à venir</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="mail-outline" size={20} color="#64748B" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{email}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Boutons d'action */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.button, isEditing ? styles.saveButton : styles.editButton]}
          onPress={() => {
            if (isEditing) handleSave();
            setIsEditing(!isEditing);
          }}
        >
          <Text style={styles.buttonText}>
            {isEditing ? "Enregistrer" : "Modifier mon profil"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.manageButton]}
          onPress={goToDeleteAccount}
        >
          <Text style={styles.buttonText}>Gérer mon compte</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  contentContainer: {
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    padding: 4,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#EDE9FE',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 16,
  },
  userEmail: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 4,
  },
  avatarSelector: {
    flexDirection: 'row',
    marginTop: 16,
  },
  avatarOption: {
    marginHorizontal: 8,
    borderRadius: 30,
    padding: 2,
  },
  selectedAvatarOption: {
    borderWidth: 2,
    borderColor: '#4F46E5',
  },
  avatarOptionImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
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
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  inputDisabled: {
    color: '#64748B',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoTextContainer: {
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#1E293B',
  },
  actionsContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editButton: {
    backgroundColor: '#4F46E5',
  },
  saveButton: {
    backgroundColor: '#10B981',
  },
  manageButton: {
    backgroundColor: '#F59E0B',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default UserProfile;