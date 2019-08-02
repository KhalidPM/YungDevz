import actionTypes from './actionTypes';
import { API, graphqlOperation } from 'aws-amplify'
import {logActionError} from './logUtils'

export function dispatchStoreAction(storeDispatch, gqlMutation, data, actionType) {
  return async (dispatch) => {
    //save to the local database
    dispatch(storeDispatch(data))
    try {
        results = await API.graphql(graphqlOperation(gqlMutation, {
          input: {...data}
      }))
    } catch (err) {
      logActionError(err, actionType) 
    }
  }
}