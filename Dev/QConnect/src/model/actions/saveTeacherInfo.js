import actionTypes from './actionTypes';
import {API} from 'aws-amplify'
import awsconfig from '../../../aws-exports'

const name = awsconfig.aws_cloud_logic_custom[0].name;
const endpoint = awsconfig.aws_cloud_logic_custom[0].endpoint;


// export function saveTeacherInfo(teacherInfo) {
//   return async (dispatch, uid) => {
//     API.put("/")

//   }
// }


export const saveTeacherInfo = (teacherInfo) => (
    {
      type: actionTypes.SAVE_TEACHER_INFO,
      teacherInfo
    }
);