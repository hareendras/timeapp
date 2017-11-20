import React, { Component } from "react";
import Autocomplete from "react-native-autocomplete-input";
import { Constants, Svg, Path } from "expo";
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
import Button from "react-native-button";
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
          <View style={styles.firstRow}>
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
          <View style={styles.secondRow}>
            <View>
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.textInpSeason}
                placeholder="Seasons #"
                defaultValue={`${this.props.tvResults.number_of_seasons}`}
              />
            </View>
            {/*<TouchableOpacity style={styles.btnStyle}>
          <Text>TEST BTN</Text>
        </TouchableOpacity>
        <ScrollView horizontal>
          {this.state.tvResultsFetched && (
            <Text> {this.props.tvResults.number_of_seasons}</Text>
          )}
          <Text>Item 2</Text>
          <Text>Item 3</Text>
        </ScrollView> */}

            <Svg style={styles.goBtn} height="100" width="100">
              <Svg.Path d="M50,18c-17.6,0-32,14.4-32,32s14.4,32,32,32s32-14.4,32-32S67.6,18,50,18z M50,76c-14.3,0-26-11.7-26-26s11.7-26,26-26   s26,11.7,26,26S64.3,76,50,76z" />
              <Svg.Path d="M46.2,35.4c-1.1-1.2-3-1.2-4.2-0.1c-1.2,1.1-1.2,3-0.1,4.2l10,10.4l-10,10.4c-1.1,1.2-1.1,3.1,0.1,4.2   c0.6,0.6,1.3,0.8,2.1,0.8c0.8,0,1.6-0.3,2.2-0.9l12-12.5c1.1-1.2,1.1-3,0-4.2L46.2,35.4z" />
            </Svg>

            <Button
              containerStyle={{
                marginTop: 200,
                padding: 10,
                height: 70,
                overflow: "hidden",
                borderRadius: 100,
                backgroundColor: "transparent"
              }}
              disabledContainerStyle={{ backgroundColor: "transparent" }}
              style={{ fontSize: 20, color: "transparent" }}
            >
              xxxxx
            </Button>
          </View>
          <View>
            <Text> outer </Text>
          </View>
        </View>
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
  },
  firstRow: {
    // backgroundColor: "red"
  },
  secondRow: {
    flexDirection: "row"
    //  backgroundColor: "green"
  },
  goBtn: {
    marginTop: 185,
    position: "absolute",
    marginLeft: 200
  },
  goBtnContainer: {
    marginTop: 200,
    padding: 10,
    height: 70,
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "grey"
  },
  goBtndisabledContainerStyle: {
    backgroundColor: "transparent"
  },
  goBtnStyle: {}
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
