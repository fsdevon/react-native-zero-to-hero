import React from "react";
import { View, StyleSheet, Text } from "react-native";

const NotFoundScreen = () => {
  return (
    <View>
      <Text style={styles.text}>NotFoundScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 48
  }
});

export default NotFoundScreen;
