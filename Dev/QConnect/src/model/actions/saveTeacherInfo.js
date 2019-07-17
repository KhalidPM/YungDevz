import actionTypes from './actionTypes';
// imports from Amplify library
import config from '../../../aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
// import the query
import { createTeacher } from 'graphql/mutations'

API.configure(config)

export function saveTeacherInfo(teacherInfo) {
  return async (dispatch) => {
    dispatch(saveTeacherInfoToDb(teacherInfo))
    try {
      await API.graphql(graphqlOperation(createTeacher, {
        input: teacherInfo
      }))
      console.log('item created!')
    } catch (err) {
      console.log('error adding teacher...', err)
    }
  }
}


export const saveTeacherInfoToDb = (teacherInfo) => (
    {
      type: actionTypes.SAVE_TEACHER_INFO,
      teacherInfo
    }
);