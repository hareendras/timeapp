import {
  FETCH_MOVIES,
  FETCH_TV_DETAIL,
  SET_TOTAL_TIME_SPENT,
  SET_POSTER_PATH
} from "../actions/types";

const INITIAL_STATE = {
  tvShowList: [],
  tvShowDetails: { number_of_seasons: "" },
  totalTimeSpent: 0,
  poster_path: []
};
function setupTotalTime(payload) {
 // console.log("PAYLOAD==.", payload);
  if (!payload.seasons) return 0;
  let season = "";
  season = payload.seasons.filter(
    season => season.season_number === payload.currentSeasonNo
  );
  return !season==="" ? season[0].episode_run_time[0] : 0;
}
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return { ...state, tvShowList: action.payload };
    case FETCH_TV_DETAIL:
      return { ...state, tvShowDetails: action.payload };
    case SET_TOTAL_TIME_SPENT:
      return {
        // need to upadate totalTimeSpent correctly
        ...state,
        totalTimeSpent: state.totalTimeSpent + setupTotalTime(action.payload)
      };
    case SET_POSTER_PATH:
      //need to update poster_path[] correctly
      return {
        ...state,
        totalTimeSpent: state.totalTimeSpent + setupTotalTime(action.payload)
      };
    default:
      return state;
  }
}
