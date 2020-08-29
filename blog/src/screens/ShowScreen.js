import React, { useContext, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Context } from "../context/BlogContext";
import { EvilIcons } from "@expo/vector-icons";

const ShowScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { state } = useContext(Context);
  const blogPost = state.find((blogPost) => blogPost.id === id);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Edit", { id })}>
          <EvilIcons name="pencil" size={35} />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  return (
    <View>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  );
};

export default ShowScreen;
