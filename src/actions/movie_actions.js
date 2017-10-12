import qs from 'qs';
import {
  FETCH_MOVIES
} from './types';
import { MOVIE_KEY } from '../../keys';


const MOVIE_ROOT_URL = 'http://api.themoviedb.org/3/search/tv?';
const MOVIE_QUERY_PARAMS = {
  api_key: MOVIE_KEY
};

const buildMovieUrl = (title) => {
  const query = qs.stringify({ ...MOVIE_QUERY_PARAMS, query: title });
  return `${MOVIE_ROOT_URL}${query}`;
};

export const fetchMovies = (title) => async (dispatch) => {
  try {
    const url = buildMovieUrl(title);
    console.log(url);
    //setTimeout(1000);

  //  let { data } = await axios.get(url);
    let response = await fetch(url);
    let responseJson = await response.json();
    console.log(responseJson);
    dispatch({ type: FETCH_MOVIES, payload: responseJson });
  } catch (e) {
    console.error(e);
  }
};
