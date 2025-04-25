import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

const markers = [
  { id: 1, latitude: 35.6610, longitude: 10.1000, title: 'Kairouan' },
  { id: 2, latitude: 35.6670, longitude: 10.1100, title: 'Autre Lieu' },
  // Ajoute d'autres marqueurs ici
];

export default function Maps() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 36.7072915,  // Latitude de Kairouan
          longitude: 10.4087363,  // Longitude de Kairouan
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
