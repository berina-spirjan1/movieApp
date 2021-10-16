import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {FontAwesome5} from "@expo/vector-icons";
import CustomTabBar from "../components/bottomNavigationBar/CustomTabBar";
import IndexScreen from "../screens/IndexScreen";
import TabBarCustomButton from "../components/bottomNavigationBar/TabBarCustomButton";
import SectionScreen from "../screens/SectionScreen";
import { RoutesSearch } from "./RoutesSearch";
import {RoutesHomePage} from "./RoutesHomePage";
import SectionScreenTv from "../screens/SectionScreenTv";



const Tab = createBottomTabNavigator();

function BottomNavigationBar(){
    return(
            <Tab.Navigator
                backBehavior={"Home"}
                initialRouteName="Home"
                screenOptions={{
                    showLabel: false,
                    style:{
                        borderTopWidth: 0,
                        backgroundColor: 'transparent',
                        elevation: 0,
                        lazy: true
                },
                    tabBarShowLabel: false
            }}
                tabBar={(props) => (
                    <CustomTabBar props={props}/>
                )}>
                <Tab.Screen name={'Home'}
                            component={RoutesHomePage}
                            options={{
                                headerShown: false,
                                tabBarIcon: ({focused}) => (
                                    <FontAwesome5 name={'home'}
                                                  size={focused ? 22 : 20}
                                                  color={focused ? '#FFF' : '#616C75'}/>
                                ),
                                tabBarButton: (props) => (
                                    <TabBarCustomButton {...props}/>
                                )
                            }}/>
                <Tab.Screen name={'Movies'}
                            component={SectionScreen}
                            options={{
                                headerShown: false,
                                tabBarIcon: ({focused}) => (
                                    <FontAwesome5 name={'film'}
                                                  size={focused ? 22 : 20}
                                                  color={focused ? '#FFF' : '#616C75'}/>
                                ),
                                tabBarButton: (props) => (
                                    <TabBarCustomButton {...props}/>
                                )
                            }}/>
                <Tab.Screen name={'Tv shows'}
                            component={SectionScreenTv}
                            options={{
                                headerShown: false,
                                tabBarIcon: ({focused}) => (
                                    <FontAwesome5 name={'tv'}
                                                  size={focused ? 20 : 16}
                                                  color={focused ? '#FFF' : '#616C75'}/>
                                ),
                                tabBarButton: (props) => (
                                    <TabBarCustomButton {...props}/>
                                )
                            }}/>
                <Tab.Screen name={'Search'}
                            component={RoutesSearch}
                            options={{
                                headerShown: false,
                                tabBarIcon: ({focused}) => (
                                    <FontAwesome5 name={'search'}
                                                  size={focused ? 20 : 18}
                                                  color={focused ? '#FFF' : '#616C75'}/>
                                ),
                                tabBarButton: (props) => (
                                    <TabBarCustomButton {...props}/>
                                )
                            }}/>

            </Tab.Navigator>
    )
}



export default BottomNavigationBar;
