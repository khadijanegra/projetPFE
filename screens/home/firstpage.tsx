import React from "react";
import { 
  TouchableOpacity, 
  Text, 
  Image, 
  View, 
  Dimensions,
  StyleSheet
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native"; // Ajouté
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");


  const Firstpage = ({ navigation }: { navigation: any }) => { // Utiliser useNavigation ici
  const goToHome = () => {
    navigation.navigate("homepage");
  };
  

  return (
    <View style={[tw`flex-1 bg-white`, styles.container]}>
      <SafeAreaView style={tw`flex-1`}>
        
        {/* Image centrale agrandie */}
        <View style={tw`flex-1 justify-center`}>
          <Image
            source={require("../../images/firsst.png")}
            style={styles.mainImage}
            resizeMode="contain"
          />
        </View>

        {/* Texte et bouton */}
        <View style={tw`px-8 pb-10`}>
          <View style={[styles.iconContainer, tw`self-center mb-6`]}>
            <Icon name="map-pin" size={28} color="#4f46e5" />
          </View>
          
          <Text style={[styles.title, tw`text-center mb-4`]}>
            Explorez votre ville
          </Text>
          
          <Text style={[styles.subtitle, tw`text-center mb-8`]}>
            Découvrez les meilleurs endroits autour de vous
          </Text>

          {/* Bouton principal */}
          <TouchableOpacity
            style={[styles.button, tw`shadow-lg`]}
            onPress={goToHome}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#6366f1', '#8b5cf6']}
              style={[tw`rounded-full`, styles.gradient]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Commencer l'exploration</Text>
              <Icon name="arrow-right" size={20} color="white" style={tw`ml-2`} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  mainImage: {
    width: width * 0.95,
    height: height * 0.45,
    alignSelf: 'center'
  },
  iconContainer: {
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    lineHeight: 34
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24
  },
  button: {
    borderRadius: 25,
    overflow: 'hidden'
  },
  gradient: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600'
  }
});

export default Firstpage;
