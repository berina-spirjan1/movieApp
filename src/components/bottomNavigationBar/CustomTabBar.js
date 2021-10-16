import React from "react";
import {
    StyleSheet,
    View
} from "react-native";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { isIphoneX } from "react-native-iphone-x-helper";


function CustomTabBar(props){
    if (isIphoneX()){
        return (
            <View>
                <View style={styles.customTabBar}/>
                <BottomTabBar {...props.props} style={{height: 50}}/>
            </View>

        )
    }
    else{
        return(
            <BottomTabBar {...props.props}/>
        )
    }
}

const styles = StyleSheet.create({
    customTabBar:{
        position: 'absolute',
        bottom:0,
        left:0,
        right:0,
        height: 30,
        backgroundColor: 'white'
    }
})

export default CustomTabBar;
