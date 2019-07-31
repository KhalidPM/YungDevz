import actionTypes from './actionTypes';
// imports from Amplify library
import { API, graphqlOperation } from 'aws-amplify'
// import the gql mutation
import { logActionError } from './logUtils'
import { createCurrentAssignment, updateCurrentAssignment } from '../../graphql/mutations';

export function editCurrentAssignment(classId, studentId, assignmentId, newAssignmentName) {
    return async (dispatch) => {

        try {
            let record = {}
            if (!assignmentId) {
                //save to the local database
                record = await API.graphql(graphqlOperation(createCurrentAssignment, {
                    input: {
                        name: newAssignmentName,
                        startDate: new Date().toLocaleDateString("en-US"),
                        currentAssignmentClassStudentId: studentId
                    }
                }))

                assignmentId = record.data.createCurrentAssignment.id;
                //save to the local database, and include assignment id that was generated on the service
                dispatch(editCurrentAssignmentToDb(classId, studentId, assignmentId, newAssignmentName))
            }
            else {
                //if there is already a current assignment, there is no need to wait for the server response to get the id.
                //let's save the new assignment to local right away
                dispatch(editCurrentAssignmentToDb(classId, studentId, assignmentId, newAssignmentName))

                record = await API.graphql(graphqlOperation(updateCurrentAssignment, {
                    input: {
                        id: assignmentId,
                        name: newAssignmentName,
                        startDate: new Date().toLocaleDateString("en-US"),
                    }
                }))
            }
        } catch (err) {
            logActionError(err, actionTypes.SAVE_TEACHER_INFO)
        }
    }
}

export const editCurrentAssignmentToDb = (classId, studentId, assignmentId, newAssignmentName) => (
    {
        type: actionTypes.EDIT_CURRENT_ASSIGNMENT,
        classId,
        studentId,
        assignmentId,
        newAssignmentName
    }
);