import React from "react";
import * as Animatable from "react-native-animatable";
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from "react-native";
import tw from "tailwind-react-native-classnames";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Feather";

const { width, height } = Dimensions.get("window");

const Homepage = ({ navigation }: { navigation: any }) => {
  const goToLogin = () => navigation.navigate("Login");
  const goToSignup = () => navigation.navigate("signup");

  return (
    <LinearGradient
      colors={['#ffffff', '#f1f5f9']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animatable.View 
          animation="fadeInUp"
          duration={800}
          style={styles.mainImageContainer}
        >
          <Image
            source={require("../../images/home.png")}
            style={styles.mainImage}
            resizeMode="contain"
          />
        </Animatable.View>

        <Animatable.View 
          animation="fadeIn"
          duration={800}
          delay={400}
          style={styles.titleContainer}
        >
          <Text style={styles.titleText}>
            Bienvenue sur BonPlan
          </Text>
          <Text style={styles.subtitleText}>
            Découvrez les meilleures offres près de chez vous
          </Text>
        </Animatable.View>

        <Animatable.View 
          animation="fadeInUp"
          duration={800}
          delay={600}
          style={styles.buttonsContainer}
        >
          <TouchableOpacity
            style={[styles.button, tw`shadow-lg`]}
            onPress={goToLogin}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#6366f1', '#8b5cf6']}
              style={[tw`rounded-full py-4 px-8 flex-row items-center justify-center`, { width: '100%' }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={[styles.buttonText, tw`text-white font-semibold text-lg`]}>
                Se Connecter
              </Text>
              <Icon name="arrow-right" size={20} color="white" style={tw`ml-2`} />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, tw`shadow-lg`]}
            onPress={goToSignup}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#e0e7ff', '#ede9fe']}
              style={[tw`rounded-full py-4 px-8 flex-row items-center justify-center`, { width: '100%' }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={[styles.buttonText, tw`text-indigo-600 font-semibold text-lg`]}>
                Créer un compte
              </Text>
              <Icon name="user-plus" size={20} color="#6366f1" style={tw`ml-2`} />
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  mainImageContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: height * 0.05,
  },
  mainImage: {
    width: width * 0.8,
    height: width * 0.6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  titleContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
  },
  subtitleText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 24,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 9999,
  },
  buttonText: {
    textAlign: 'center',
  },
});

export default Homepage;