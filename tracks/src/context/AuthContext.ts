import createDataContext from "./createDataContext";
import trackerApi from "../api/trackerApi";
import { Dispatch } from "react";
import { AsyncStorage } from "react-native";
import { Action } from "../interfaces/tracking-interfaces";

const authReducer = (state: any, action: Action) => {
  switch (action.type) {
    case "ADD_ERROR":
      return { ...state, errors: action.payload };
    case "SIGN_IN":
      return { errors: null, isLoading: false, token: action.payload };
    case "CLEAR_ERROR_MESSAGE":
      return { ...state, errors: null };
    case "SIGN_OUT":
      return { token: null, errors: null };
    default:
      return state;
  }
};

const tryLocalSignIn = (dispatch: Dispatch<Action>) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "SIGN_IN", payload: token });
  } else {
    dispatch({ type: "SIGN_OUT" });
  }
};

const clearErrorMessage = (dispatch: Dispatch<Action>) => () => {
  dispatch({ type: "CLEAR_ERROR_MESSAGE" });
};

const signUp = (dispatch: Dispatch<Action>) => async (
  email: string,
  password: string
) => {
  try {
    const response = await trackerApi.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "SIGN_IN", payload: response.data.token });
  } catch (err) {
    dispatch({ type: "ADD_ERROR", payload: err.response.data.errors });
  }
};

const signIn = (dispatch: Dispatch<Action>) => async (
  email: string,
  password: string
) => {
  try {
    const response = await trackerApi.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "SIGN_IN", payload: response.data.token });
  } catch (err) {
    dispatch({ type: "ADD_ERROR", payload: err.response.data.errors });
  }
};

const signOut = (dispatch: Dispatch<Action>) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "SIGN_OUT" });
};

export const { Context, Provider } = createDataContext(
  authReducer,
  {
    signIn,
    signOut,
    signUp,
    clearErrorMessage,
    tryLocalSignIn
  },
  { isLoading: true, token: null, errors: null }
);

