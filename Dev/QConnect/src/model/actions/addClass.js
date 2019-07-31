import actionTypes from './actionTypes';
import { API, graphqlOperation } from 'aws-amplify'
// import the mutation
import { createClass } from 'graphql/mutations'
import { createTeacherClass, updateTeacher } from '../../graphql/mutations';

import {logActionError} from './logUtils.js'

export const addClass = (classInfo, navigation) => {
  return async (dispatch) => {
    const {students, teacherId, ...myInput} = classInfo

    try {
      newClass = await API.graphql(graphqlOperation(createClass, {
        input: {name: classInfo.name, imageId: classInfo.imageId}
      }))
    
      //save offline and go to next screen then continue the rest of async ops
      let classId = newClass.data.createClass.id;
      dispatch(addClassInDb({id: classId, ...classInfo}))
      navigation.push("ClassEdit")

      //create bridge entity to allow M:N relantionships between teachers and classes
      newTeacherClass = await API.graphql(graphqlOperation(createTeacherClass, {
        input: {
          teacherClassTeacherId: classInfo.teacherId, 
          teacherClassClassId: newClass.data.createClass.id}}))
     
      //update current class (the default class that shows up in the app first when teacher launches the app)
      let teacherClassId = newClass.data.createClass.id;
      await API.graphql(graphqlOperation(updateTeacher, {
        input: {
          id: classInfo.teacherId,
          teacherCurrentClassId: teacherClassId }
      }))
            
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