import actionTypes from './actionTypes';

export const editPreviousAssignment = (evaluationInfo, classId, studentId) => (
    {
        type: actionTypes.EDIT_PREVIOUS_ASSIGNMENT,
        classId,
        evaluationInfo,
        studentId
    }
); 