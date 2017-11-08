import React, { Component } from "react";
import Autocomplete from "react-native-autocomplete-input";
import _ from "lodash";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../actions";
import bgImage from "../../assets/img/126.42.jpg";

class MainScreen extends Component {
  //  state = { email: '', password: '', error: '', loading: false };
  constructor(props) {
    super(props);
    this.onChangeTextDelayed = _.debounce(this.onChangeText, 500);
    //this.onChangePressDelayed = _.debounce(this.onPress, 500);
    this.state = {
      //films: [],
      query: "",
      hideResults: false,
      tvResultsFetched: false,
      seasonNo: ""
    };
  }

  onChangeText(text) {
    // this is possible because we imported action creaters  as=>
    // import * as actions from '../actions'; in above
    //and we have passed 'actions' to connect function below as
    // export default connect(null, actions)(MainScreen);
    if (text !== "") {
      //   console.log('PROPZ==>'+JSON.stringify(this.props));
      this.props.fetchMovies(text);
      //   console.log('PROPZ==>'+JSON.stringify(this.props));
      this.setState({ query: text, hideResults: false });
      // debugger;
    }
  }

  onPressResult(id) {
    this.props.fetchTVDetails(id);
    this.setState({ tvResultsFetched: true });
  }

  render() {
    const { query, hideResults } = this.state;
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    //  console.log("PROPZ==>"+JSON.stringify(this.props));
    //debugger;
    return (
      <Image source={bgImage} style={styles.imgContainer}>
        <View>
          <Autocomplete
            style={styles.textInpTitle}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCorrect={false}
            containerStyle={styles.autocompleteContainer}
            listStyle={{ borderWidth: 0 }}
            hideResults={hideResults}
            data={
              this.props.results &&
              this.props.results.length > 1 &&
              this.props.results &&
              comp(query, this.props.results[0].original_name)
                ? []
                : this.props.results
            }
            defaultValue={query}
            onChangeText={text => this.onChangeTextDelayed(text)}
            placeholder="Type-in a TV show"
            renderItem={({ original_name, id }) => (
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    query: original_name,
                    hideResults: true
                  });
                  this.onPressResult(id);
                }}
              >
                <Text>{original_name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <TextInput
          underlineColorAndroid="transparent"
          style={styles.textInpSeason}
          placeholder="Seasons #"
          defaultValue={`${this.props.tvResults.number_of_seasons}`}
        />

        { /*<TouchableOpacity style={styles.btnStyle}>
          <Text>TEST BTN</Text>
        </TouchableOpacity>
        <ScrollView horizontal>
          {this.state.tvResultsFetched && (
            <Text> {this.props.tvResults.number_of_seasons}</Text>
          )}
          <Text>Item 2</Text>
          <Text>Item 3</Text>
        </ScrollView> */}
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  autocompleteContainer: {
    marginTop: 75,
    position: "absolute",
    borderWidth: 0
  },
  textInpTitle: {
    marginTop: 20,
    alignSelf: "stretch",
    fontSize: 40,
    borderBottomColor: "transparent",
    padding: 10,
    width: Dimensions.get("window").width,
    borderWidth: 0
  },
  textInpSeason: {
    marginTop: 200,
    fontSize: 40,
    borderBottomColor: "transparent",
    padding: 10,
    width: Dimensions.get("window").width * 0.6
  },
  btnStyle: {
    left: 170
  }
});

//mapping of component properties to state ====>>>>>>
//      results: state.results.results
// results in left => the property we are goin to set
//      state.result => result piece of state
// In out comineReducer call we have defined that this pice of state, ie state.resluts is
//set by movie_reducer
//      results: movies
// In movie_reducer we have
//const INITIAL_STATE = {
//  results: [],
//  tvResults: []
//};
//This implies that state.results will have two arrays namely results and tvResults
//and those two are handled by movie_reducer
//So when we access state.results.results in mapStateToProps below,
// we are refering to results piece of state,
//and under results piece of state we have results array and tvResults
//array which are handled by movie_reducer

const mapStateToProps = state => {  
  return {
    results: state.results.results,
    tvResults: state.results.tvResults
  };
};

//connect functions accepts MapStateToProps function and actions as arguments
// This does the magic of making actions and state available as properties within our component
// In this case MainScreen as follows
// this.props.<someaction>
export default connect(mapStateToProps, actions)(MainScreen);
