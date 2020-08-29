import React from "react";
import {
  createBottomTabNavigator,
  BottomTabScreenProps
} from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  StackScreenProps
} from "@react-navigation/stack";
import TrackCreateScreen from "../screens/TrackCreateScreen";
import AccountScreen from "../screens/AccountScreent";
import TrackListScreen from "../screens/TrackListScreen";
import TrackDetailScreen from "../screens/TrackDetailScreen";
import {
  MainTabParamList,
  TrackListStackParamList,
  TrackCreateStackParamList,
  AccountStackParamList
} from "./types";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="TrackListTab"
        component={TrackListNavigator}
        options={{
          tabBarLabel: "Track List",
          tabBarIcon: ({ color }) => <TabBarIcon name="th-list" color={color} />
        }}
      />
      <Tab.Screen
        name="TrackCreateTab"
        component={TrackCreateNavigator}
        options={{
          tabBarLabel: "Add Track",
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />
        }}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountNavigator}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />
        }}
      />
    </Tab.Navigator>
  );
}

function TabBarIcon(props: { name: string; color: string }) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

const TrackListStack = createStackNavigator<TrackListStackParamList>();

const TrackListNavigator = () => {
  return (
    <TrackListStack.Navigator>
      <TrackListStack.Screen
        name="TrackList"
        component={TrackListScreen}
        options={{
          headerTitle: "Tracks"
        }}
      />
      <TrackListStack.Screen
        name="TrackDetail"
        component={TrackDetailScreen}
        options={{
          headerTitle: "Track Detail"
        }}
      />
    </TrackListStack.Navigator>
  );
};

const TrackCreateStack = createStackNavigator<TrackCreateStackParamList>();

const TrackCreateNavigator = () => {
  return (
    <TrackCreateStack.Navigator>
      <TrackCreateStack.Screen
        name="TrackCreate"
        component={TrackCreateScreen}
        options={{
          headerTitle: "Add Track"
        }}
      />
    </TrackCreateStack.Navigator>
  );
};

const AccountStack = createStackNavigator<AccountStackParamList>();

const AccountNavigator = () => {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name="Account" component={AccountScreen} />
    </AccountStack.Navigator>
  );
};
