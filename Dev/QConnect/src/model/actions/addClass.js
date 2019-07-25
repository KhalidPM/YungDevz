import actionTypes from './actionTypes';
import { API, graphqlOperation } from 'aws-amplify'
// import the mutation
import { createClass } from 'graphql/mutations'
import { createTeacherClass, updateTeacher } from '../../graphql/mutations';

import {logActionError} from './logUtils.js'

export const addClass = (classInfo, navigation) => {
  return async (dispatch) => {
    dispatch(addClassInDb(classInfo))
    const {students, teacherId, ...myInput} = classInfo

    try {
      await API.graphql(graphqlOperation(createClass, {
        input: {id: classInfo.id, name: classInfo.name, imageId: classInfo.imageId}
      }))
    
      newTeacherClass = await API.graphql(graphqlOperation(createTeacherClass, {
        input: {
          teacherClassTeacherId: classInfo.teacherId, 
          teacherClassClassId: classInfo.id}}))
     
      await API.graphql(graphqlOperation(updateTeacher, {
        input: {
          id: classInfo.teacherId,
          teacherCurrentClassId: newTeacherClass.data.createTeacherClass.id }
      }))
    
      //todo: this will only happen now if user is created to the server
      //should we either navigate in all cases (since we saved offline
      // or require online for now?
      navigation.push("ClassEdit")
    } catch (err) {
      logActionError(err, actionTypes.ADD_CLASS)      
    }
  }
};

export const addClassInDb = classInfo => (
  {
    type: actionTypes.ADD_CLASS,
    classInfo,
  }
);