import actionTypes from './actionTypes';
// imports from Amplify library
import config from '../../../aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
// import the query
import { updateTeacher } from 'graphql/mutations'
import {logActionError} from './logUtils.js'


export function saveTeacherInfo(teacherInfo) {
  return async (dispatch) => {
    dispatch(saveTeacherInfoToDb(teacherInfo))
    try {
      await API.graphql(graphqlOperation(updateTeacher, {
        input: {
          id: teacherInfo.id,
          name: teacherInfo.name,
          phoneNumber: teacherInfo.phoneNumber,
          emailAddress: teacherInfo.emailAddress,
          profileImageId: teacherInfo.profileImageId
        }
      }))
      console.log('teacher info saved successfully')
    } catch (err) {
      logActionError(err, actionTypes.SAVE_TEACHER_INFO)
    }
  }
}

export const saveTeacherInfoToDb = (teacherInfo) => (
    {
      type: actionTypes.SAVE_TEACHER_INFO,
      teacherInfo
    }
);