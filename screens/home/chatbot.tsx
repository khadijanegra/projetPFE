import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import axios from "axios";
import uuid from "react-native-uuid";
import tw from "tailwind-react-native-classnames";
import { Ionicons } from '@expo/vector-icons';

const apiUrl = process.env.API_URL;
const sessionId = uuid.v4();

const Chatbot = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [userMessage, setUserMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    sendWelcomeMessage();
  }, []);

  const sendWelcomeMessage = () => {
    setMessages([{ 
      text: "Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?", 
      from: "bot" 
    }]);
  };

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;
    setIsLoading(true);
    setError('');

    // Ajout immédiat du message de l'utilisateur pour un feedback instantané
    setMessages(prev => [...prev, { text: message, from: "user" }]);
    setUserMessage('');

    try {
      const response = await axios.post(`${apiUrl}/chatgemini/chat`, {
        message,
        context: ""
      });

      const data = response.data;

      setMessages(prev => [
        ...prev,
        { text: data.reply, from: "bot", results: data.results || [] }
      ]);

    } catch (error) {
      console.error("Erreur avec l'API Gemini:", error);
      setError("Désolé, je rencontre un problème technique. Veuillez réessayer.");
      setMessages(prev => [...prev, { 
        text: "Désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer.", 
        from: "bot" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* En-tête */}
      <View style={[tw`p-4 pt-8 pb-4 bg-indigo-600 shadow-md`, styles.header]}>
        <Text style={tw`text-2xl font-bold text-white text-center`}>Assistant Virtuel</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            {/* Zone de messages */}
            <ScrollView 
              style={tw`flex-1 p-4`}
              ref={ref => ref && messages.length > 0 && ref.scrollToEnd({ animated: true })}
              contentContainerStyle={tw`pb-2`}
            >
              {messages.map((msg, index) => (
                <View 
                  key={index} 
                  style={[
                    tw`mb-4 max-w-3/4`,
                    msg.from === "user" ? tw`self-end` : tw`self-start`,
                  ]}
                >
                  <View
                    style={[
                      tw`p-4 rounded-2xl`,
                      msg.from === "user" 
                        ? [tw`bg-indigo-500`, styles.userMessage] 
                        : [tw`bg-white border border-gray-200`, styles.botMessage],
                      styles.messageShadow
                    ]}
                  >
                    <Text style={msg.from === "user" ? tw`text-white` : tw`text-gray-800`}>
                      {msg.text}
                    </Text>
                  </View>

                  {/* Résultats (hôtels) */}
                  {msg.results?.map((hotel: any, idx: number) => (
                    <View 
                      key={idx} 
                      style={[
                        tw`mt-3 p-4 bg-white rounded-xl border border-gray-100`,
                        styles.cardShadow
                      ]}
                    >
                      <Text style={tw`font-bold text-lg text-indigo-600`}>{hotel.name}</Text>
                      <View style={tw`flex-row items-center mt-1`}>
                        <Ionicons name="pricetag" size={16} color="#4f46e5" />
                        <Text style={tw`ml-2 text-gray-700`}>
                          Prix: {hotel.price || "Non disponible"}
                        </Text>
                      </View>
                      <View style={tw`flex-row items-center mt-1`}>
                        <Ionicons name="information-circle" size={16} color="#4f46e5" />
                        <Text style={tw`ml-2 text-gray-700`}>
                          {hotel.description || "Aucune description disponible"}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              ))}

              {isLoading && (
                <View style={tw`self-start p-4 bg-white rounded-2xl border border-gray-200`}>
                  <ActivityIndicator size="small" color="#4f46e5" />
                </View>
              )}
            </ScrollView>

            {/* Zone de saisie */}
            <View style={[tw`p-4 bg-white border-t border-gray-200`, styles.inputContainer]}>
              {error && (
                <Text style={tw`text-red-500 mb-2 text-center`}>{error}</Text>
              )}
              
              <View style={tw`flex-row items-center`}>
                <TextInput
                  style={[
                    tw`flex-1 p-3 bg-gray-100 rounded-full`,
                    styles.input,
                    styles.inputShadow
                  ]}
                  value={userMessage}
                  onChangeText={setUserMessage}
                  placeholder="Écrivez votre message..."
                  placeholderTextColor="#9CA3AF"
                  onSubmitEditing={() => sendMessage(userMessage)}
                />
                
                <TouchableOpacity
                  style={tw`ml-3 bg-indigo-600 p-3 rounded-full`}
                  onPress={() => sendMessage(userMessage)}
                  disabled={isLoading || !userMessage.trim()}
                >
                  <Ionicons 
                    name="send" 
                    size={20} 
                    color="white" 
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  inputContainer: {
    paddingBottom: Platform.OS === 'ios' ? 25 : 15,
  },
  input: {
    fontSize: 16,
  },
  inputShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userMessage: {
    borderBottomRightRadius: 4,
  },
  botMessage: {
    borderBottomLeftRadius: 4,
  },
  messageShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default Chatbot;