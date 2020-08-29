import React, { useContext, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AuthForm from "../components/AuthForm";
import { Context as AuthContext } from "../context/AuthContext";
import NavLink from "../components/NavLink";
import { useFocusEffect } from "@react-navigation/native";

const SignInScreen = () => {
  const { state, signIn, clearErrorMessage } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      return () => clearErrorMessage();
    }, [])
  );

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign In for Tracker"
        errors={state.errors}
        submitButtonText="Sign In"
        onSubmit={signIn}
      />
      <NavLink
        text="Dont have an account? Sign up instead!"
        routeName="SignUp"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 100
  },

  link: {
    color: "blue"
  }
});

export default SignInScreen;
