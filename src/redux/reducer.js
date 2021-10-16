import * as Types from './types';

const initialState = {
    films: []
}

//receives the action and modifies the state to give us a new store
export const reducer = (state = initialState, action) =>{
    switch (action.type){
        case Types.STARTED_LOADING_MOVIES:
            return state;
        case Types.FAILED_AT_LOADING_MOVIES :
            return state;
        case Types.SUCCESSFULLY_LOADED_MOVIES:
            return state;
        case Types.STARTED_LOADING_TV_SHOWS:
            return state;
        case Types.FAILED_AT_LOADING_TV_SHOWS:
            return state;
        case Types.SUCCESSFULLY_LOADED_TV_SHOWS:
            return state;
        case Types.STARTED_LOADING_SINGLE_MOVIE_OR_TV_SHOW:
            return state;
        case Types.FAILED_AT_LOADING_SINGLE_MOVIE_OR_TV_SHOW:
            return state;
        case Types.SUCCESSFULLY_LOADED_SINGLE_MOVIE_OR_TV_SHOW:
            return state;
    }
}
