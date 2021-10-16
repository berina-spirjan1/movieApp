import * as actions from  './types'

export default function startedLoadingMovies(){
    return {
        type: actions.STARTED_LOADING_MOVIES
    }
}

export default function failedAtLoadingMovies(){
    return{
        type: actions.FAILED_AT_LOADING_MOVIES
    }
}

export default function successfullyLoadedMovies(){
    return{
        type: actions.SUCCESSFULLY_LOADED_MOVIES
    }
}


export default function startedLoadingTvShows(){
    return {
        type: actions.STARTED_LOADING_TV_SHOWS
    }
}

export default function failedAtLoadingTvShows(){
    return{
        type: actions.FAILED_AT_LOADING_TV_SHOWS
    }
}

export default function successfullyLoadedTvShows(){
    return{
        type: actions.SUCCESSFULLY_LOADED_TV_SHOWS
    }
}

export default function successfullyLoadedTvShows(){
    return{
        type: actions.STARTED_LOADING_SINGLE_MOVIE_OR_TV_SHOW
    }
}

export default function successfullyLoadedTvShows(){
    return{
        type: actions.FAILED_AT_LOADING_SINGLE_MOVIE_OR_TV_SHOW
    }
}
export default function successfullyLoadedTvShows(){
    return{
        type: actions.SUCCESSFULLY_LOADED_SINGLE_MOVIE_OR_TV_SHOW
    }
}


