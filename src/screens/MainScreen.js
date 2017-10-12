import React, { Component } from 'react';
import Autocomplete from 'react-native-autocomplete-input';
import _ from 'lodash';
import {
  StyleSheet,
  View,
  Image, TextInput, Text, TouchableOpacity, Dimensions, Button
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import bgImage from '../../assets/img/126.42.jpg';

class MainScreen extends Component {
  //  state = { email: '', password: '', error: '', loading: false };
  constructor(props) {
    super(props);
    this.onChangeTextDelayed = _.debounce(this.onChangeText, 500);
    this.state = {
      //films: [],
      query: '',
      hideResults: false
    };
  }

  onChangeText(text) {
    // this is possible because we imported action creaters  as=>
    // import * as actions from '../actions'; in above
    //and we have passed 'actions' to connect function below as
    // export default connect(null, actions)(MainScreen);
    if (text !== '') {
      this.props.fetchMovies(text);
      this.setState({ query: text, hideResults: false });
    }
  }

  render() {
    const { query, hideResults } = this.state;
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    return (
      <Image
        source={bgImage}
        style={styles.imgContainer}
      >
        <View>
          <Autocomplete
            style={styles.textInpTitle}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCorrect={false}
            containerStyle={styles.autocompleteContainer}
            listStyle={{ borderWidth: 0 }}
            hideResults={hideResults}
            data={this.props.movies.length > 1 &&
              comp(query, this.props.movies[0].original_name) ? [] : this.props.movies}
            defaultValue={query}
            onChangeText={text => this.onChangeTextDelayed(text)}
            placeholder="Type-in a TV show"

            renderItem={({ original_name }) => (
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    query: original_name, hideResults: true
                  })}
              >
                <Text >
                  {original_name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <TextInput
          underlineColorAndroid='transparent'
          style={styles.textInpSeason} placeholder='Seasons #'
        >
        </TextInput>

        <TouchableOpacity style={styles.btnStyle}>
          <Text>TEST BTN</Text>
        </TouchableOpacity>

      </Image>
    );
  }
}

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  autocompleteContainer: {
    marginTop: 75,
    position: 'absolute',
    borderWidth: 0
  },
  textInpTitle: {
    marginTop: 20,
    alignSelf: 'stretch',
    fontSize: 40,
    borderBottomColor: 'transparent',
    padding: 10,
    width: Dimensions.get('window').width,
    borderWidth: 0
  },
  textInpSeason: {
    marginTop: 200,
    fontSize: 40,
    borderBottomColor: 'transparent',
    padding: 10,
    width: Dimensions.get('window').width * 0.60,
  },
  btnStyle: {
    left: 170
  }

});

//connect functions accepts MapStateToProps function and actions as arguments
// This does the magic of making actions and state available as properties within our component
// In this case MainScreen as follows
// this.props.<someaction>
function mapStateToProps({ movies }) {
  return { movies: movies.results };
}

export default connect(mapStateToProps, actions)(MainScreen);
