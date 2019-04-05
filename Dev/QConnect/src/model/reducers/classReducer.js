import { combineReducers } from 'redux';
import update from 'immutability-helper';
import actionTypes from '../actions/actionTypes';

export const INITIAL_STATE = {
  teachers: [
    {
      name: "Eslam Abdo",
      phoneNumber: "425-246-5971",
      emailAddress: "eslam_w@hotmail.com",
      currentClassIndex: 0,
      profileImageId: 1,
      classes: [
        {
          name: "Monday Class ICOE",
          imageId: 1,
          students: [
            {
              name: "Ahmed Reducer",
              imageId: 5,
              totalAssignments: 1,
              totalGrade: 2,
              currentAssignment: {
                name: "Al-Nahl page 5",
                startDate: "03-24-2019"
              },
              assignmentHistory: [
                {
                  name: "Al-Baqara 5-9",
                  startDate: "03-17-2019",
                  completionDate: "03-20-2019",
                  evaluation: {
                    overallGrade: 2,
                    notes: ""
                  }
                }
              ],
              attendanceHistory: [
                {
                  date: "02-23-2019",
                  isHere: true
                }, {
                  date: '03-25-2019',
                  isHere: false
                }
              ]
            },
            {
              name: "Amina Khan",
              imageId: 25,
              totalAssignments: 1,
              totalGrade: 4,
              currentAssignment: {
                name: "An-Naze'aat",
                startDate: "03-24-2019"
              },
              assignmentHistory: [
                {
                  name: "Al-Baqara 5-9",
                  startDate: "03-17-2019",
                  completionDate: "03-20-2019",
                  evaluation: {
                    overallGrade: 4,
                    notes: ""
                  }
                }
              ],
              attendanceHistory: [
                {
                  date: "02-23-2019",
                  isHere: true
                }
              ]
            },
            {
              name: "Ayoub Barrak",

              imageId: 19,
              totalAssignments: 1,
              totalGrade: 1,
              currentAssignment: {
                name: "Aal-Imran",
                startDate: "03-24-2019"
              },
              assignmentHistory: [
                {
                  name: "Al-Baqara 5-9",
                  startDate: "03-17-2019",
                  completionDate: "03-20-2019",
                  evaluation: {
                    overallGrade: 1,
                    notes: ""
                  }
                }
              ],
              attendanceHistory: [
                {
                  date: "02-23-2019",
                  isHere: true
                }
              ]
            },
            {
              name: "Nouha Yacoubi",
              imageId: 21,
              totalAssignments: 1,
              totalGrade: 5,
              currentAssignment: {
                name: "Al-Toor pages 5, 6, 8",
                startDate: "03-24-2019"
              },
              assignmentHistory: [
                {
                  name: "Al-Baqara 5-9",
                  startDate: "03-17-2019",
                  completionDate: "03-20-2019",
                  evaluation: {
                    overallGrade: 5,
                    notes: ""
                  }
                }
              ],
              attendanceHistory: [
                {
                  date: "02-23-2019",
                  isHere: true
                }
              ]
            },
            {
              name: "Yassine Lightening",
              imageId: 15,
              totalAssignments: 1,
              totalGrade: 2,
              currentAssignment: {
                name: "Al-Baqara pages 5-8",
                startDate: "03-24-2019"
              },
              assignmentHistory: [
                {
                  name: "Al-Baqara 5-9",
                  startDate: "03-17-2019",
                  completionDate: "03-20-2019",
                  evaluation: {
                    overallGrade: 2,
                    notes: ""
                  }
                }
              ],
              attendanceHistory: [
                {
                  date: "02-23-2019",
                  isHere: true
                }
              ]
            },
            {
              name: "Ayah Sulaiman",
              imageId: 27,
              totalAssignments: 2,
              totalGrade: 8,
              currentAssignment: {
                name: "None",
                startDate: ""
              },
              assignmentHistory: [
                {
                  name: "Al-Baqara 5-9",
                  startDate: "03-17-2019",
                  completionDate: "03-22-2019",
                  evaluation: {
                    overallGrade: 3,
                    notes: ""
                  }
                },
                {
                  name: "Al-Baqara 9-15",
                  startDate: "03-17-2019",
                  completionDate: "03-20-2019",
                  evaluation: {
                    overallGrade: 5,
                    notes: ""
                  }
                }
              ],
              attendanceHistory: [
                {
                  date: "02-23-2019",
                  isHere: true
                }
              ]
            }
          ],
        }

      ]
    }
  ]

};

