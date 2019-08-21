import React, { Component } from 'react';
import { View, ImageBackground, Dimensions, StyleSheet, Alert } from 'react-native';
import Form from './Form';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import QcAppBanner from 'components/QcAppBanner';
import FirebaseFunctions from 'config/FirebaseFunctions';
import strings from "config/strings";
import colors from "config/colors";
import LoadingSpinner from 'components/LoadingSpinner';

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const BG_IMAGE = require("assets/images/read_child_bg.jpg");


class LoginScreen extends Component {

  _isMounted = false;
  //Sets the screen for firebase analytics
  componentDidMount() {

    this._isMounted = true;
    FirebaseFunctions.setCurrentScreen("Log In Screen", "LogInScreen");

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  //Fetches the passed in params that decide whether this is a teacher or a student
  state = {
    username: "",
    password: "",
    email: "",
    phone_number: "",
    isTeacher: this.props.navigation.state.params.isTeacher,
    isLoading: false
  };

  onUserNameChange = (_username) => {
    this.setState({ username: _username });
  }

  onPwChange = (_pwd) => {
    this.setState({ password: _pwd });
  }

  onCreateAccount = () => {

    if (this.state.isTeacher === true) {
      this.props.navigation.navigate('TeacherWelcomeScreen');
    } else {
      this.props.navigation.navigate('StudentWelcomeScreen');
    }
  }

  //Logs the user in, fetches their ID, and then navigates to the correct screen according to whether they
  //are a student or a teacher
  async signIn() {
    this.setState({ isLoading: true });
    const { username, password } = this.state;

    const account = await FirebaseFunctions.logIn(username, password);
    if (account === -1) {
      this.setState({ isLoading: false });
      Alert.alert(strings.Whoops, strings.IncorrectInfo);
    } else {
      const userID = account.uid;
      if (this.state.isTeacher === true) {
        FirebaseFunctions.logEvent("TEACHER_LOG_IN");
        this.props.navigation.push("TeacherCurrentClass", {
          userID,
        })
      } else {
        FirebaseFunctions.logEvent("STUDENT_LOG_IN");
        this.props.navigation.push("StudentCurrentClass", {
          userID,
        });
      }
    }
  }

  onForgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword');
  }

  render() {

    if (this.state.isLoading === true) {
      return (
        <View style={{ flex: 1 }}>
          <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <LoadingSpinner isVisible={true} />
            </View>
          </ImageBackground>
        </View>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <View style={{ flex: 3 }} />

          <QcAppBanner />
          <View style={{ flex: 1 }} />
          <Form
            onUserNameChange={this.onUserNameChange.bind(this)}
            onPwChange={this.onPwChange.bind(this)}
          />
          <ButtonSubmit
            text={strings.Login}
            onSubmit={this.signIn.bind(this)}
            navigation={this.props.navigation}
            screen="LoginScreen" />
          <SignupSection
            onCreateAccount={this.onCreateAccount.bind(this)}
            onForgotPassword={this.onForgotPassword.bind(this)}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  spacer: {
    flex: 3
  },
  bgImage: {
    flex: 5,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 230,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: colors.grey,
    borderBottomWidth: 1,
    shadowColor: colors.darkGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
    marginLeft: 45,
    marginRight: 45,
    paddingRight: 5,
    paddingLeft: 5
  }
});



export default LoginScreen;

