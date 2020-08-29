import React, { useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";

const SplashScreen = () => {
  const { tryLocalSignIn } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignIn();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Tracking App</Text>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 200
  },
  logo: {
    fontSize: 50,
    fontWeight: "bold",
    color: "blue",
    marginBottom: 20
  }
});

export default SplashScreen;
