import axios from 'axios';
import {API_KEY} from '../constants/index';

const apiBaseUrl = "https://api.themoviedb.org/3";

const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${API_KEY}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${API_KEY}`;
const popularMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${API_KEY}`;

export const image500 = path=>path?`https://image.tmdb.org/t/p/w500${path}`:"https://www.movienewz.com/img/films/poster-holder.jpg";
export const image342 = path=>path?`https://image.tmdb.org/t/p/w342${path}`:"https://www.movienewz.com/img/films/poster-holder.jpg";
export const image185 = path=>path?`https://image.tmdb.org/t/p/w185${path}`:"https://www.movienewz.com/img/films/poster-holder.jpg";

export const fallbackPersonimage = "https://raw.githubusercontent.com/koehlersimon/fallback/master/Resources/Public/Images/placeholder.jpg";

const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${API_KEY}`;

const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${API_KEY}`;

const similiarMoviesEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${API_KEY}`;

const personDetailsEndpoint = id => `${apiBaseUrl}/person/${id}?api_key=${API_KEY}`;

const searchMoviesEndpoint =`${apiBaseUrl}/search/movie?api_key=${API_KEY}`;

const apiCall = async (endpoint,params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params?params:{},
    }
    try{
        const response = await axios.request(options);
        return response.data;
    }
    catch(error){
        console.log("The Error is from api: ",error);
    }
}

export const getTrendingMovies = async () => {
    return apiCall(trendingMoviesEndpoint);
}

export const getUpcomingMovies = async () => {
    return apiCall(upcomingMoviesEndpoint);
}

export const getPopularMovies = async () => {
    return apiCall(popularMoviesEndpoint);
}

export const getMovieDetails = async (id) => {
    return apiCall(movieDetailsEndpoint(id));
}

export const getMovieCredits = async (id) => {
    return apiCall(movieCreditsEndpoint(id));
}

export const getSimilarMovies = async (id) => {
    return apiCall(similiarMoviesEndpoint(id));
}

export const getPersonDetails = async (id) => {
    return apiCall(personDetailsEndpoint(id));
}

export const searchMovies =(params) => {
    return apiCall(searchMoviesEndpoint,params);
}