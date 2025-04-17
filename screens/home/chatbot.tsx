import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import uuid from "react-native-uuid";

const API_URL = process.env.API_URL; // URL de ton backend chatbot
const sessionId = uuid.v4(); // ID unique de session

const Chatbot = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [userMessage, setUserMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    sendMessage("Hello");
  }, []);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;
    setIsLoading(true);

    try {
      // 🔹 Appel API Chatbot
      const response = await axios.post(`${API_URL}/chatbot/`, {
        message,
        sessionId,
      });

      const botResponse = response.data.response;

      // 🔹 Mise à jour des messages
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, from: "user" },
        { text: botResponse, from: "bot" }
      ]);
      setUserMessage('');

      // 🔹 Appel API Webhook après la réponse du bot
      await axios.post(`${API_URL}/web/webhook`, {
        message,
        response: botResponse,
        sessionId,
      });

    } catch (error) {
      console.error("Erreur avec le serveur Express", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Chatbot</Text>

        <View style={{ flex: 1 }}>
          {messages.map((msg, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              {msg.from === "bot" ? (
                msg.text.split("\n").map((line: string, i: number) => (
                  <Text key={i} style={{ fontSize: 18, color: "#333" }}>
                    {i === 0 ? `Bot: ${line}` : line}
                  </Text>
                ))
              ) : (
                <Text style={{ fontSize: 18, color: "#000" }}>You: {msg.text}</Text>
              )}
            </View>
          ))}
          {isLoading && <Text>Loading...</Text>}
        </View>

        <TextInput
          style={styles.input}
          value={userMessage}
          onChangeText={setUserMessage}
          placeholder="Type your message here"
        />
        <Button title="Send" onPress={() => sendMessage(userMessage)} />
      </View>
    </ScrollView>
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
