import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
const apiUrl = process.env.API_URL;

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  selected: boolean;
  image: string;
}

interface TimeSlot {
  id: number;
  time: string;
  selected: boolean;
}

interface GroupedMenuItems {
  [key: string]: MenuItem[];
}

const OrderPage = (props: any) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: 1, name: 'Poulet rôti', price: 35, category: 'Plats principaux', selected: false, image: 'https://bing.com/th?id=OSK.28306a0266c15343416f9be125e8ba93&idpbck=1&sim=4&pageurl=a2c69d40f93ee512d847787d8b7741d1&idpp=recipe&ajaxhist=0&ajaxserp=0' },
    { id: 2, name: 'Couscous', price: 25, category: 'Plats principaux', selected: false, image: 'https://i.pinimg.com/originals/8a/a9/cb/8aa9cb5e7c3dd2b1a511e12ce2d1159a.jpg' },
    { id: 3, name: 'Cordon Bleu', price: 28, category: 'Plats principaux', selected: false, image: 'https://www.grillkameraden.de/wp-content/uploads/2022/02/AdobeStock_35947274-scaled.jpeg' },
    { id: 4, name: 'Lasagne', price: 30, category: 'Plats principaux', selected: false, image: 'https://bing.com/th?id=OSK.0fd75937b3aaa3d49e320e541dca5788&idpbck=1&sim=4&pageurl=2e8ba3d1ca0d48487f0ffe6ae61e1b9d&idpp=recipe&ajaxhist=0&ajaxserp=0' },
    { id: 6, name: 'Tacos au poulet', price: 20, category: 'Plats principaux', selected: false, image: 'https://www.healthyfoodcreation.fr/wp-content/uploads/2023/05/TACOS-1-1024x683.jpg' },
    { id: 13, name: 'Pizza Margherita', price: 18, category: 'Pizzas', selected: false, image: 'https://images.ricardocuisine.com/services/recipes/pizza.jpg' },
    { id: 14, name: 'Pizza Pepperoni', price: 20, category: 'Pizzas', selected: false, image: 'https://assets.afcdn.com/recipe/20190319/89655_w3072h2304c1cx3680cy2456.jpg' },
    { id: 15, name: 'Pizza Végétarienne', price: 22, category: 'Pizzas', selected: false, image: 'https://ffcuisine.fr/wp-content/uploads/2024/03/1711111906_recette-de-pizza-vegetarienne-facile-et-savoureuse.jpg' },
    { id: 16, name: 'Pizza Quatre Fromages', price: 25, category: 'Pizzas', selected: false, image: 'https://lelocalapizzas.fr/wp-content/uploads/2022/02/pizza-4-fromages-recette.jpg' },
    { id: 17, name: 'Pizza Hawaïenne', price: 22, category: 'Pizzas', selected: false, image: 'https://assets.afcdn.com/recipe/20170328/63885_w1024h768c1cx1500cy1000.jpg' },
    { id: 11, name: 'Coca-Cola', price: 5, category: 'Boissons', selected: false, image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg' },
    { id: 10, name: 'Eau minérale', price: 2, category: 'Boissons', selected: false, image: 'https://www.mont-roucous.com/sites/default/files/styles/795w_retina/public/2021-07/comparatif-eaux-minerales.jpg' },
    { id: 9, name: 'Thé à la menthe', price: 3, category: 'Boissons', selected: false, image: 'https://cache.marieclaire.fr/data/photo/w1664_ci/54/the-a-la-menthe.jpg' },
    { id: 8, name: 'Café turc', price: 4, category: 'Boissons', selected: false, image: 'https://toutistanbul.com/wp-content/uploads/2023/01/le-cafe-turc.jpg' }
  ]);

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: 1, time: '11:30 - 12:00', selected: false },
    { id: 2, time: '12:00 - 12:30', selected: true },
    { id: 3, time: '12:30 - 13:00', selected: false },
    { id: 4, time: '13:00 - 13:30', selected: false },
  ]);

  const [total, setTotal] = useState(0);

  const handleSubmitOrder = async () => {
    const selectedItems = menuItems.filter(item => item.selected);
    if (selectedItems.length === 0) {
      Alert.alert('Erreur', 'Veuillez sélectionner au moins un plat');
      return;
    }

    const selectedTime = timeSlots.find(slot => slot.selected);
    if (!selectedTime) {
      Alert.alert('Erreur', 'Veuillez sélectionner un créneau horaire');
      return;
    }

    const orderData = {
      date_creation: new Date().toISOString(),
      date_recuperation: selectedTime.time,
      plats_menu: selectedItems,
      prix_total: total,
      user_id: props.route.params.user_id,
      shop_id: props.route.params.shop_id, 
      random_code: Math.floor(100000 + Math.random() * 900000).toString(),
    };

     const navigateTopayement = () => {
    props.navigation.navigate("payment");
  };


    console.log('Données de la commande:', orderData);

    try {
      const response = await axios.post(`${apiUrl}/commande/createcommande`, orderData);
      if (response.status === 200 || response.status === 201) {
        Alert.alert(
          'Commande confirmée!',
          `Votre commande:\n\n${selectedItems.map(i => `• ${i.name} (${i.price} TND)`).join('\n')}\n\nHeure de retrait: ${selectedTime.time}\n\nTotal: ${orderData.prix_total} TND\n\n${orderData.random_code}`,
          [
            {
              text: 'OK',
              onPress: () => {
                Alert.alert(
                  'Paiement 💳',
                  'Tu veux payer en ligne ?',
                  [
                    {
                      text: 'Oui',
                      onPress: () => {
                        navigateTopayement();
                        console.log('Paiement en ligne choisi');
                      },
                    },
                    {
                      text: 'Non',
                      onPress: () => console.log('Paiement sur place choisi'),
                      style: 'cancel',
                    },
                  ]
                );
                setMenuItems(menuItems.map(item => ({ ...item, selected: false })));
                setTotal(0);
              },
            },
          ]
        );
      } else {
        console.log("Status non 200 ou 201:", response.status, response.data);
        Alert.alert('Erreur', 'Échec de la commande, veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission de la commande:', error);
      Alert.alert('Erreur', 'Échec de la commande, veuillez réessayer.');
    }
  };

  const toggleMenuItem = (id: number) => {
    const updatedItems = menuItems.map(item => {
      if (item.id === id) {
        const isNowSelected = !item.selected;
        setTotal(prev => prev + (isNowSelected ? item.price : -item.price));
        return { ...item, selected: isNowSelected };
      }
      return item;
    });
    setMenuItems(updatedItems);
  };

  const selectTimeSlot = (id: number) => {
    setTimeSlots(timeSlots.map(slot => ({
      ...slot,
      selected: slot.id === id,
    })));
  };


  const groupedMenuItems = menuItems.reduce<GroupedMenuItems>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* Header avec nouvelle palette de couleurs */}
      <View style={tw`p-5 bg-indigo-700 shadow-lg`}>
        <Text style={tw`text-2xl font-bold text-center text-white`}>Restaurant Tunisien</Text>
        <Text style={tw`text-center text-indigo-100 mt-1`}>Commandez vos plats préférés</Text>
      </View>

      <ScrollView style={tw`flex-1 p-4`}>
        {/* Section Créneau horaire */}
        <View style={tw`mb-8 bg-white p-5 rounded-xl shadow-sm border border-gray-100`}>
          <Text style={tw`text-xl font-bold mb-4 text-gray-800`}>⏰ Heure de récupération</Text>
          <View style={tw`flex-row flex-wrap justify-center`}>
            {timeSlots.map(slot => (
              <TouchableOpacity
                key={slot.id}
                onPress={() => selectTimeSlot(slot.id)}
                style={[
                  tw`p-3 m-1 rounded-lg border w-1/3 items-center`,
                  slot.selected
                    ? tw`bg-indigo-600 border-indigo-600 shadow-md`
                    : tw`bg-white border-gray-200`
                ]}
              >
                <Text style={slot.selected ? tw`text-white font-bold` : tw`text-gray-700`}>
                  {slot.time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Section Menu */}
        <Text style={tw`text-2xl font-bold mb-4 text-gray-800`}>🍽️ Menu</Text>
        {Object.entries(groupedMenuItems).map(([category, items]) => (
          <View key={category} style={tw`mb-8`}>
            <Text style={tw`text-xl font-bold mb-3 text-gray-800 px-2`}>{category}</Text>
            <View style={tw`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden`}>
              {items.map(item => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => toggleMenuItem(item.id)}
                  style={[
                    tw`p-4 border-b border-gray-100 flex-row items-center`,
                    item.selected && tw`bg-indigo-50`
                  ]}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={tw`w-16 h-16 rounded-lg mr-4`}
                  />
                  <View style={tw`flex-1`}>
                    <Text style={tw`font-semibold text-gray-800`}>{item.name}</Text>
                    <Text style={tw`text-indigo-600 font-bold mt-1`}>{item.price} TND</Text>
                  </View>
                  <View style={[
                    tw`w-6 h-6 rounded-full items-center justify-center border-2`,
                    item.selected
                      ? tw`bg-indigo-600 border-indigo-600`
                      : tw`border-gray-300`
                  ]}>
                    {item.selected && <Text style={tw`text-white`}>✓</Text>}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Footer avec bouton de validation */}
      <View style={tw`p-5 bg-white border-t border-gray-200 shadow-lg`}>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`font-bold text-lg text-gray-800`}>Total:</Text>
          <Text style={tw`font-bold text-xl text-indigo-600`}>{total} TND</Text>
        </View>
        <TouchableOpacity
          style={tw`bg-indigo-600 py-4 rounded-xl items-center shadow-md`}
          onPress={handleSubmitOrder}
        >
          <Text style={tw`text-white font-bold text-lg`}>Valider la commande</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderPage;