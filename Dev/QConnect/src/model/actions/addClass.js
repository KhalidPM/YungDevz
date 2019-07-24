import actionTypes from './actionTypes';
// imports from Amplify library
import config from '../../../aws-exports'
import { API, graphqlOperation } from 'aws-amplify'
// import the mutation
import { createClass } from 'graphql/mutations'
import { createTeacherClass, updateTeacher } from '../../graphql/mutations';


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
    
      navigation.push("ClassEdit")
    } catch (err) {
      console.log('error adding class...', err)
    }
  }
};

export const addClassInDb = classInfo => (
  {
    type: actionTypes.ADD_CLASS,
    classInfo,
  }
);