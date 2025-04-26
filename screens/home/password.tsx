import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import tw from "tailwind-react-native-classnames";
import axios from "axios";

const apiUrl = process.env.API_URL;

export default function Password(props: any) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email) {
      Alert.alert("Erreur", "Veuillez entrer votre adresse email");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/user/forgot-password`, {
        email,
      });

      if (response.data.message === "Verification code sent") { 
        Alert.alert("Succès", "Un email de réinitialisation a été envoyé !");
        props.navigation.navigate("passwordkey", { email: email }); 
      }
    } catch (error) {
      console.error("Erreur:", error); 
      Alert.alert("Erreur", "Adresse email non reconnue ou problème de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#fef2f2', '#fee2e2']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
        <SafeAreaView style={tw`flex-1 px-6`}>
          <View style={styles.content}>
            <Image 
              source={require("../../images/femme.png")}
              style={styles.image}
            />
            
            <Text style={styles.title}>Réinitialisation du mot de passe</Text>
            
            <Text style={styles.subtitle}>
              Entrez votre adresse email associée à votre compte pour recevoir un code de vérification
            </Text>

            <View style={styles.inputContainer}>
              <Icon name="envelope" size={20} color="#ef4444" style={tw`mr-3`} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Votre adresse email"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#ef4444', '#dc2626']}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {isLoading ? (
                  <Text style={styles.buttonText}>Envoi en cours...</Text>
                ) : (
                  <>
                    <Text style={styles.buttonText}>Confirmer</Text>
                    <Icon name="arrow-right" size={16} color="white" style={tw`ml-2`} />
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={tw`mt-4`}
              onPress={() => props.navigation.goBack()}
            >
              <Text style={styles.backLink}>
                <Icon name="arrow-left" size={14} color="#ef4444" /> Retour à la connexion
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#1f2937',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  gradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backLink: {
    color: '#ef4444',
    fontSize: 14,
    fontWeight: '500',
  },
});