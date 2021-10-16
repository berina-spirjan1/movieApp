import React, {Component} from "react";
import {StatusBar, StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, AsyncStorage} from "react-native";
import {
    getAllFilms,
    getAllTvShows,
    renderIf
} from "../utilities/CommonMethods";
import {isIphoneX} from "react-native-iphone-x-helper";
import {Toolbar} from "react-native-material-ui";
import {POSTER_URL} from "../configuration/config";
import {connect} from 'react-redux';
import {FontAwesome5} from "@expo/vector-icons";
import {Card, CardContent} from "react-native-card-view";
import NoDataPage from "./NoDataPage";

class IndexScreen extends Component{
    constructor(props) {
        super(props);
        this.page = 0;
        this.pageTv = 0;
        this.totalPages = 0;
        this.state = {
            films: [],
            tvShows: [],
            isLoading: false,
            counter: 1,
        }
        this.isMovie=true
    }

    componentDidMount(page=1) {
       this.loadFilms(1)
    }

    loadFilms = (page=1) => {
        this.setState({films: []})
        this.setState({page: 0})
        this.setState({pageTv: 0})
            getAllFilms( this.page + 1).then(
                (data) => {
                    this.isMovie = true;
                    this.page = data.page;
                    this.totalPages = data.total_pages;

                    this.setState({
                        films: [...this.state.films, ...data.results],
                        isLoading: false,
                    });
                    if (data.results.length !== 0) {
                        page++;
                        return this.getAllFilms(page)
                    }
                }
            );
    };

    loadTvShows = (pageTv=1) =>{
        this.setState({films: []})
        this.setState({page: 0})
        this.setState({pageTv: 0})
        getAllTvShows( this.pageTv + 1).then(
            (data) => {
                this.isMovie = false;
                this.pageTv = data.page;
                this.totalPages = data.total_pages;

                this.setState({
                    films: [...this.state.films, ...data.results],
                    isLoading: false,
                });
                if (data.results.length !== 0) {
                    pageTv++;
                    return this.getAllTvShows(pageTv)
                }
            }
        );
    }

    toSingleMoviesAndTvShows = () => this.props.navigation.navigate("toSingleMoviesAndTvShows")

    async showMore(id) {
        await AsyncStorage.setItem('id', JSON.stringify(id))
        if(this.isMovie){
            await AsyncStorage.setItem('movie',JSON.stringify(true))
        }
        else{
            await AsyncStorage.setItem('movie',JSON.stringify(false))
        }
        this.toSingleMoviesAndTvShows()
    }

    render() {
        return(
            <View style={styles.container}>
                <ScrollView vertical>
                    <StatusBar
                        animated={true}
                        backgroundColor="#6285B3"/>
                    {renderIf(isIphoneX(),<Toolbar style={{ container: { backgroundColor: '#93B4E5',marginTop:50 } }}
                                                   centerElement="Home"/>)}
                    {renderIf(!isIphoneX(),<Toolbar style={{ container: { backgroundColor: '#93B4E5'} }}
                                                    centerElement="Home"/>)}
                    <ScrollView horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.categoryCard}
                                              onPress={this.loadFilms}>
                                <Card  styles={{ card: { backgroundColor: 'rgba(147,180,229,1)',
                                        borderRadius:30,
                                        shadowColor: "#000000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.44,
                                        shadowRadius: 3,
                                        elevation: 5
                                    }}}>
                                    <View style={styles.icon2}>
                                        <FontAwesome5 name={'film'}
                                                      size={37}
                                                      color={'#000000'}/>
                                    </View>
                                    <CardContent>
                                        <Text style={styles.categoryName}>MOVIES</Text>
                                    </CardContent>
                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.categoryCard}
                                              onPress={this.loadTvShows}>
                                <Card  styles={{ card: { backgroundColor: 'rgb(89,116,159)',
                                        borderRadius:30,
                                        shadowColor: "#000000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.44,
                                        shadowRadius: 3,
                                        elevation: 5
                                    }}}>
                                    <View style={styles.icon2}>
                                        <FontAwesome5 name={'tv'}
                                                      size={27}
                                                      color={'#000000'}/>
                                    </View>
                                    <CardContent>
                                        <Text style={styles.categoryNamePopular}>TV SHOWS</Text>
                                    </CardContent>
                                </Card>
                            </TouchableOpacity>
                        </View>
                        </ScrollView>
                    <View style={{marginBottom: 50}}/>
                    {renderIf(this.state.films.length===0, <NoDataPage/>)}
                    {renderIf(this.state.films.length!==0,
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
                                                      numberOfLines={3}>{"\n"}{obj.title || obj.name}</Text>
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

                    )}
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps(state){
    return{
        films: state
    }
}

export default connect(mapStateToProps)(IndexScreen)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#cbdbf2',
        flex:1,
        fontFamily:'Roboto_400Regular'
    },
    categoryCard:{
        height: 115,
        width: 95,
        marginTop: 10,
        marginLeft: 17,
        borderRadius: 50
    },
    icon2:{
        justifyContent:'center',
        marginTop:25
    },
    categoryNamePopular:{
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000000',
        paddingBottom:10,
        fontSize: 11
    },
    categoryName:{
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#000000',
        paddingBottom:10,
        fontSize: 11
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
