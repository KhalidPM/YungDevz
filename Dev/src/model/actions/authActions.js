
import * as actionTypes from './authActionTypes'
import { setFirstRunCompleted } from "model/actions/setFirstRunCompleted";

import { Alert } from 'react-native'
import strings from 'config/strings'
import analyticsEvents from 'config/analyticsEvents'

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

export function createUser(username, password, email, phone_number) {
  return (dispatch) => {
    dispatch(signUp())
    let phone = phone_number;
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

export function forgotPassword(username) {
  return (dispatch) => {

  }
}

export function renewPassword(username, code, new_password) {
  return (dispatch) => {

  }
}

export function authenticate(username, password, navigation, nextScreenName) {
  return (dispatch) => {
    dispatch(logIn())
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
