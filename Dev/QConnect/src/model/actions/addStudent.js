import actionTypes from './actionTypes';
import { API, graphqlOperation } from 'aws-amplify'
// import the gql mutation
import { createStudent } from 'graphql/mutations'
import { logActionError } from './logUtils'
import { createClassStudent } from '../../graphql/mutations';
import {Alert} from 'react-native';
import strings from 'config/strings';

export function addStudent(classId, studentInfo) {
  return async (dispatch) => {
    try {
      const { id, name, imageId } = studentInfo.studentInfo;

      //todo: need to put this in a transaction or rollback if createStudent succeeds but createClassStudent fails
      newStudent = await API.graphql(graphqlOperation(createStudent, {
        input: {
          name: name,
          imageId: imageId
        }
      }));

      //create ClassStudent: information of the student that is specific to this class 
      // for example: grade, assignments, etc..
      let studentUniqueId = newStudent.data.createStudent.id;
      studentClassInfo = await API.graphql(graphqlOperation(createClassStudent, {
        input: {
          grade: 0,
          totalAssignments: 0,
          classStudentClassId: classId,
          classStudentStudentId: studentUniqueId
        }
      }));

      //studentId: identifies a student in a particular class (ex: attendance, homework, GPA, etc..)
      //studentUniqueId: identifies student info that applies to all classes (ex: student name or profile image)
      let studentId = studentClassInfo.data.createClassStudent.id;
      studentInfo = {id: studentId, uniqueId: studentUniqueId, ...studentInfo.studentInfo}

      //currently this will only work if the device is online.. 
      //todo: we will add offline support at a later stage
      dispatch(addStudentToDb(classId, studentInfo))

    } catch (err) {
      logActionError(err, actionTypes.ADD_STUDENT)
      Alert.alert(strings.Whoops, strings.FailedToAddStudent);
    }
  }
}

export const addStudentToDb = (classId, studentInfo) => (
  {
    type: actionTypes.ADD_STUDENT,
    classId,
    studentInfo,
  }
);
