import React, { Component } from 'react';
import { View, ImageBackground, Dimensions, StyleSheet, Modal, Text } from 'react-native';
import Form from './Form';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import QcAppBanner from 'components/QcAppBanner';
import { authenticate, confirmUserLogin, confirmUserSignUp, logOut } from 'model/actions/authActions'
import { addTeacher} from 'model/actions/addTeacher'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import strings from "config/strings";
import colors from "config/colors";
import { Input } from 'react-native-elements'
import QcActionButton from "components/QcActionButton";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const BG_IMAGE = require("assets/images/read_child_bg.jpg");


class LoginScreen extends Component {
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillMount() {
    //clear up old auth state, since the user is logging in again.
    this.props.logOut();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  state = {
    username: "",
    password: "",
    email: "",
    phone_number: "",
    authCode: "",
    confirmationModalCanceled: false,
  };

  onUserNameChange = (_username) => {
    this.setState({ username: _username });
  }

  onPwChange = (_pwd) => {
    this.setState({ password: _pwd });
  }

  onAuthCodeChanged = value => {
    this.setState({ authCode: value })
  }

  onCreateAccount = () => {
    this.props.navigation.navigate('TeacherWelcomeScreen');
  }

  signIn() {
    //Reset the confirmation dialog state cancelation state
    //In case user canceled the confirmation code dialog before, we reset that state so we can show the dialog again upon new submission
    this.setState({ confirmationModalCanceled: false });

    const { username, password } = this.state
    this.props.authenticate(username, password, this.props.navigation, "App")
  }

  confirm() {
    const { authCode, username, password } = this.state;

    //todo: confirm that the emailAddress that was saved to db earlier is the same as service, 
    // if not, check if teacher is created already on service, and pull data from service then.
    // for now, I'll just use whatever was saved locally as a stop gap
    const { profileImageId, name, phoneNumber} = this.props;

    this.props.confirmUserSignUp(
      name,
      username, 
      password, 
      authCode, 
      this.props.navigation, 
      'AddClass', 
      this.props.addTeacher,
      phoneNumber, 
      profileImageId)
  }

  onForgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword');
  }

  render() {
    const { auth: {
      showSignUpConfirmationModal,
      isAuthenticating,
    } } = this.props

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
        {
          showSignUpConfirmationModal &&
          !this.state.confirmationModalCanceled && (
            <Modal
              transparent={true}
              onRequestClode={() => { }}>

              <View style={styles.modal}>
                <Text style={styles.confirmationMessage}>Please enter the validation code sent to your email</Text>
                <Input
                  placeholder={strings.AuthorizatonConde}
                  type='authCode'
                  keyboardType='numeric'
                  onChangeText={this.onAuthCodeChanged}
                  value={this.state.authCode}
                  keyboardType='numeric'
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                  <QcActionButton
                    text={strings.Confirm}
                    onPress={this.confirm.bind(this)}
                    isLoading={isAuthenticating}
                  />
                  <QcActionButton
                    text={strings.Cancel}
                    onPress={() => { this.setState({ confirmationModalCanceled: true }) }}
                  />
                </View>
              </View>
            </Modal>
          )
        }
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      authenticate,
      confirmUserLogin,
      confirmUserSignUp,
      logOut,
      addTeacher,
    },
    dispatch
  );

const mapStateToProps = state => {
  
  //todo: do not hardcode the default image id. Have it defined as a constant somewhere.
  //if a teacher object exists in the local database, let's pick profile image from there
  // this is to cover the case where the user tried to create a teacher, then closed the app before confirming their email.
  // next time they launch the app and login, we need to re-send their profile info to the service 
  // to create the teacher object (we can only create a teacher after they have been successfully confirmed their email)
  imgId = state.data.teacher? state.data.teacher.profileImageId : 1;
  name = state.data.teacher? state.data.teacher.name : "";
  phoneNumber = state.data.teacher? state.data.teacher.phoneNumber : "";

  return {
    auth: state.auth,
    profileImageId: imgId,
    phoneNumber: phoneNumber,
    name: name
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

