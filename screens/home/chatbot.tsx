import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import axios from "axios";
import uuid from "react-native-uuid";
import { GoogleAuth } from "google-auth-library";
import * as FileSystem from "expo-file-system";
const  API_URL  = process.env.API_URL;
const DIALOGFLOW_API_URL =
  "https://dialogflow.googleapis.com/v2/projects/chatbotguide-bpvc/agent/sessions";
const sessionId = uuid.v4(); // Génère un ID de session unique

const Chatbot = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  
  const sendMessage = async (message: string) => {
    const sessionId = "user-session-" + Math.random().toString(36).substring(7); // Générer un ID unique
  
    try {
      const response = await axios.post(`${API_URL}/chatbot/`, // Remplace avec l'URL Render de ton backend
        { message, sessionId }
      );
  
      const botResponse = response.data.response;
      setMessages((prevMessages) => [...prevMessages, { text: botResponse, from: "bot" }]);
    } catch (error) {
      console.error("Erreur avec le serveur Express", error);
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
      </View>
      <Button title="Send Hello" onPress={() => sendMessage("Hello")} />
    </View>
  );
};

export default Chatbot;
