import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { useState } from 'react';

export default function LocationScreen() {
  const [coords, setCoords] = useState(null);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Konum izni gerekli');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setCoords(location.coords);

    await Notifications.requestPermissionsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Konum Alındı',
        body: 'GPS konumunuz başarıyla alındı.',
      },
      trigger: null,
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Mevcut Konumu Al" onPress={getLocation} />
      {coords && (
        <Text>
          Enlem: {coords.latitude} {'\n'}
          Boylam: {coords.longitude}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 20,
  },
});

