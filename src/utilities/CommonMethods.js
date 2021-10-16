import {
    API_KEY,
    SEARCH_MOVIE,
    SINGLE_MOVIE,
    ALL_MOVIES,
    ALL_TV_SHOWS,
    SINGLE_TV_SHOW, MOVIE_CATEGORIES, TV_SHOWS_CATEGORIES
} from "../configuration/config";

export function renderIf(condition, content) {
    if (condition) {
        return content;
    } else {
        return null;
    }
}

//function that we used for filtering movies by search word
export function getFilmsFromApiWithSearchedText(text, page) {
    const url = `${SEARCH_MOVIE}${API_KEY}` +"&query=" + text + "&page=" + page;

    return fetch(url)
        .then((Response) => Response.json())
        .catch((error) => console.error(error));
}

//we are getting all movies from api
export function getAllFilms(page) {
    const url = `${ALL_MOVIES}${API_KEY}` + "&page=" + page;

    return fetch(url)
        .then((Response) => Response.json())
        .catch((error) => console.error(error));
}

//same logic we are using to get all movies, only difference is endpoint
export function getAllTvShows(page) {
    const url = `${ALL_TV_SHOWS}${API_KEY}` + "&page=" + page;

    console.log(url)

    return fetch(url)
        .then((Response) => Response.json())
        .catch((error) => console.error(error));
}


//this function we used to get information's about single movie
export function getFilmDetailFromApi(id) {
    return fetch(
        `${SINGLE_MOVIE}` + id + `${API_KEY}`
    )
        .then((Response) => Response.json())
        .catch((error) =>
            console.error(
                "An error occurred with getting details about single movie",
                error
            )
        );
}

//we are getting all genres for movies
export function getFilmCategories(page) {
    const url = `${MOVIE_CATEGORIES}${API_KEY}` + "&page=" + page;

    console.log(url)

    return fetch(url)
        .then((Response) => Response.json())
        .catch((error) => console.error(error));
}

//all genres for tv shows
export function getTvShowsCategories(page) {
    const url = `${TV_SHOWS_CATEGORIES}${API_KEY}` + "&page=" + page;

    console.log(url)

    return fetch(url)
        .then((Response) => Response.json())
        .catch((error) => console.error(error));
}

//information about single tv show
export function getTvShowDetailFromApi(id) {
    return fetch(
        `${SINGLE_TV_SHOW}` + id + `${API_KEY}`
    )
        .then((Response) => Response.json())
        .catch((error) =>
            console.error(
                "An error occurred with getting details about single Tv show",
                error
            )
        );
}
