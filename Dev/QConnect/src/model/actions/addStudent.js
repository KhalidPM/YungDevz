import actionTypes from './actionTypes';
import { API, graphqlOperation } from 'aws-amplify'
// import the gql mutation
import { createStudent } from 'graphql/mutations'
import { logActionError } from './logUtils'
import { createClassStudent } from '../../graphql/mutations';

export function addStudent(classId, studentInfo) {
  return async (dispatch) => {
    //save to the local database
    dispatch(addStudentToDb(classId, studentInfo))
    try {
      const { id, name, imageId } = studentInfo.studentInfo;

      newStudent = await API.graphql(graphqlOperation(createStudent, {
        input: {
          id: id,
          name: name,
          imageId: imageId
        }
      }));

      studentClassInfo = await API.graphql(graphqlOperation(createClassStudent, {
        input: {
          grade: 0,
          totalAssignments: 0,
          classStudentClassId: classId,
          classStudentStudentId: id
        }
      }));

    } catch (err) {
      logActionError(err, actionTypes.ADD_STUDENT)
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
