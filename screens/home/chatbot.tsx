import React from "react";
import { View, Text, Button } from "react-native";
import axios from "axios";

// Replace with your Dialogflow API details
const DIALOGFLOW_API_URL = "https://dialogflow.googleapis.com/v2/projects/chatbotguide-bpvc/agent/sessions/user12345-session1:detectIntent";
const DIALOGFLOW_API_KEY = "6fdb9f66b4ae4533d746dbdfb4d63b52e88171b8"; // Your API key


const Chatbot = () => {
  const [messages, setMessages] = React.useState<any[]>([]);

  const sendMessage = async (message: string) => {
    try {
      const response = await axios.post(
        DIALOGFLOW_API_URL,
        {
          queryInput: {
            text: {
              text: message,
              languageCode: "en",
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${DIALOGFLOW_API_KEY}`,
          },
        }
      );

      const botResponse = response.data.queryResult.fulfillmentText;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, from: "bot" },
      ]);
    } catch (error) {
      console.error("Error sending message to Dialogflow", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Chatbot</Text>
      <View style={{ flex: 1 }}>
        {/* Display messages */}
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
