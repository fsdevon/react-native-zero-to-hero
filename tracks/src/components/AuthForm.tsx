import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { ErrorMessage } from "../interfaces/tracking-interfaces";

const AuthForm = ({ headerText, errors, onSubmit, submitButtonText }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (errors) {
      const emailError = errors.find((x: any) => x.field === "email");
      setEmailMessage(emailError ? emailError.message : "");
      const passwordError = errors.find((x: any) => x.field === "password");
      setPasswordMessage(passwordError ? passwordError.message : "");
      if (emailError || passwordError) {
        setErrorMessage("");
        return;
      }
      setErrorMessage(errors[0].message);
    } else {
      setEmailMessage("");
      setPasswordMessage("");
      setErrorMessage("");
    }
  }, [errors]);

  return (
    <>
      <Text h3>{headerText}</Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        errorMessage={emailMessage}
        errorStyle={styles.errorStyle}
      />
      <Input
        secureTextEntry
        textContentType="oneTimeCode"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        errorMessage={passwordMessage}
        errorStyle={styles.errorStyle}
      />
      {errorMessage !== "" && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
      <Button
        title={submitButtonText}
        onPress={() => onSubmit(email, password)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginBottom: 15
  },
  errorStyle: {
    fontSize: 12,
    marginBottom: 10
  }
});

export default AuthForm;
