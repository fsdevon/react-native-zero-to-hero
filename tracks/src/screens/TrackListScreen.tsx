import React, { useContext, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Context as TrackContext } from "../context/TrackContext";
import { ListItem } from "react-native-elements";

const TrackListScreen = () => {
  const navigation = useNavigation();
  const { state, fetchTracks } = useContext(TrackContext);

  useFocusEffect(
    useCallback(() => {
      fetchTracks();
      return () => {};
    }, [])
  );

  return (
    <>
      <FlatList
        data={state}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TrackDetail", { id: item.id })
              }
            >
              <ListItem chevron title={item.name} />
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 48
  }
});

export default TrackListScreen;
