import { FETCH_MOVIES, FETCH_TV_DETAIL } from "../actions/types";

const INITIAL_STATE = {
  tvShowList: [],
  tvShowDetails: { number_of_seasons: "" },
  selectedSeasons: []
};
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return { ...state, tvShowList: action.payload };
    case FETCH_TV_DETAIL:
      return { ...state, tvShowDetails: action.payload };
    default:
      return state;
  }
}
