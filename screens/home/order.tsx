import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  pickupTime: string;
  status: 'pending' | 'ready' | 'completed' | 'cancelled';
}

const OrderScreen: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const mockOrders: Order[] = [
          {
            id: '1',
            customerName: 'Jean Dupont',
            items: [
              { name: 'Pizza Margherita', quantity: 1, price: 12 },
              { name: 'Coca-Cola', quantity: 2, price: 3 },
            ],
            total: 18,
            pickupTime: '12:30',
            status: 'pending',
          },
          {
            id: '2',
            customerName: 'Marie Martin',
            items: [
              { name: 'Salade César', quantity: 1, price: 8 },
              { name: 'Eau minérale', quantity: 1, price: 2 },
            ],
            total: 10,
            pickupTime: '13:15',
            status: 'ready',
          },
          {
            id: '3',
            customerName: 'Pierre Lambert',
            items: [
              { name: 'Burger Classique', quantity: 2, price: 10 },
              { name: 'Frites', quantity: 1, price: 4 },
            ],
            total: 24,
            pickupTime: '19:00',
            status: 'completed',
          },
        ];
        setOrders(mockOrders);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des commandes :', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    return filter === 'all' || order.status === filter;
  });

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  if (loading) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={tw`mt-4`}>Chargement des commandes...</Text>
      </View>
    );
  }

  const statusLabels: Record<string, string> = {
    all: 'Toutes',
    pending: 'En attente',
    ready: 'Prête',
    completed: 'Récupérée',
    cancelled: 'Annulée',
  };

  return (
    <ScrollView style={tw`p-4 bg-yellow-50`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Commandes</Text>

      <View style={tw`flex-row justify-around mb-4`}>
  {['all', 'pending', 'ready', 'completed', 'cancelled'].map((status) => (
    <TouchableOpacity
      key={status}
      onPress={() => setFilter(status)}
      style={tw`${filter === status ? 'bg-gray-600 rounded px-3 py-1' : ''}`}
    >
      <Text style={tw`${filter === status ? 'text-white font-bold' : 'text-gray-600'}`}>
        {statusLabels[status]}
      </Text>
    </TouchableOpacity>
  ))}
</View>


      {filteredOrders.map((order) => (
        <View key={order.id} style={tw`bg-white p-4 mb-4 rounded-lg shadow`}>
          <Text style={tw`font-bold`}>Commande #{order.id} - {order.customerName}</Text>
          <Text style={tw`text-gray-500`}>Heure de retrait : {order.pickupTime}</Text>

          {order.items.map((item, idx) => (
            <View key={idx} style={tw`flex-row justify-between mt-1`}>
              <Text>{item.quantity}x {item.name}</Text>
              <Text>{item.price.toFixed(2)} €</Text>
            </View>
          ))}

          <View style={tw`flex-row justify-between mt-2 border-t pt-2`}>
            <Text style={tw`font-bold`}>Total</Text>
            <Text style={tw`font-bold`}>{order.total.toFixed(2)} €</Text>
          </View>

          <View style={tw`flex-row justify-end mt-2`}>
            {order.status === 'pending' && (
              <TouchableOpacity
                onPress={() => updateOrderStatus(order.id, 'ready')}
                style={tw`bg-blue-500 px-3 py-1 rounded mr-2`}
              >
                <Text style={tw`text-white`}>Marquer comme prête</Text>
              </TouchableOpacity>
            )}
            {order.status === 'ready' && (
              <TouchableOpacity
                onPress={() => updateOrderStatus(order.id, 'completed')}
                style={tw`bg-green-500 px-3 py-1 rounded mr-2`}
              >
                <Text style={tw`text-white`}>Marquer comme récupérée</Text>
              </TouchableOpacity>
            )}
            {order.status !== 'completed' && order.status !== 'cancelled' && (
              <TouchableOpacity
                onPress={() => updateOrderStatus(order.id, 'cancelled')}
                style={tw`bg-red-500 px-3 py-1 rounded`}
              >
                <Text style={tw`text-white`}>Annuler</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default OrderScreen;
