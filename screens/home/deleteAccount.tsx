import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ScrollView,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';  

export default function DeleteAccount(props: any) {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigation();

  const handleDeleteAccount = () => {
    if (!password) {
      Alert.alert("Champ requis", "Veuillez entrer votre mot de passe pour confirmer.");
      return;
    }

    setIsSubmitting(true);

    Alert.alert(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer définitivement votre compte ? Cette action est irréversible.",
      [
        {
          text: "Annuler",
          style: "cancel",
          onPress: () => setIsSubmitting(false)
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            setTimeout(() => {
              setIsSubmitting(false);
              Alert.alert(
                "Compte supprimé",
                "Votre compte a été supprimé avec succès.",
                [{ text: "OK", onPress: () => props.navigation.navigate("firstpage") }]
              );
            }, 1500);
          }
        }
      ]
    );
  };

  return (
    <ScrollView  keyboardShouldPersistTaps="handled">
      <View style={tw`p-6 bg-pink-100`}>
        {/* Header */}
        <Text style={tw`text-2xl font-bold text-gray-900 text-center mb-6`}>
          Suppression de compte
        </Text>

        {/* Informations */}
        <View style={[styles.card, tw`mb-6`]}>
          <View style={tw`flex-row items-start mb-3`}>
            <Icon name="info-circle" size={20} color="#3B82F6" style={tw`mt-1 mr-2`} />
            <View style={tw`flex-1`}>
              <Text style={tw`text-base font-medium text-gray-900`}>
                Avant de supprimer votre compte...
              </Text>
              <Text style={tw`text-sm text-gray-600 mt-1`}>
                Si vous rencontrez un problème, vous pouvez nous contacter via le formulaire de réclamation avant de prendre cette décision irréversible.
              </Text>
            </View>
          </View>
        </View>

        {/* Instructions */}
        <View style={[styles.card, tw`mb-6`]}>
          <Text style={tw`text-lg font-bold text-gray-900 mb-3`}>
            Comment faire une réclamation ?
          </Text>
          {[
            "Accédez au menu latéral (Sidebar)",
            "Cliquez sur le bouton \"Réclamation\"",
            "Rédigez votre remarque en détail",
            "Nous traiterons votre demande rapidement"
          ].map((item, index) => (
            <View key={index} style={tw`flex-row mb-2`}>
              <Text style={styles.bullet}>•</Text>
              <Text style={tw`text-gray-700 flex-1`}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Formulaire de suppression */}
        <View style={[styles.card, tw`mb-2`]}>
          <Text style={tw`text-lg font-bold text-gray-900 mb-4`}>
            Confirmer la suppression du compte
          </Text>
          <Text style={tw`text-sm text-gray-600 mb-4`}>
            Pour supprimer définitivement votre compte, veuillez saisir votre mot de passe ci-dessous.
          </Text>

          <View style={[styles.inputContainer, tw`mb-6`]}>
            <Icon name="lock" size={20} color="#6B7280" style={tw`mr-3`} />
            <TextInput
              placeholder="Mot de passe actuel"
              style={tw`flex-1 h-12 text-gray-900`}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.primaryButton,
              isSubmitting && styles.disabledButton,
              tw`mb-4`
            ]}
            onPress={handleDeleteAccount}
            disabled={isSubmitting}
            activeOpacity={0.8}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={tw`text-lg font-bold text-white`}>
                Supprimer mon compte
              </Text>
            )}
          </TouchableOpacity>

          <Text style={tw`text-xs text-gray-500 text-center`}>
            En confirmant, toutes vos données seront définitivement effacées et ne pourront être récupérées.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: "#F9FAFB"
  },
  primaryButton: {
    backgroundColor: "black",
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.7,
  },
  bullet: {
    color: "#6B7280",
    marginRight: 8,
    lineHeight: 20,
  }
});
