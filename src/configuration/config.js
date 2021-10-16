//url for database
export const BASE_URL = 'https://api.themoviedb.org/3'

//url for fetching images from database
export const POSTER_URL = 'https://image.tmdb.org/t/p/w342'

//api key that we need at fetching data
export const API_KEY = '?api_key=7a107d136d3681f2a328d0a76391cb45'

//endpoint for searching movies
export const SEARCH_MOVIE = `${BASE_URL}/search/movie`

//endpoints for getting information's about single movie or Tv shows
export const SINGLE_MOVIE = `${BASE_URL}/movie/`
export const SINGLE_TV_SHOW = `${BASE_URL}/tv/`

//endpoints for getting lists of movies and Tv shows
export const ALL_MOVIES = `${BASE_URL}/movie/popular`
export const ALL_TV_SHOWS = `${BASE_URL}/tv/popular`

//endpoints for getting genre for movies and Tv shows
export const MOVIE_CATEGORIES = `${BASE_URL}/genre/movie/list`
export const TV_SHOWS_CATEGORIES = `${BASE_URL}/genre/tv/list`


