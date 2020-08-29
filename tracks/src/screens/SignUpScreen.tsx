import React, { useContext, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import AuthForm from "../components/AuthForm";
import { Context as AuthContext } from "../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import NavLink from "../components/NavLink";

const SignUpScreen = () => {
  const { state, signUp, clearErrorMessage } = useContext(AuthContext);
  useFocusEffect(
    useCallback(() => {
      return () => clearErrorMessage();
    }, [])
  );
  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign Up for Tracker"
        errors={state.errors}
        submitButtonText="Sign Up"
        onSubmit={signUp}
      />
      <NavLink
        text="Already have an account? Sign in instead!"
        routeName="SignIn"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200
  }
});

export default SignUpScreen;
