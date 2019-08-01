import actionTypes from './actionTypes';
// imports from Amplify library
import config from '../../../aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
// import the gql mutation
import { createTeacher } from 'graphql/mutations'
import {logActionError} from './logUtils'

export function addTeacher(teacherInfo) {
  return async (dispatch) => {
    //save to the local database
    dispatch(saveTeacherInfoToDb(teacherInfo))
    try {
        newTeacher = await API.graphql(graphqlOperation(createTeacher, {
          input: {...teacherInfo}
      }))
    } catch (err) {
      logActionError(err, "addTeacher") 
    }
  }
}

export const saveTeacherInfoToDb = (teacherInfo) => (
    {
      type: actionTypes.SAVE_TEACHER_INFO,
      teacherInfo
    }
);