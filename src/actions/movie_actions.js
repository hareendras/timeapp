import qs from "qs";
import { FETCH_MOVIES, FETCH_TV_DETAIL } from "./types";
import { MOVIE_API_KEY } from "../../keys";

//const MOVIE_ROOT_URL = 'http://api.themoviedb.org/3/search/tv?';
const MOVIE_ROOT_URL = "http://api.themoviedb.org/3";
const SEARCH_TV = "/search/tv?";
const TV_DETAIL = "/tv/";
const MOVIE_QUERY_PARAMS = {
  api_key: MOVIE_API_KEY
};

const buildMovieUrl = title => {
  const query = qs.stringify({ ...MOVIE_QUERY_PARAMS, query: title });
  console.log(query);
  return `${MOVIE_ROOT_URL}${SEARCH_TV}${query}`;
};

const buildTVDetailUrl = tvId => {
  let query = tvId;
  query = query + "?" + qs.stringify({ ...MOVIE_QUERY_PARAMS });
  return `${MOVIE_ROOT_URL}${TV_DETAIL}${query}`;
};

export const fetchMovies = title => async dispatch => {
  try {
    const url = buildMovieUrl(title);
    let response = await fetch(url);
    let responseJson = await response.json();
    let result = responseJson.results.reduce((out, item) => {
      out.push({
        id: item.id,
        original_name: item.original_name
      });
      return out;
    }, []);
    console.log(result);
    dispatch({ type: FETCH_MOVIES, payload: result });
  } catch (e) {
    console.error(e);
  }
};

export const fetchTVDetails = tvId => async dispatch => {
  try {
    const url = buildTVDetailUrl(tvId);
    console.log("Hi from fetchTVDetails");
    console.log(url);
    let response = await fetch(url);
    let responseJson = await response.json();
    let obj = {
      number_of_seasons: responseJson.number_of_seasons,
      number_of_episodes: responseJson.number_of_episodes,
      poster_path: responseJson.poster_path,
      episode_runtime: responseJson.episode_run_time
    };
    console.log("RESPPONSE IN fetchTVDetails" + obj.toString());
    dispatch({ type: FETCH_TV_DETAIL, payload: obj });
  } catch (e) {
    console.error(e);
  }
};
