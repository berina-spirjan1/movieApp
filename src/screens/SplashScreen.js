import React, {Component} from 'react';
import {View, Text} from "react-native";
import LottieView from 'lottie-react-native';

const duration = 3 * 1000;

export default class SplashScreen extends Component{

    componentDidMount() {
        setTimeout(() => this.props.navigation.navigate("toBottomNavigationBar"), duration)
    }

    render() {

        return(
            <>
                <View style={styles.container}>
                    <LottieView
                        style={styles.lottie}
                        source={require("../../assets/movie.json")}
                        autoPlay={true}
                        loop={true}/>
                    <Text style={styles.title}>POPCORNFLIX</Text>
                </View>
            </>

        )
    }
}

const styles = {
    container:{
        backgroundColor: '#CBDBF2',
        flex: 1
    },
    lottie:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -50
    },
    title: {
        marginTop: 500,
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'Roboto_700Bold',
        fontWeight: 'bold'
    }
}

