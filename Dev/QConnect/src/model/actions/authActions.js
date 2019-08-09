import * as actionTypes from './authActionTypes'
import { setFirstRunCompleted } from "model/actions/setFirstRunCompleted";

import { Alert } from 'react-native'
import { Auth } from 'aws-amplify'
import strings from 'config/strings'
import Analytics from '@aws-amplify/analytics';
import analyticsEvents from 'config/analyticsEvents'
import {logActionError} from './logUtils.js'

function signUp() {
  return {
    type: actionTypes.SIGN_UP
  }
}

function signUpSuccess(user) {
  return {
    type: actionTypes.SIGN_UP_SUCCESS,
    user
  }
}

function signUpFailure(err) {
  return {
    type: actionTypes.SIGN_UP_FAILURE,
    error: err
  }
}

//Creates the user in AWS
//params: name, phoneNumber, emailAddress, password, profileImageId
//        saveUserInfoLocally: the function to call in order to persist locally the user information.
//        We need to save teacher info locally at this stage so that if the user exits the app before confirming the app, 
//        they will still need to login later and confirm their email. 
//        For the app to be able to push the teacher info to AWS AppSync, the user should be created and confirmed.
//        So once the user logs in again and enter the confirmation code, we can then pick up teacher info from 
//        local database and send it up to the service.
export function createUser(name, phoneNumber, emailAddress, password, saveUserInfoLocally, profileImageId) {
  return (dispatch) => {
    dispatch(signUp())
    let phone = phoneNumber
    let username = emailAddress
    let email = emailAddress

    Auth.signUp({
      username,
      password,
      attributes: {
        email,
        phone_number: phone
      }
    })
    .then(data => {
      console.log("user created successfully.")
      Analytics.record({
        name: analyticsEvents.create_user_succeeded,
      })

      dispatch(signUpSuccess(data))
      dispatch(saveUserInfoLocally({
        name: name,
        phoneNumber: phoneNumber,
        emailAddress: emailAddress,
        profileImageId: profileImageId
    }))
      dispatch(showSignUpConfirmationModal())

    })
    .catch(err => {
      logActionError(err, actionTypes.SIGN_UP) 

      let msg = (err.message || err)
      if(err.code === "UsernameExistsException"){
        msg = err.msg + " Please in instead."
      }
      setTimeout(() => {
        Alert.alert(strings.ErrorSigningUp, "" + (err.message || err))
      }, 100);
      dispatch(signUpFailure(err))
    });
  }
}

function logIn() {
  return {
    type: actionTypes.LOG_IN
  }
}

export function logOut() {
  return {
    type: actionTypes.LOG_OUT
  }
}

function logInSuccess(user) {
  return {
    type: actionTypes.LOG_IN_SUCCESS,
    user: user
  }
}

function logInFailure(err) {
  return {
    type: actionTypes.LOG_IN_FAILURE,
    error: err
  }
}

export function forgotPassword(username){
  return (dispatch) => {
  Auth.forgotPassword(username)
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }
}

export function renewPassword(username, code, new_password){
  return(dispatch) => {
  Auth.forgotPasswordSubmit(username, code, new_password)
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }
}

export function authenticate(username, password, navigation, nextScreenName) {
  return (dispatch) => {
    dispatch(logIn())
    Auth.signIn(username, password)
      .then(user => {
        console.log("successful login")
        Analytics.record({
          name: analyticsEvents.login_succeeded,
        })
        
        dispatch(logInSuccess(user))
        dispatch(setFirstRunCompleted(true));
        navigation.navigate(nextScreenName);
      })
      .catch(err => {
        logActionError(err, actionTypes.LOG_IN)
        if(err.code === "UserNotConfirmedException"){
          dispatch(showSignUpConfirmationModal())
        } else {
          Alert.alert(strings.ErrorSigningIn, "" + (err.message || err))
          dispatch(logInFailure(err))
        }
      });
  }
}

export function showSignInConfirmationModal() {
  return {
    type: actionTypes.SHOW_SIGN_IN_CONFIRMATION_MODAL
  }
}

export function showSignUpConfirmationModal() {
  return {
    type: actionTypes.SHOW_SIGN_UP_CONFIRMATION_MODAL
  }
}

export function confirmUserSignUp(name, username, password, authCode, navigation, nextScreenName, provisionUser, phoneNumber, profileImageId) {
  return (dispatch) => {
    dispatch(confirmSignUp())
    Auth.confirmSignUp(username, authCode)
      .then(data => {
        Analytics.record({
          name: analyticsEvents.confirm_new_user_succeeded
        })

        dispatch(confirmSignUpSuccess())
        authenticate(username, password, navigation, nextScreenName)
        newUser = provisionUser({
          name: name,
          phoneNumber: phoneNumber,
          emailAddress: username,
          profileImageId: profileImageId
       })
        navigation.navigate(nextScreenName);
      })
      .catch(err => {
        logActionError(err, actionTypes.CONFIRM_SIGNUP_FAILURE)
  
        setTimeout(() => {
          Alert.alert(strings.ErrorSigningUp, "" + (err.message || err))
        }, 100);
        dispatch(confirmSignUpFailure(err))
      });
  }
}

function confirmSignUp() {
  return {
    type: actionTypes.CONFIRM_SIGNUP
  }
}

function confirmSignUpSuccess() {
  return {
    type: actionTypes.CONFIRM_SIGNUP_SUCCESS
  }
}

function confirmSignUpFailure(error) {
  return {
    type: actionTypes.CONFIRM_SIGNUP_FAILURE,
    error
  }
}
