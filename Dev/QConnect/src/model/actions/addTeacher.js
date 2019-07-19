import actionTypes from './actionTypes';
// imports from Amplify library
import config from '../../../aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
// import the query
import { createTeacher } from 'graphql/mutations'

API.configure(config)

export function addTeacher(teacherInfo) {
  return async (dispatch) => {
    console.log("calling.. " + JSON.stringify(teacherInfo));
    try {
        newTeacher = await API.graphql(graphqlOperation(createTeacher, {
        input: teacherInfo
      }))
      console.log('item created! ' + JSON.stringify(newTeacher.data.createTeacher.id))
      dispatch(saveTeacherInfoToDb({...teacherInfo, id: newTeacher.data.createTeacher.id}))
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