import React, { useState, useRef, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  Image, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  Animated,
  Easing
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import tw from "tailwind-react-native-classnames";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";

const apiUrl = process.env.API_URL;

export default function Signup(props: any) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(30)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animation au montage du composant
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.back(1)),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleSubmit = async () => {
    if (!nom || !prenom || !email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${apiUrl}/user/register`, {
        nom, prenom, email, password, localisation
      });
      
      if (response.data.token) {
        Alert.alert("Succès", "Compte créé avec succès");
        props.navigation.navigate("locationdemand", { id: response.data.id });
      }
    } catch (error) {
      console.error("Erreur:", error);
      Alert.alert("Erreur", "Cet email est déjà utilisé ou problème de connexion");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LinearGradient colors={['#f0f9ff', '#e0f2fe']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <SafeAreaView style={tw`flex-1 px-6`}>
            <Animated.View 
              style={[
                styles.content,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideUpAnim }]
                }
              ]}
            >
              <Image 
                source={require("../../images/sign.png")}
                style={styles.logo}
              />
              
              <Text style={styles.title}>Créer un compte</Text>
              <Text style={styles.subtitle}>Rejoignez la communauté BonPlan</Text>

              {/* Nom et Prénom en ligne */}
              <View style={styles.nameContainer}>
                <Animated.View 
                  style={[
                    styles.inputContainer, 
                    { 
                      flex: 1, 
                      marginRight: 10,
                    }
                  ]}
                >
                  <Icon name="user" size={18} color="#6366f1" style={tw`mr-3`} />
                  <TextInput
                    value={nom}
                    onChangeText={setNom}
                    placeholder="Nom"
                    placeholderTextColor="#9ca3af"
                    style={styles.input}
                  />
                </Animated.View>

                <Animated.View style={[styles.inputContainer, { flex: 1 }]}>
                  <TextInput
                    value={prenom}
                    onChangeText={setPrenom}
                    placeholder="Prénom"
                    placeholderTextColor="#9ca3af"
                    style={styles.input}
                  />
                </Animated.View>
              </View>

              {/* Email */}
              <Animated.View style={styles.inputContainer}>
                <Icon name="envelope" size={18} color="#6366f1" style={tw`mr-3`} />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                />
              </Animated.View>

              {/* Mot de passe */}
              <Animated.View style={styles.inputContainer}>
                <Icon name="lock" size={18} color="#6366f1" style={tw`mr-3`} />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Mot de passe"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry
                  style={styles.input}
                />
              </Animated.View>

              {/* Localisation */}
              <Animated.View style={styles.inputContainer}>
                <Icon name="map-marker" size={18} color="#6366f1" style={tw`mr-3`} />
                <TextInput
                  value={localisation}
                  onChangeText={setLocalisation}
                  placeholder="Localisation (ville)"
                  placeholderTextColor="#9ca3af"
                  style={styles.input}
                />
              </Animated.View>

              {/* Bouton d'inscription */}
              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <TouchableOpacity
                  style={[styles.loginButton, isSubmitting && styles.disabledButton]}
                  onPress={handleSubmit}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  disabled={isSubmitting}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#6366f1', '#8b5cf6']}
                    style={styles.gradientButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    {isSubmitting ? (
                      <Text style={styles.buttonText}>Création en cours...</Text>
                    ) : (
                      <>
                        <Text style={styles.buttonText}>Créer mon compte</Text>
                        <Icon name="user-plus" size={16} color="white" style={tw`ml-3`} />
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Déjà un compte ? </Text>
                <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
                  <Text style={styles.signupLink}>Se connecter</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </SafeAreaView>
        </ScrollView>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
    fontFamily: 'sans-serif-medium',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  nameContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 15,
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