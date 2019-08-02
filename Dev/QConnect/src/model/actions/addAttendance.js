import actionTypes from './actionTypes';
// imports from Amplify library
import { API, graphqlOperation } from 'aws-amplify'
// import the gql mutation
import {logActionError} from './logUtils'
import { createAttendance } from '../../graphql/mutations';

export function addAttendance (classId, date, attendanceInfo) {
  return async (dispatch) => {
    //save to the local database
    dispatch(addAttendanceToDb(classId, date, attendanceInfo))
    try {

        //todo: implement a batch mutation and gql action
        // to run these all at one push
        const entries = Object.entries(attendanceInfo)
        for (const [studentId, attendance] of entries) {
            record = await API.graphql(graphqlOperation(createAttendance, {
                input: {
                  date: date,
                  isPresent: attendance[date],
                  attendanceClassStudentId: studentId
                }
            }))
        }

    } catch (err) {
      logActionError(err, actionTypes.SAVE_TEACHER_INFO) 
    }
  }
}

export const addAttendanceToDb = (classId, date, attendanceInfo) => (
    {
        type: actionTypes.ADD_ATTENDANCE,
        classId,
        date,
        attendanceInfo,
    }
);