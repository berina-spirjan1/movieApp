import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import Svg, { Path } from "react-native-svg";


//button that will show on active tab in bottom navigation bar
function TabBarCustomButton({accessibilityState, children, onPress}){

    let isSelected = accessibilityState.selected;

    if (isSelected){
        return(
            <View style={{ flex: 1,
                alignItems: 'center' }}>
                <View style={{ flexDirection: 'row',
                    position: 'absolute',
                    top:0 }}>
                    <View style={{ flex: 1,
                        backgroundColor: '#93B4E5' }}/>
                    <Svg
                        width={75}
                        height={61}
                        viewBox="0 0 75 61">
                        <Path
                            d={"M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"}
                            fill={"#93B4E5"}/>
                    </Svg>
                    <View style={{flex: 1, backgroundColor: '#93B4E5'}}/>
                </View>

                <TouchableOpacity style={styles.menuItemButtonPressed}
                                  activeOpacity={1}
                                  onPress={onPress}>
                    {children}
                </TouchableOpacity>

            </View>


        )
    }
    else{
        return(
            <TouchableOpacity style={styles.menuItem}
                              activeOpacity={1}
                              onPress={onPress}>
                {children}
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    menuItemButtonPressed:{
        top: -22.5,
        justifyContent: 'center',
        alignItems: 'center',
        width:50,
        height:50,
        borderRadius:25,
        backgroundColor: '#6285B3'
    },
    menuItem:{
        flex:1,
        height: 50,
        backgroundColor: '#93B4E5'
    }
})

export default TabBarCustomButton;
