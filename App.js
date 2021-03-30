import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export default function App() {
  return (
    <View style={styles.container}>
      <MapView
      style={StyleSheet.absoluteFillObject}
      provider={MapView.PROVIDER_GOOGLE}
      initialRegion={{
        latitude: -37.8186,
        longitude: 144.9637,
        latitudeDelta: 0.10,
        longitudeDelta: 0.10
      }}
      >
        <Marker
        coordinate={{latitude: -37.8176783959, longitude: 144.951446194}}
        title={'Southern Cross Station'}
        description={'Spencer St, Docklands VIC 3008'}
        />
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
