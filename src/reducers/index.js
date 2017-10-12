
import { combineReducers } from 'redux';
import movies from './movie_reducer';

export default combineReducers({
  // this implies movies: movies
  // ie. movies piece of state is set by movies reducer
  movies
});
