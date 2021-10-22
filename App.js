import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {RouterMainStack} from "./src/routes/RoutesMainStack";
import AppLoading from 'expo-app-loading';
import {
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    useFonts
} from '@expo-google-fonts/roboto';
import {Provider} from "react-redux";
import store from "./src/redux/store";

export default function App() {

    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_100Thin_Italic,
        Roboto_700Bold_Italic,
        Roboto_300Light,
        Roboto_500Medium,
        Roboto_700Bold
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

  return (
      <Provider store={store}>
          <NavigationContainer>
              <RouterMainStack/>
          </NavigationContainer>
      </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
