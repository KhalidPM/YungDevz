import actionTypes from './actionTypes';
// imports from Amplify library
import { API, graphqlOperation } from 'aws-amplify'
// import the gql mutation
import {logActionError} from './logUtils'
import { createAttendance, createPastAssignment } from '../../graphql/mutations';

export function completeCurrentAssignment (classId, studentId, assignmentName, startDate, evaluation) {
  return async (dispatch) => {
    //save to the local database
    dispatch(completeCurrentAssignmentInDb(classId, studentId, evaluation))
    try {  
        // record = await API.graphql(graphqlOperation(createAttendance, {
        //     input: {
        //         date: date,
        //         isPresent: attendance[date],
        //         attendanceClassStudentId: studentId
        //     }
        // }))

        record = await API.graphql(graphqlOperation(createPastAssignment, {
                input: {
                    name: assignmentName,
                    startDate: startDate,
                    completionDate: new Date().toLocaleDateString("en-US"),
                    pastAssignmentClassStudentId: studentId
                }
            }))

    } catch (err) {
      logActionError(err, "completeCurrentAssignment") 
    }
  }
}

export const completeCurrentAssignmentInDb = (classId, studentId, evaluation) => (
    {
        type: actionTypes.COMPLETE_CURRENT_ASSIGNMENT,
        classId,
        studentId,
        evaluation
    }
);