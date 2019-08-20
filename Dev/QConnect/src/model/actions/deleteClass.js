import actionTypes from './actionTypes';

export const deleteClass = classInfo => (
  {
    type: actionTypes.DELETE_CLASS,
    classInfo,
  }
);