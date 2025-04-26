import React, { useCallback, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const apiUrl = process.env.API_URL;

const Myshop = (props: any) => {
  const [shopsData, setShopsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchUserData = useCallback(async () => {
    if (!props.route.params?.id) {
      console.error("User ID is missing");
      setError(true);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${apiUrl}/shops/user/${props.route.params.id}`
      );
      setShopsData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user shops:", error);
      setError(true);
      setLoading(false);
    }
  }, [props.route.params?.id]);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [fetchUserData])
  );

  const goToMyEstablishment = (shop: any) => {
    props.navigation.navigate("consultshop", {
      shopId: shop._id,
      id: props.route.params.id,
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366F1" />
        <Text style={styles.loadingText}>Chargement de vos boutiques...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={48} color="#EF4444" />
        <Text style={styles.errorText}>Erreur lors du chargement de vos boutiques</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchUserData}
        >
          <Text style={styles.buttonText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (shopsData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="storefront-outline" size={48} color="#9CA3AF" />
        <Text style={styles.emptyTitle}>Vous n'avez pas encore de boutique</Text>
        <Text style={styles.emptySubtitle}>
          Créez votre première boutique pour commencer
        </Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => props.navigation.navigate("AddShop")}
        >
          <Text style={styles.buttonText}>Créer une boutique</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes établissements</Text>
        <Text style={styles.headerSubtitle}>
          {shopsData.length} {shopsData.length > 1 ? "établissements" : "établissement"}
        </Text>
      </View>

      {/* Shops List */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {shopsData.map((shop) => (
          <TouchableOpacity
            key={shop._id}
            style={styles.shopCard}
            onPress={() => goToMyEstablishment(shop)}
            activeOpacity={0.9}
          >
            <Image
              source={{ uri: `${apiUrl}/fetchshopImages/${shop.shopImage}` }}
              style={styles.shopImage}
            />
            
            <View style={styles.shopContent}>
              <View style={styles.shopHeader}>
                <Text style={styles.shopName} numberOfLines={1}>
                  {shop.shop_nom}
                </Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#F59E0B" />
                  <Text style={styles.ratingText}>4.8</Text>
                </View>
              </View>
              
              <View style={styles.shopFooter}>
                <View style={styles.contactInfo}>
                  <Ionicons name="call-outline" size={16} color="#6366F1" />
                  <Text style={styles.contactText}>{shop.phone || "Non renseigné"}</Text>
                </View>
                
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => goToMyEstablishment(shop)}
                >
                  <Text style={styles.viewButtonText}>Voir</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => props.navigation.navigate("AddShop")}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 24,
  },
  scrollContainer: {
    paddingBottom: 24,
  },

  // Header
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },

  // Loading States
  loadingText: {
    marginTop: 16,
    color: '#64748B',
  },
  errorText: {
    fontSize: 18,
    color: '#1E293B',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    color: '#1E293B',
    marginTop: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  emptySubtitle: {
    color: '#64748B',
    marginTop: 8,
    textAlign: 'center',
  },

  // Shop Card
  shopCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  shopImage: {
    width: '100%',
    height: 180,
  },
  shopContent: {
    padding: 16,
  },
  shopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  shopName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  ratingText: {
    marginLeft: 4,
    color: '#64748B',
  },
  shopFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    marginLeft: 8,
    color: '#64748B',
  },

  // Buttons
  retryButton: {
    marginTop: 24,
    backgroundColor: '#6366F1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  createButton: {
    marginTop: 24,
    backgroundColor: '#6366F1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  viewButton: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewButtonText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#6366F1',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});

export default Myshop;