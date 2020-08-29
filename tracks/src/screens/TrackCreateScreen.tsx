import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import Map from "../components/Map";
//import "../_mockLocation";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import { useIsFocused } from "@react-navigation/native";
import TrackForm from "../components/TrackFrom";

const TrackCreateScreen = () => {
  const {
    state: { recording },
    addLocation
  } = useContext(LocationContext);
  const isFocused = useIsFocused();
  const callback = useCallback((location) => addLocation(location, recording), [
    recording
  ]);
  const [err] = useLocation(isFocused || recording, callback);

  return (
    <View>
      <Map />
      {err && <Text>Please enable location services</Text>}
      <TrackForm />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 48
  }
});

export default TrackCreateScreen;