export const classReducer = (state = INITIAL_STATE, action) => {
  // pulls list of current student in current state
  const {
    name, phoneNumber, emailAddress, classes
  } = state.teachers[0];

  const baseState = { ...state };

  switch (action.type) {
    case actionTypes.ADD_STUDENT:
      {
        let classIndex = action.studentInfo.classIndex
        newState = update(baseState, { teachers: { [0]: { classes: { [classIndex]: { students: { $push: [action.studentInfo.studentInfo] } } } } } });
        return newState;
      }
    case actionTypes.DELETE_STUDENT:
      {
        newState = update(baseState, { teachers: { [0]: { classes: { [action.classIndex]: { students: { $splice: [[action.studentIndex, 1]] } } } } } });
        return newState;
      }
    case actionTypes.ADD_CLASS:
      {
        newState = update(baseState, { teachers: { [0]: { classes: { $push: [action.classInfo] } } } });
        return newState
      }
    case actionTypes.ADD_ATTENDANCE:
      {
        //Fetches the current list of students
        studentslist = state.teachers[0].classes[action.classIndex].students;

        //First checks if the student already has a recorded date with an attendance saved.
        //If he does, it will overwrite the old information with the new information. If he doesn't,
        //it will write the new information 
        for (i = 0; i < studentslist.length; i++) {
          let attHistory = studentslist[i].attendanceHistory;
          let addingDate = action.attendanceInfo[i].date;
          let isDatePreviouslySaved = false;
          let counter = 0;
          for (counter = 0; counter < attHistory.length; counter++) {
            if (attHistory[counter].date === addingDate) {
              isDatePreviouslySaved = true;
              break;
            }
          }
          if (isDatePreviouslySaved) {
            studentslist[i].attendanceHistory.splice(counter, 1, action.attendanceInfo[i])
          } else {
            studentslist[i].attendanceHistory.push(action.attendanceInfo[i]);
          }

        }

        newState = update(baseState, { teachers: { [0]: { classes: { [action.classIndex]: { students: { $set: studentslist } } } } } });
        return newState;
      }
    case actionTypes.SAVE_TEACHER_INFO:
      {
        //fetches current teacher info
        newState = update(baseState, { teachers: { [action.teacherIndex]: { name: { $set: action.teacherInfo.name } } } });
        newState = update(newState, { teachers: { [action.teacherIndex]: { phoneNumber: { $set: action.teacherInfo.phoneNumber } } } });
        newState = update(newState, { teachers: { [action.teacherIndex]: { emailAddress: { $set: action.teacherInfo.emailAddress } } } });
        newState = update(newState, { teachers: { [action.teacherIndex]: { profileImageId: { $set: action.teacherInfo.profileImageId } } } });
        return newState;
      }
    case actionTypes.EDIT_CURRENT_ASSIGNMENT:
      {
        let { classIndex, studentIndex } = action;
        let updatedAssignment = {
          name: action.newAssignment.name,
          startDate: action.newAssignment.startDate
        }

        let newState = update(baseState, { teachers: { [0]: { classes: { [classIndex]: { students: { [studentIndex]: { currentAssignment: { $set: updatedAssignment } } } } } } } });
        return newState;
      }
      case actionTypes.UPDATE_STUDENT_IMAGE:
      {
        let { classIndex, studentIndex, imageId } = action;
        let newState = update(baseState, { teachers: { [0]: { classes: { [classIndex]: { students: { [studentIndex]: { imageId: {$set: imageId} }  } } } } } });
        return newState;
      }
    case actionTypes.ADD_NEW_ASSIGNMENT:
      {
        let { classIndex, studentIndex, newAssignmentName } = action;
        let newAssignmentDate = new Date().toLocaleDateString("en-US");

        //creates the new assignment before adding it to the persist
        let newCurrentAssignment = {
          name: newAssignmentName,
          startDate: newAssignmentDate
        }

        //updates the current assignment
        let newState = update(baseState, { teachers: { [0]: { classes: { [classIndex]: { students: { [studentIndex]: { currentAssignment: { $set: newCurrentAssignment } } } } } } } });
        return newState;
      }
    case actionTypes.COMPLETE_CURRENT_ASSIGNMENT:
      {
        let { classIndex, studentIndex, evaluation } = action;

        //updates the evaluation of the current assignment
        let assignment = {
          ...baseState.teachers[0].classes[classIndex].students[studentIndex].currentAssignment,
          completionDate: new Date().toLocaleDateString("en-US"),
          evaluation
        }

        //pushes the assignment to the array of assignment history (Remember, this action does not 
        //update the current assignment, this needs to be done using the addNewAssignment action)
        let newState = update(baseState, { teachers: { [0]: { classes: { [classIndex]: { students: { [studentIndex]: { assignmentHistory: { $push: [assignment] } } } } } } } });
        let totalAssignments = baseState.teachers[0].classes[classIndex].students[studentIndex].totalAssignments;
        let totalGrade = baseState.teachers[0].classes[classIndex].students[studentIndex].totalGrade;
        newState =  update(newState, { teachers: { [0]: { classes: { [classIndex]: { students: { [studentIndex]: { totalAssignments: { $set: (totalAssignments + 1) } } } } } } } });
        newState =  update(newState, { teachers: { [0]: { classes: { [classIndex]: { students: { [studentIndex]: { totalGrade: { $set: (totalGrade + assignment.evaluation.overallGrade) } } } } } } } });
        return newState;
      }
    default:
      return state
  }
};

export default combineReducers({
  data: classReducer,
});