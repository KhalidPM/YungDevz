import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { connect } from "react-redux";
import analyticsEvents from 'config/analyticsEvents'

class FirstScreenLoader extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the firstRunCompleted flag from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const { firstRunCompleted } = this.props;

    // This will switch to the App screen or FirstRun screens and this loading
    // screen will be unmounted and thrown away.
    if (!firstRunCompleted) {
      this.props.navigation.navigate('FirstRun')
    } else {
      this.props.navigation.navigate('App')
    }
  };

  // Placeholder loading in case async fetch takes too long
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
          <StatusBar barStyle="default" />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const firstRunCompleted = state.data.firstRunCompleted;
  return { firstRunCompleted };
};

export default connect(mapStateToProps)(FirstScreenLoader);