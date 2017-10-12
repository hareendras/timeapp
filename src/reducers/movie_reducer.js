import {
  FETCH_MOVIES
} from '../actions/types';

const INITIAL_STATE = {
  results: []
};
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return action.payload;
    default:
      return state;
  }
}
