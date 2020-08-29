import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";

const TrackDetailScreen = () => {
  const { state } = useContext(TrackContext);
  const route = useRoute();
  const { id } = route.params;
  const track = state.find((t) => t.id === id);
  const initialCoords = track.locations[0].coords;
  return (
    <View>
      <Text style={styles.text}>{track.name}</Text>
      <MapView
        initialRegion={{
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          ...initialCoords
        }}
        style={styles.map}
      >
        <Polyline coordinates={track.locations.map((loc) => loc.coords)} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 48
  },
  map: {
    height: 300
  }
});

export default TrackDetailScreen;
