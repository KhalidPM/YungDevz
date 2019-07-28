import actionTypes from './actionTypes';
import { API, graphqlOperation } from 'aws-amplify'
// import the gql mutation
import { logActionError } from './logUtils'
import { deleteClassStudent } from '../../graphql/mutations';
import {Alert} from 'react-native';
import strings from 'config/strings';

export function deleteStudent(classId, studentId) {
  return async (dispatch) => {
    try {
      newStudent = await API.graphql(graphqlOperation(deleteClassStudent, {
        input: {
          id: studentId
        }
      }));

      //currently this will only work if the device is online.. 
      //todo: we will add offline support at a later stage
      dispatch(deleteStudentFromDb(classId, studentId))

    } catch (err) {
      logActionError(err, actionTypes.DELETE_STUDENT)
      Alert.alert(strings.Whoops, strings.FailedToDeleteStudent);
    }
  }
}

export const deleteStudentFromDb = (classId, studentId) => (
    {
      type: actionTypes.DELETE_STUDENT,
      classId,
      studentId
    }
);