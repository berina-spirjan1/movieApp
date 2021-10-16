import React, {Component} from "react";
import {
    StyleSheet,
    View,
    StatusBar,
    SafeAreaView,
    ScrollView,
    Text,
    ImageBackground,
    AsyncStorage,
    Dimensions
} from "react-native";
import {
    getFilmDetailFromApi,
    getTvShowDetailFromApi,
    renderIf
} from "../utilities/CommonMethods";
import { isIphoneX } from "react-native-iphone-x-helper";
import { Toolbar } from "react-native-material-ui";
import { POSTER_URL } from "../configuration/config";

class SingleScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            film: {},
            isLoading: true
        };
    }

    async componentDidMount() {

        let id = await AsyncStorage.getItem('id')
        id = JSON.parse(id)

        let isMovie = await AsyncStorage.getItem('movie')
        isMovie = JSON.parse(isMovie)

        if(isMovie){
            getFilmDetailFromApi(id).then(
                (data) => {
                    this.setState({
                        film: data,
                        isLoading: false,
                    });
                }
            );
        }
        else{
            getTvShowDetailFromApi(id).then(
                (data) => {
                    this.setState({
                        film: data,
                        isLoading: false,
                    });
                }
            );
        }
    }

    render() {

        const screenHeight = Dimensions.get('window').height

        return(
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    backgroundColor="#6285B3"/>
                {renderIf(isIphoneX(), <Toolbar style={{ container: { backgroundColor: '#93B4E5', marginTop: 50 } }}
                                                leftElement="arrow-back"
                                                centerElement={this.state.film.title || this.state.film.name}
                                                onLeftElementPress={()=>this.props.navigation.navigate("toSearchScreen") || this.props.navigation.navigate("toListOfMoviesAndTvShows")}/>)}
                {renderIf(!isIphoneX(), <Toolbar style={{ container: { backgroundColor: '#93B4E5' } }}
                                                 leftElement="arrow-back"
                                                 centerElement={this.state.film.title || this.state.film.name}
                                                 onLeftElementPress={()=>this.props.navigation.navigate("toSearchScreen") || this.props.navigation.navigate("toListOfMoviesAndTvShows") }/> )}
                <SafeAreaView style={styles.safeArea}
                              style={{height: screenHeight}}>
                    <ScrollView vertical={true}
                                style={styles.scrollView}>
                        <ImageBackground source={{uri: `${POSTER_URL}/` + `${this.state.film.poster_path}`}}
                                         style={styles.activityImage}/>
                        <View style={styles.activityWrapper}>
                            <View style={styles.activityInfoWrapper}>
                                <Text style={styles.activityTitle}>{this.state.film.title || this.state.film.name}</Text>
                                <Text style={styles.activityDescription}>{this.state.film.overview}</Text>

                                <Text style={styles.information}>Tagline: {this.state.film.tagline}</Text>
                                <Text style={styles.information}>Vote average: {this.state.film.vote_average}</Text>
                                <Text style={styles.information}>Vote count: {this.state.film.vote_count}</Text>
                                <Text style={styles.information}>Popularity: {this.state.film.popularity}</Text>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }
}

export default SingleScreen


const styles = StyleSheet.create({
    container:{
        backgroundColor: '#CBDBF2',
        flex: 1
    },
    activityImage:{
        height: Dimensions.get('window').height * 0.6,
        width: 380
    },
    scrollView:{
        alignSelf: 'stretch',
    },
    activityWrapper:{
        backgroundColor: '#93B4E5',
        marginTop: -50,
        borderRadius: 25,
        height: 700
    },
    activityTitle:{
        marginTop: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 20,
        padding: 20
    },
    activityDescription:{
        padding: 20,
        fontSize: 16
    },
    information: {
        fontSize: 12,
        marginLeft: 20,
        fontStyle: 'italic',
        color: '#616C75'
    }
})
