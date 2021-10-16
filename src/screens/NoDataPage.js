import React from "react"
import {View, StyleSheet} from "react-native";
import LottieView from "lottie-react-native";


//this section will show when user starts to search some movie or Tv shows and if there is no existing data lottie image will be shown
function NoDataPage(){
    return(
        <View style={styles.container}>
            <LottieView
                style={styles.lottie}
                source={require("../../assets/noDataFound.json")}
                autoPlay={true}
                loop={true}/>
        </View>
    )
}

export default NoDataPage;

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#cbdbf2',
        flex:1,
        fontFamily:'Roboto_400Regular'
    }
})
