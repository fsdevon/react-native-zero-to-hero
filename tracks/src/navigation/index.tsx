import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NotFoundScreen from "../screens/NotFoundScreen";
import MainTabNavigator from "./MainTabNavigator";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import { RootStackParamList, AuthStackParamList } from "./types";
import LinkingConfiguration from "./LinkingConfiguration";
import { Provider as AuthProvider } from "../context/AuthContext";
import { Context as AuthContext } from "../context/AuthContext";
import { Provider as LocationProvider } from "../context/LocationContext";
import { Provider as TrackProvider } from "../context/TrackContext";
import SplashScreen from "../screens/SplashScreen";

export default function Navigation() {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <NavigationContainer linking={LinkingConfiguration}>
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { state } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {state.isLoading ? (
        <Stack.Screen name="Splash" component={SplashScreen} />
      ) : state.token === null ? (
        <Stack.Screen name="Auth" component={LoginNavigator} />
      ) : (
        <Stack.Screen name="Root" component={MainTabNavigator} />
      )}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
};

const AuthStack = createStackNavigator<AuthStackParamList>();

const LoginNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};
