import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import axios from "axios";
import uuid from "react-native-uuid";

const API_URL = process.env.API_URL; // L'URL de ton backend
const sessionId = uuid.v4(); // Génère un ID unique de session (une seule fois)

const Chatbot = () => {
  const [messages, setMessages] = useState<any[]>([]); // Tableau des messages
  const [userMessage, setUserMessage] = useState<string>(''); // Le message de l'utilisateur
  const [isLoading, setIsLoading] = useState<boolean>(false); // Indicateur de chargement

  useEffect(() => {
    // Lancer une première requête de bienvenue lorsque la composant se charge
    sendMessage("Hello"); 
  }, []);

  // Fonction pour envoyer le message de l'utilisateur
  const sendMessage = async (message: string) => {
    if (!message.trim()) return; // Ne rien envoyer si le message est vide
    setIsLoading(true); // Afficher un indicateur de chargement

    try {
      // Envoie du message à l'API backend
      const response = await axios.post(`${API_URL}/chatbot/`, {
        message, 
        sessionId,
      });

      const botResponse = response.data.response;
      setMessages((prevMessages) => [...prevMessages, { text: message, from: "user" }, { text: botResponse, from: "bot" }]);
      setUserMessage(''); // Réinitialiser le champ de texte après l'envoi
    } catch (error) {
      console.error("Erreur avec le serveur Express", error);
    } finally {
      setIsLoading(false); // Désactiver l'indicateur de chargement
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Chatbot</Text>
      <View style={{ flex: 1 }}>
        {messages.map((msg, index) => (
          <Text key={index} style={{ marginBottom: 10, fontSize: 18 }}>
            {msg.from === "bot" ? `Bot: ${msg.text}` : `You: ${msg.text}`}
          </Text>
        ))}
        {isLoading && <Text>Loading...</Text>} {/* Affiche le message de chargement */}
      </View>
      <TextInput
        style={styles.input}
        value={userMessage}
        onChangeText={setUserMessage} // Met à jour l'état de userMessage
        placeholder="Type your message here"
      />
      <Button title="Send" onPress={() => sendMessage(userMessage)} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Chatbot;
