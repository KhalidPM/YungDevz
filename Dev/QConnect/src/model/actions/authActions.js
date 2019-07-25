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

export function createUser(name, phoneNumber, emailAddress, password,  provisionUser, profileImageId, userId) {
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
      dispatch(showSignUpConfirmationModal())

      newTeacher = provisionUser({
          id: userId,
          name: name,
          phoneNumber: phoneNumber,
          emailAddress: emailAddress,
          profileImageId: profileImageId
      })

    })
    .catch(err => {
      logActionError(err, actionTypes.SIGN_UP) 

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
        Alert.alert(strings.ErrorSigningIn, "" + (err.message || err))
        dispatch(logInFailure(err))
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

export function confirmUserSignUp(username, password, authCode, navigation, nextScreenName) {
  return (dispatch) => {
    dispatch(confirmSignUp())
    Auth.confirmSignUp(username, authCode)
      .then(data => {
        Analytics.record({
          name: analyticsEvents.confirm_new_user_succeeded
        })

        dispatch(confirmSignUpSuccess())
        dispatch(authenticate(username, password, navigation, nextScreenName))
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
