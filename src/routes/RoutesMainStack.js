import React from "react";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import BottomNavigationBar from "./BottomNavigationBar";
import SplashScreen from "../screens/SplashScreen";

const Stack = createNativeStackNavigator()

export const RouterMainStack = () =>{
    return(
        <Stack.Navigator initialRouteName={"fromSplashScreen"}>
            <Stack.Screen name={"fromSplashScreen"}
                          component={SplashScreen}
                          options={{
                              headerShown: false
                          }}/>
            <Stack.Screen name={"toBottomNavigationBar"}
                          component={BottomNavigationBar}
                          options={{
                              headerShown: false
                          }}/>
        </Stack.Navigator>
    )
}
