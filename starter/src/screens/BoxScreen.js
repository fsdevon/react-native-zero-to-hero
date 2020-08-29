import React, { useState } from "react";
import { Text, StyleSheet, View, Button, FlatList } from "react-native";

const BoxScreen = () => {
  return (
    <View style={styles.viewStyle}>
      <View style={styles.viewOneStyle}></View>
      <View style={styles.viewTwoParent}>
        <View style={styles.viewTwoStyle}></View>
      </View>

      <View style={styles.viewThreeStyle}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    borderWidth: 3,
    borderColor: "black",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  viewOneStyle: {
    height: 50,
    width: 50,
    backgroundColor: "red"
  },
  viewTwoStyle: {
    height: 50,
    width: 50,
    backgroundColor: "green"
  },
  viewTwoParent: {
    height: 100,
    justifyContent: "flex-end",
    alignSelf: "flex-end"
  },
  viewThreeStyle: {
    height: 50,
    width: 50,
    backgroundColor: "blue"
  }
});

export default BoxScreen;
