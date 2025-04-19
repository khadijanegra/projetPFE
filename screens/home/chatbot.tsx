import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet, ScrollView, Image } from "react-native";
import axios from "axios";
import uuid from "react-native-uuid";

const apiUrl = process.env.API_URL; // L'URL de ton API
const sessionId = uuid.v4(); // Session unique pour chaque utilisateur

const Chatbot = () => {
  const [messages, setMessages] = useState<any[]>([]); // Stockage des messages
  const [userMessage, setUserMessage] = useState<string>(''); // Message de l'utilisateur
  const [isLoading, setIsLoading] = useState<boolean>(false); // Indicateur de chargement
  const [error, setError] = useState<string>(''); // Gestion des erreurs

  useEffect(() => {
    sendMessage("Hello"); // Envoie un message initial
  }, []);

  // Fonction pour envoyer le message à l'API
  const sendMessage = async (message: string) => {
    if (!message.trim()) return; // Ne pas envoyer de message vide
    setIsLoading(true); // Mettre à jour l'état de chargement
    setError(''); // Réinitialiser l'erreur

    try {
      // Appel API pour envoyer le message au chatbot Gemini
      const response = await axios.post(`${apiUrl}/chatgemini/chat`, {
        message,
        context: "" // Ici tu peux ajouter du contexte si nécessaire
      });

      const data = response.data; // La réponse de l'API (attendue en JSON)

      // Ajouter le message utilisateur et la réponse du bot dans l'état
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, from: "user" },
        { text: data.reply, from: "bot", results: data.results || [] }
      ]);

      setUserMessage(''); // Réinitialiser le champ de texte de l'utilisateur

    } catch (error) {
      console.error("Erreur avec l'API Gemini:", error); // Loguer l'erreur
      setError("Erreur de communication avec l'API. Veuillez réessayer plus tard.");
    } finally {
      setIsLoading(false); // Mettre à jour l'état de chargement
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Chatbot</Text>

        <View style={{ flex: 1 }}>
          {/* Affichage des messages */}
          {messages.map((msg, index) => (
            <View key={index} style={{ marginBottom: 15 }}>
              {msg.from === "user" ? (
                <Text style={{ fontSize: 18, color: "#000" }}>You: {msg.text}</Text>
              ) : (
                <View>
                  <Text style={{ fontSize: 18, color: "#333" }}>Bot: {msg.text}</Text>
                  {/* Affichage des résultats (ex: hôtels) */}
                  {msg.results?.map((hotel: any, idx: number) => (
  <View key={idx} style={{ marginTop: 10 }}>
    <Text style={{ fontWeight: "bold" }}>{hotel.name}</Text>
    <Text>Prix: {hotel.price || "Non disponible"}</Text> {/* Affichage du prix */}
    <Text>Description: {hotel.description || "Aucune description disponible"}</Text> {/* Affichage de la description */}
  </View>
))}
                </View>
              )}
            </View>
          ))}

          {/* Affichage d'un message de chargement si nécessaire */}
          {isLoading && <Text style={{ fontSize: 18, color: "#aaa" }}>Chargement...</Text>}

          {/* Affichage d'une erreur si nécessaire */}
          {error && <Text style={{ fontSize: 18, color: "red" }}>{error}</Text>}
        </View>

        {/* Champ de texte pour saisir un message */}
        <TextInput
          style={styles.input}
          value={userMessage}
          onChangeText={setUserMessage}
          placeholder="Écris ton message ici"
        />
        {/* Bouton pour envoyer le message */}
        <Button title="Envoyer" onPress={() => sendMessage(userMessage)} />
      </View>
    </ScrollView>
  );
};

// Styles de la page
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
