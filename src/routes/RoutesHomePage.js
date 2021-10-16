import React from "react";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import BottomNavigationBar from "./BottomNavigationBar";
import SplashScreen from "../screens/SplashScreen";
import IndexScreen from "../screens/IndexScreen";
import SingleScreen from "../screens/SingleScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createNativeStackNavigator()

export const RoutesHomePage = () =>{
    return(
        <Stack.Navigator initialRouteName={"toListOfMoviesAndTvShows"}>
            <Stack.Screen name={"toListOfMoviesAndTvShows"}
                          component={IndexScreen}
                          options={{
                              headerShown: false
                          }}/>
            <Stack.Screen name={"toSingleMoviesAndTvShows"}
                          component={SingleScreen}
                          options={{
                              headerShown: false
                          }}/>
        </Stack.Navigator>
    )
}
