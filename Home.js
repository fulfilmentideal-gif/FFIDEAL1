import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, Platform, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setHasPermission(false);
        Alert.alert('Permission required','Location permission is required to use the map.');
        return;
      }
      setHasPermission(true);
      let loc = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
      setLocation(loc.coords);
      // optional: watch position
      Location.watchPositionAsync({distanceInterval:5, timeInterval:3000}, (l) => {
        setLocation(l.coords);
      });
    })();
  }, []);

  function createOrder(){
    Alert.alert('Заказ создан', 'Запрос на грузовое такси отправлен (демо).');
  }

  if (hasPermission === null) return (<View style={styles.center}><ActivityIndicator/></View>);
  if (hasPermission === false) return (<View style={styles.center}><Text>Permission denied</Text></View>);

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
          showsUserLocation={true}
          >
          <Marker coordinate={{latitude: location.latitude, longitude: location.longitude}} title="You"/>
        </MapView>
      ) : (
        <View style={styles.center}><ActivityIndicator/></View>
      )}
      <View style={styles.bottom}>
        <Button title="Заказать грузовое такси" onPress={createOrder} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},
  map:{flex:1},
  bottom:{padding:16, backgroundColor:'#fff'},
  center:{flex:1, alignItems:'center', justifyContent:'center'}
});
