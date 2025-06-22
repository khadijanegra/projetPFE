import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Animated,
  Easing,
  TouchableOpacity
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons } from "@expo/vector-icons";

const apiUrl = process.env.API_URL;

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface user {
  id: string;
  nom: string;
  prenom: string;
  email: string;
}

interface Order {
  _id: string;
  prix_total: number;
  date_creation: Date;
  date_recuperation: string;
  plats_menu: OrderItem[];
  random_code: string;
  user_id: user;
}

const OrderScreen: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scale = useState(new Animated.Value(1))[0];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${apiUrl}/commande/getallcommandes`);
        if (response.status === 200) {
          setOrders(response.data);
          console.log(
            "Commande recuperer  " + JSON.stringify(response.data, null, 2)
          );

          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
          }).start();
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const [completedOrders, setCompletedOrders] = useState<Set<string>>(
    new Set()
  );

  const markAsCompleted = (id: string) => {
    setCompletedOrders((prev) => new Set(prev).add(id));
  };

  if (loading) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-blue-50`}>
        <View style={tw`flex items-center`}>
          <Ionicons
            name="fast-food"
            size={60}
            color="#4F46E5"
            style={tw`mb-4 animate-ping`}
          />
          <Text style={tw`text-2xl font-bold text-indigo-700 mt-4`}>
            Préparation des données...
          </Text>
          <Text style={tw`text-gray-500 mt-2`}>Vos commandes arrivent !</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={tw`bg-gradient-to-b from-blue-50 to-purple-50 px-4 py-6`}
    >
      <View style={tw`flex items-center mb-8`}>
        <Text style={tw`text-gray-700 mt-1 text-xl font-bold  `}>
          {" "}
          🍽️ Commandes en attente
        </Text>
      </View>

      {orders.map((order) => (
        <Animated.View
          key={order._id}
          style={[
            tw`bg-white p-6 mb-6 rounded-3xl shadow-2xl border-2 border-indigo-50`,
            { opacity: fadeAnim },
          ]}
        >
          <View style={tw`flex-row justify-between items-start mb-4`}>
            <View>
              <Text style={tw`text-xs text-purple-400 font-semibold`}>
                #{order.random_code}
              </Text>
              <Text style={tw`text-xl font-black text-indigo-900`}>
                👤{order.user_id ? `${order.user_id.nom} ${order.user_id.prenom}` : 'Utilisateur inconnu'}
              </Text>
            </View>
            <View
              style={tw`${
                completedOrders.has(order._id) ? "bg-blue-100" : "bg-green-100"
              } px-3 py-1 rounded-full`}
            >
              <Text
                style={tw`${
                  completedOrders.has(order._id)
                    ? "text-blue-700"
                    : "text-green-700"
                } text-xs font-bold`}
              >
                {completedOrders.has(order._id)
                  ? "✅ Terminée"
                  : "🕒 En préparation"}
              </Text>
            </View>
            
          </View>

          <View style={tw`mb-4 bg-indigo-100 p-3 rounded-xl`}>
            <View style={tw`flex-row items-center mb-2`}>
              <Ionicons name="time-outline" size={16} color="#4F46E5" />
              <Text style={tw`ml-2 text-indigo-700 font-medium`}>
                {new Date(order.date_creation).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="alarm-outline" size={16} color="#4F46E5" />
              <Text style={tw`ml-2 text-indigo-700 font-medium`}>
                Retrait à {order.date_recuperation}
              </Text>
            </View>
          </View>

          <View style={tw`mb-4`}>
            <Text style={tw`text-lg font-black text-indigo-900 mb-3`}>
              🍔 Votre menu
            </Text>
            {order.plats_menu.map((item, idx) => (
              <View
                key={idx}
                style={tw`flex-row justify-between items-center py-2 border-b border-gray-100`}
              >
                <View style={tw`flex-row items-center`}>
                  <View style={tw`w-2 h-2 bg-purple-400 rounded-full mr-2`} />
                  <Text style={tw`text-gray-700 font-medium`}>{item.name}</Text>
                </View>
                <Text style={tw`text-gray-700 font-semibold`}>
                  {item.price} TND
                </Text>
              </View>
            ))}
          </View>

          <View
            style={tw`flex-row justify-between items-center mt-4 pt-4 border-t border-indigo-100`}
          >
            <Text
              style={tw`text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600`}
            >
              Total à régler
            </Text>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-2xl font-black text-indigo-900`}>
                {" "}
                💰 {order.prix_total.toFixed(2)}
              </Text>
              <Text style={tw`text-sm text-gray-500 ml-1`}>TND</Text>
            </View>
          </View>
          {!completedOrders.has(order._id) && (
  <TouchableOpacity 
    onPress={() => markAsCompleted(order._id)}
    activeOpacity={0.1}
    style={tw`mt-5 flex-row justify-center items-center  p-3 rounded-full shadow-lg bg-indigo-100`}
  >
    <Ionicons name="checkmark-circle" size={20} color="purple" />
    <Text style={tw`ml-2 text-black font-bold text-sm uppercase `}>
      Marquer comme terminée
    </Text>
  </TouchableOpacity>
)}
        </Animated.View>
        
        
      ))}

      {orders.length === 0 && (
        <View style={tw`flex items-center mt-20`}>
          <Ionicons name="restaurant-outline" size={60} color="#CBD5E1" />
          <Text style={tw`text-xl text-gray-400 font-bold mt-4`}>
            Aucune commande en attente
          </Text>
          <Text style={tw`text-gray-400 mt-2`}>Commencez à commander ! 🍔</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default OrderScreen;
