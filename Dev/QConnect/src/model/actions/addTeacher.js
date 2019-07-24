import actionTypes from './actionTypes';
// imports from Amplify library
import config from '../../../aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
// import the gql mutation
import { createTeacher } from 'graphql/mutations'
import Analytics from '@aws-amplify/analytics';
import analyticsEvents from 'config/analyticsEvents'
import {getErrorAttributes} from './logUtils'

API.configure(config)
export function addTeacher(teacherInfo) {
  return async (dispatch) => {
    //save to the local database
    dispatch(saveTeacherInfoToDb(teacherInfo))
    try {
        newTeacher = await API.graphql(graphqlOperation(createTeacher, {
          input: {...teacherInfo}
      }))
      console.log('teacher record created ' + JSON.stringify(newTeacher.data.createTeacher.id))
    } catch (err) {
      console.log('error adding teacher...', err)
      Analytics.record({
        name: analyticsEvents.create_teacher_failed,
        attributes:  {...getErrorAttributes(err)}
      })
    }
  }
}

export const saveTeacherInfoToDb = (teacherInfo) => (
    {
      type: actionTypes.SAVE_TEACHER_INFO,
      teacherInfo
    }
);