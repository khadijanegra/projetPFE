import { CheckBox } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

const API_URL = process.env.API_URL;

export default function Login(props: any) {
  const [checked, setChecked] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleCheckbox = () => setChecked(!checked);
  const go = () => props.navigation.navigate("Password");

  useEffect(() => {
    console.log("ID mis à jour:", id);
  }, [id]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/user/signIn`, {
        email,
        password,
      });

      if (response.data.token) {
        Alert.alert("Succès", "Connexion réussie !");
        setId(response.data.id);
        setTimeout(() => {
          props.navigation.navigate("acceuilpage", { id: response.data.id });
        }, 1000);
      }
    } catch (error) {
      console.log("Erreur de connexion:", error);
      Alert.alert("Erreur", "Email ou mot de passe invalide !");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#f8fafc', '#e2e8f0']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
        <SafeAreaView style={tw`flex-1 p-6`}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={tw`items-center mb-10`}>
              <Image 
                source={require("../../images/signup.png")}
                style={styles.logo}
              />
              <Text style={styles.title}>Connexion</Text>
              <Text style={styles.subtitle}>Accédez à votre compte BonPlan</Text>
            </View>

            {/* Champ Email */}
            <View style={styles.inputContainer}>
              <Icon name="envelope" size={20} color="#6366f1" style={tw`mr-3`} />
              <TextInput
                placeholder="Adresse e-mail"
                placeholderTextColor="#94a3b8"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Champ Mot de passe */}
            <View style={styles.inputContainer}>
              <Icon name="lock" size={20} color="#6366f1" style={tw`mr-3`} />
              <TextInput
                placeholder="Mot de passe"
                placeholderTextColor="#94a3b8"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity onPress={go} style={tw`self-end mb-6`}>
              <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
            </TouchableOpacity>

            {/* Checkbox */}
            <View style={styles.checkboxContainer}>
              <CheckBox 
                checked={checked} 
                onPress={toggleCheckbox}
                checkedColor="#6366f1"
                containerStyle={styles.checkbox}
              />
              <Text style={styles.checkboxText}>J'accepte la Politique de confidentialité</Text>
            </View>

            {/* Bouton Connexion */}
            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.disabledButton]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#6366f1', '#8b5cf6']}
                style={styles.gradientButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {isLoading ? (
                  <Text style={styles.buttonText}>Connexion en cours...</Text>
                ) : (
                  <>
                    <Text style={styles.buttonText}>Se Connecter</Text>
                    <Icon name="arrow-right" size={18} color="white" style={tw`ml-3`} />
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Pas encore de compte ? </Text>
              <TouchableOpacity onPress={() => props.navigation.navigate("signup")}>
                <Text style={styles.signupLink}>S'inscrire</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
    fontFamily: 'sans-serif-medium',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 25,
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
    color: '#1e293b',
  },
  forgotPassword: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '500',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  checkboxText: {
    color: '#64748b',
    fontSize: 14,
  },
  loginButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  gradientButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  signupText: {
    color: '#64748b',
    fontSize: 14,
  },
  signupLink: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '600',
  },
});