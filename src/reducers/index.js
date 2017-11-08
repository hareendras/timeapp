
import { combineReducers } from 'redux';
import movies from './movie_reducer';

export default combineReducers({
  // this implies results: movies
  // ie. results piece of state ie: state.results is set by movies reducer 
  // the state can be acceesd in mapStateToProps like state.results.<whtv set by movies reducer>

  results: movies  
});
