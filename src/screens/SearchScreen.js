import React, {Component} from "react";
import {
    View,
    StatusBar,
    StyleSheet,
    Keyboard,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    AsyncStorage
} from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import {Toolbar} from "react-native-material-ui";
import {Card} from "react-native-card-view";
import {
    getFilmsFromApiWithSearchedText,
    renderIf
} from "../utilities/CommonMethods";
import { connect } from "react-redux";
import { POSTER_URL } from "../configuration/config";
import NoDataPage from "./NoDataPage";


class SearchScreen extends Component{
    constructor(props) {
        super(props);
        this.searchedText = "";
        this.page = 0;
        this.totalPages = 0;
        this.state = {
            films: [],
            isLoading: false,
            counter: 1,
        }
    };

    // Load list of films
    loadFilms = (page=1) => {
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true });
            getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(
                (data) => {
                    this.page = data.page;
                    this.totalPages = data.total_pages;

                    this.setState({
                        films: [...this.state.films, ...data.results],
                        isLoading: false,
                    });
                    if (data.results.length !== 0) {
                        page++;
                        return this.loadFilms(page)
                    }
                }
            );
        }
    };

    searchTextInputChanged(text) {
        this.searchedText = text;
    }

    // Start new search
    searchFilms() {
        Keyboard.dismiss();
        this.page = 0;
        this.totalPages = 0;
        this.setState(
            {
                films: [],
            },
            () => {
                console.log(
                    "Page : " +
                    this.page +
                    " / TotalPages : " +
                    this.totalPages +
                    " / Number of films : " +
                    this.state.films.length
                );
                this.loadFilms();
                console.log(this.state)
            }
        );
    }

    toSingleMoviesAndTvShows = () => this.props.navigation.navigate("toSingleMoviesAndTvShows")

    async showMore(id) {
        await AsyncStorage.setItem('id', JSON.stringify(id))
        this.toSingleMoviesAndTvShows()
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    backgroundColor="#6285B3"/>
                {renderIf(isIphoneX(),<Toolbar style={{ container: { backgroundColor: '#93B4E5',marginTop:50 } }}
                                               centerElement="Search movie/Tv show"
                                               searchable={{
                                                   autoFocus: true,
                                                   placeholder: 'Search',
                                                   onChangeText: (text) => this.searchTextInputChanged(text),
                                                   onSubmitEditing: () => this.searchFilms()
                                               }}/>)}
                {renderIf(!isIphoneX(),<Toolbar style={{ container: { backgroundColor: '#93B4E5' } }}
                                                centerElement="Search movie/Tv show"
                                                searchable={{
                                                    autoFocus: true,
                                                    placeholder: 'Search',
                                                    onChangeText: (text) => this.searchTextInputChanged(text),
                                                    onSubmitEditing: () => this.searchFilms()
                                                }}/>)}
                {renderIf(this.state.films.length===0, <NoDataPage/>)}
                {renderIf(this.state.films.length!==0,
                    <ScrollView vertical>
                        <View>
                            {this.state.films.map(function(obj,i) {
                                return (
                                    <View style={styles.activityCard}
                                          key={i}>
                                        <Card style={styles.card}
                                              styles={{
                                                  card: {
                                                      backgroundColor: '#93B4E5',
                                                      borderRadius: 30,
                                                      shadowColor: "#000000",
                                                      shadowOffset: {
                                                          width: 0,
                                                          height: 8,
                                                      },
                                                      shadowOpacity: 0.44,
                                                      shadowRadius: 10.84,
                                                      elevation: 16,
                                                      alignItems: 'center',
                                                      justifyContent: 'center'
                                                  }
                                              }}>
                                            <Text style={styles.activityTitle}
                                                  numberOfLines={3}>{"\n"}{obj.title  || obj.name}</Text>
                                            <Image source={{uri: `${POSTER_URL}/`+`${obj.poster_path}`}}
                                                                                       style={styles.activityImage}/>
                                            <Text style={styles.activityText}
                                                  numberOfLines={3}>
                                                {obj.overview}
                                            </Text>
                                                <TouchableOpacity style={styles.button}
                                                                  onPress={async () => {await this.showMore(obj.id)}}>
                                                    <Text style={styles.buttonText}>Show more</Text>
                                                </TouchableOpacity>
                                        </Card></View>
                                )
                            },this)}
                        </View>
                    </ScrollView>
                )}
            </View>
        );
    }
}

// Connect Component to Redux store
const mapStateToProps = (state) => {
    return {
        // Retrieve favorite list from store (global state)
        films: state,
    };
};

export default connect(mapStateToProps)(SearchScreen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#cbdbf2',
        flex:1,
        fontFamily:'Roboto_400Regular'
    },
    activityTitle:{
        marginLeft: 25,
        marginRight: 20,
        marginTop: 0,
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize:16,
        color: '#4c545b',
    },
    activityImage:{
        marginTop:20,
        width: 250,
        height:250,
        borderRadius:39,
        borderColor: '#616C75',
        borderWidth: 1
    },
    activityText:{
        marginLeft: 25,
        marginRight: 20,
        marginTop:15,
        marginBottom: 20
    },
    activityCard:{
        height: 470,
        width: 300,
        marginTop: 10,
        justifyContent: 'center',
        marginLeft: 35,
        borderRadius: 50,
        marginBottom: 20,
    },
    button: {
        marginRight: 10,
        backgroundColor: '#6285B3',
        borderRadius: 20,
        height:30,
        width:100,
        left:60,
        bottom: 10
    },
    buttonText:{
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform:'uppercase',
        padding:5,
        fontFamily:'Roboto_400Regular'
    },
})
