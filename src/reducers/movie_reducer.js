import { FETCH_MOVIES, FETCH_TV_DETAIL } from '../actions/types';

const INITIAL_STATE = {
  results: [],
  tvResults: { number_of_seasons: '' }   
};
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return { ...state, results: action.payload };
    case FETCH_TV_DETAIL:
      return { ...state, tvResults: action.payload };
    default:
      return state;
  }
}
