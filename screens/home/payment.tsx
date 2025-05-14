import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { TextInput } from 'react-native';

const apiUrl = process.env.API_URL;

const PaymentScreen = () => {
  const [amount, setAmount] = useState(0);
  const { confirmPayment } = useStripe();

  // Fonction de traitement du paiement
  const handlePayment = async () => {
    try {
      const response = await fetch(`${apiUrl}/payement`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const { clientSecret } = await response.json();

      // Confirmer le paiement
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        type: 'Card',
      });

      if (error) {
        console.error(error.message);
      } else if (paymentIntent) {
        console.log('Payment succeeded!', paymentIntent);
      }
    } catch (error) {
      console.error('Payment failed', error);
    }
  };

  return (
    <View>
<TextInput
  placeholder="Enter amount in cents"
  keyboardType="numeric"
  value={amount.toString()}
  onChangeText={(text) => setAmount(parseInt(text) || 0)}
  style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}
/>      <Button title="Pay Now" onPress={handlePayment} />
    </View>
  );
};

const App = () => {
  return (
    <StripeProvider publishableKey="pk_test_51ROn7nP8R0LhjvxSdfeQ2BmW0DJviHbRkjuie183VgULhTt5VY0jOGya3AekHmnCBloscmL4qga6JZGoDOkOrkE900WrQVwrua">
      <PaymentScreen />
    </StripeProvider>
  );
};

export default App;
