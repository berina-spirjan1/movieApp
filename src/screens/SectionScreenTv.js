import React, {Component} from "react";
import {StyleSheet, View, Text, ScrollView} from "react-native";
import {getAllFilms, getFilmCategories, getTvShowsCategories, renderIf} from "../utilities/CommonMethods";
import {Card, CardContent} from "react-native-card-view";
import {isIphoneX} from "react-native-iphone-x-helper";
import {Toolbar} from "react-native-material-ui";

export default class SectionScreenTv extends Component{
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
    }

    componentDidMount(page=1) {
        getTvShowsCategories( this.page + 1).then(
            (data) => {
                this.isMovie = true;
                this.page = data.page;
                this.totalPages = data.total_pages;

                this.setState({
                    films: [...this.state.films, ...data.genres],
                    isLoading: false,
                });
                if (data.results.length !== 0) {
                    page++;
                    return this.getFilmCategories(page)
                }
            }
        );

    }
    render() {
        return (
            <>
                {renderIf(isIphoneX(),<Toolbar style={{ container: { backgroundColor: '#93B4E5',marginTop:50 } }}
                                               centerElement="Categories for Tv shows"/>)}
                {renderIf(!isIphoneX(),<Toolbar style={{ container: { backgroundColor: '#93B4E5'} }}
                                                centerElement="Categories for Tv shows"/>)}
                <ScrollView style={styles.container}>
                    {renderIf(this.state.films.length!==0,
                        <>
                            {this.state.films.map(function(obj,i) {
                                return (
                                    <View key={i} style={{alignItems: 'center'}}>
                                        <View style={styles.categoryCard}>
                                            <Card  styles={{ card: { backgroundColor: '#6285B3',
                                                    borderRadius:30,
                                                    shadowColor: "#000000",
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 2,
                                                    },
                                                    shadowOpacity: 0.44,
                                                    shadowRadius: 3,
                                                    elevation: 5,
                                                }}}>
                                                <CardContent>
                                                    <Text style={styles.categoryName}>{obj.title || obj.name}</Text>
                                                </CardContent>
                                            </Card>
                                        </View>
                                    </View>
                                )
                            },this)}</>
                    )}
                </ScrollView>
            </>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#cbdbf2',
        flex:1,
        fontFamily:'Roboto_400Regular'
    },
    categoryCard:{
        height: 100,
        width: 200,
        marginTop: 10,
        marginLeft: 17,
        borderRadius: 50,
        paddingTop: 10
    },
    categoryName:{
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#000000',
        paddingBottom:10,
        fontSize: 18,
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 10
    },
})
