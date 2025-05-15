import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { CardField, StripeProvider, useStripe } from '@stripe/stripe-react-native';

const apiUrl = process.env.API_URL;

const PaymentScreen = () => {
  const [amount, setAmount] = useState(0);
  const [cardDetails, setCardDetails] = useState(null);
  const { confirmPayment } = useStripe();

  const handlePayment = async () => {
    if (!cardDetails?.complete) {
      Alert.alert('Erreur', 'Veuillez remplir correctement les détails de la carte.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/payement`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();
      const { clientSecret } = data;

      if (!clientSecret) {
        Alert.alert('Erreur', 'Le clientSecret est manquant.');
        return;
      }

      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails: { email: 'test@example.com' },
        },
      });

      if (error) {
        Alert.alert('Erreur de paiement', error.message);
      } else if (paymentIntent) {
        console.log('✅ Payment succeeded!', paymentIntent);
        Alert.alert('🎉 Paiement Réussi', 'Votre paiement a été effectué avec succès !');
      }
    } catch (error) {
      console.error('❌ Payment failed', error);
      Alert.alert('Erreur', 'Une erreur est survenue pendant le paiement.');
    }
  };

  return (
    <StripeProvider publishableKey={process.env.STRIPE_PUBLISHABLE_KEY}>
      <View style={styles.container}>
        <Text style={styles.title}>Paiement sécurisé</Text>

        <Text style={styles.label}>Montant (en cents)</Text>
        <TextInput
          placeholder="Ex: 1000 = 10.00$"
          keyboardType="numeric"
          value={amount.toString()}
          onChangeText={(text) => setAmount(parseInt(text) || 0)}
          style={styles.input}
        />

        <Text style={styles.label}>Détails de la carte</Text>
<View style={styles.cardWrapper}>
  <CardField
    postalCodeEnabled={true}
    placeholders={{ number: '4242 4242 4242 4242' }}
    cardStyle={{
      backgroundColor: '#F1F5F9',
      textColor: '#0F172A',
      borderRadius: 8,
      fontSize: 16,
      placeholderColor: '#94A3B8',
    }}
    style={styles.cardField}
    onCardChange={(card) => setCardDetails(card)}
  />
</View>

        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>💳 Payer</Text>
        </TouchableOpacity>
      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#1E293B',
  },
  label: {
    fontSize: 16,
    color: '#334155',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },


  cardWrapper: {
  borderWidth: 1,
  borderColor: '#CBD5E1',
  borderRadius: 10,
  padding: 10,
  backgroundColor: '#F1F5F9',
  marginBottom: 30,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
},

  cardField: {
    width: '100%',
    height: 50,
    marginBottom: 30,
  },

});

export default PaymentScreen;
