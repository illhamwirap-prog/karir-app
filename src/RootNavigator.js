import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

import HomeScreen from "../screens/HomeScreen";
import SavedScreen from "../screens/SavedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import JobDetailScreen from "../screens/JobDetailScreen";
import ApplyScreen from "../screens/ApplyScreen";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SavedStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen name="Beranda" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="DetailLoker" component={JobDetailScreen} options={{ title: "Detail Loker" }} />
      <HomeStack.Screen name="Lamar" component={ApplyScreen} options={{ title: "Lamar Kerja" }} />
    </HomeStack.Navigator>
  );
}

function SavedStackScreen() {
  return (
    <SavedStack.Navigator screenOptions={screenOptions}>
      <SavedStack.Screen name="Tersimpan" component={SavedScreen} options={{ headerShown: false }} />
      <SavedStack.Screen name="DetailLoker" component={JobDetailScreen} options={{ title: "Detail Loker" }} />
      <SavedStack.Screen name="Lamar" component={ApplyScreen} options={{ title: "Lamar Kerja" }} />
    </SavedStack.Navigator>
  );
}

const screenOptions = {
  headerStyle: { backgroundColor: colors.ink },
  headerTintColor: colors.card,
  headerTitleStyle: { fontWeight: "700" },
};

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.coral,
          tabBarInactiveTintColor: colors.inkSoft,
          tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.line },
          tabBarIcon: ({ color, size }) => {
            const icons = {
              Cari: "search",
              Tersimpan: "heart-outline",
              Profil: "person-outline",
            };
            return <Ionicons name={icons[route.name]} size={size - 2} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Cari" component={HomeStackScreen} />
        <Tab.Screen name="Tersimpan" component={SavedStackScreen} />
        <Tab.Screen name="Profil" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
