// eslint-disable
// this is an auto generated file. This will be overwritten

export const createTeacher = `mutation CreateTeacher($input: CreateTeacherInput!) {
  createTeacher(input: $input) {
    id
    name
    phoneNumber
    emailAddress
    profileImageId
    createdAt
  }
}
`;
export const updateTeacher = `mutation UpdateTeacher($input: UpdateTeacherInput!) {
  updateTeacher(input: $input) {
    id
    name
    phoneNumber
    emailAddress
    profileImageId
    createdAt
  }
}
`;
export const deleteTeacher = `mutation DeleteTeacher($input: DeleteTeacherInput!) {
  deleteTeacher(input: $input) {
    id
    name
    phoneNumber
    emailAddress
    profileImageId
    createdAt
  }
}
`;
export const createTeacherClass = `mutation CreateTeacherClass($input: CreateTeacherClassInput!) {
  createTeacherClass(input: $input) {
    id
    createdAt
  }
}
`;
export const updateTeacherClass = `mutation UpdateTeacherClass($input: UpdateTeacherClassInput!) {
  updateTeacherClass(input: $input) {
    id
    teacher {
      id
      name
      phoneNumber
      emailAddress
      profileImageId
      createdAt
    }
    class {
      id
      name
      imageId
      createdAt
    }
    createdAt
  }
}
`;
export const deleteTeacherClass = `mutation DeleteTeacherClass($input: DeleteTeacherClassInput!) {
  deleteTeacherClass(input: $input) {
    id
    teacher {
      id
    }
    createdAt
  }
}
`;
export const createClass = `mutation CreateClass($input: CreateClassInput!) {
  createClass(input: $input) {
    id
    name
    imageId
    students {
      items {
        id
        grade
        totalAssignments
        createdAt
      }
      nextToken
    }
    teachers {
      items {
        id
        createdAt
      }
      nextToken
    }
    createdAt
  }
}
`;
export const updateClass = `mutation UpdateClass($input: UpdateClassInput!) {
  updateClass(input: $input) {
    id
    name
    imageId
    students {
      items {
        id
        grade
        totalAssignments
        createdAt
      }
      nextToken
    }
    teachers {
      items {
        id
        createdAt
      }
      nextToken
    }
    createdAt
  }
}
`;
export const deleteClass = `mutation DeleteClass($input: DeleteClassInput!) {
  deleteClass(input: $input) {
    id
    name
    imageId
    students {
      items {
        id
        grade
        totalAssignments
        createdAt
      }
      nextToken
    }
    teachers {
      items {
        id
        createdAt
      }
      nextToken
    }
    createdAt
  }
}
`;
export const createClassStudent = `mutation CreateClassStudent($input: CreateClassStudentInput!) {
  createClassStudent(input: $input) {
    id
    createdAt
  }
}
`;
export const updateClassStudent = `mutation UpdateClassStudent($input: UpdateClassStudentInput!) {
  updateClassStudent(input: $input) {
    id
    class {
      id
      name
      imageId
      students {
        nextToken
      }
      teachers {
        nextToken
      }
      createdAt
    }
    student {
      id
      name
      imageId
      classes {
        nextToken
      }
      createdAt
    }
    currentAssignments {
      items {
        id
        name
        startDate
      }
      nextToken
    }
    pastAssignments {
      items {
        id
        name
        startDate
        completionDate
      }
      nextToken
    }
    Attendance {
      items {
        id
        date
        isPresent
      }
      nextToken
    }
    grade
    totalAssignments
    createdAt
  }
}
`;
export const deleteClassStudent = `mutation DeleteClassStudent($input: DeleteClassStudentInput!) {
  deleteClassStudent(input: $input) {
    id
  }
}
`;
export const createStudent = `mutation CreateStudent($input: CreateStudentInput!) {
  createStudent(input: $input) {
    id
    name
    imageId
    classes {
      items {
        id
        grade
        totalAssignments
        createdAt
      }
      nextToken
    }
    createdAt
  }
}
`;
export const updateStudent = `mutation UpdateStudent($input: UpdateStudentInput!) {
  updateStudent(input: $input) {
    id
    name
    imageId
    classes {
      items {
        id
        grade
        totalAssignments
        createdAt
      }
      nextToken
    }
    createdAt
  }
}
`;
export const deleteStudent = `mutation DeleteStudent($input: DeleteStudentInput!) {
  deleteStudent(input: $input) {
    id
    name
    imageId
    classes {
      items {
        id
        grade
        totalAssignments
        createdAt
      }
      nextToken
    }
    createdAt
  }
}
`;
export const createAttendance = `mutation CreateAttendance($input: CreateAttendanceInput!) {
  createAttendance(input: $input) {
    id
    date
    isPresent
  }
}
`;
export const updateAttendance = `mutation UpdateAttendance($input: UpdateAttendanceInput!) {
  updateAttendance(input: $input) {
    id
    classStudent {
      id
      class {
        id
        name
        imageId
        createdAt
      }
      student {
        id
        name
        imageId
        createdAt
      }
      currentAssignments {
        nextToken
      }
      pastAssignments {
        nextToken
      }
      Attendance {
        nextToken
      }
      grade
      totalAssignments
      createdAt
    }
    date
    isPresent
  }
}
`;
export const deleteAttendance = `mutation DeleteAttendance($input: DeleteAttendanceInput!) {
  deleteAttendance(input: $input) {
    id
    classStudent {
      id
      class {
        id
        name
        imageId
        createdAt
      }
      student {
        id
        name
        imageId
        createdAt
      }
      currentAssignments {
        nextToken
      }
      pastAssignments {
        nextToken
      }
      Attendance {
        nextToken
      }
      grade
      totalAssignments
      createdAt
    }
    date
    isPresent
  }
}
`;
export const createPastAssignment = `mutation CreatePastAssignment($input: CreatePastAssignmentInput!) {
  createPastAssignment(input: $input) {
    id
    name
    startDate
  }
}
`;
export const updatePastAssignment = `mutation UpdatePastAssignment($input: UpdatePastAssignmentInput!) {
  updatePastAssignment(input: $input) {
    id
    name
    startDate
  }
}
`;
export const deletePastAssignment = `mutation DeletePastAssignment($input: DeletePastAssignmentInput!) {
  deletePastAssignment(input: $input) {
    id
    name
    startDate
  }
}
`;
export const createCurrentAssignment = `mutation CreateCurrentAssignment($input: CreateCurrentAssignmentInput!) {
  createCurrentAssignment(input: $input) {
    id
    name
    startDate
  }
}
`;
export const updateCurrentAssignment = `mutation UpdateCurrentAssignment($input: UpdateCurrentAssignmentInput!) {
  updateCurrentAssignment(input: $input) {
    id
    name
    startDate
  }
}
`;
export const deleteCurrentAssignment = `mutation DeleteCurrentAssignment($input: DeleteCurrentAssignmentInput!) {
  deleteCurrentAssignment(input: $input) {
    id
    name
    startDate
  }
}
`;
export const createEvaluation = `mutation CreateEvaluation($input: CreateEvaluationInput!) {
  createEvaluation(input: $input) {
    grade
    notes
    improvements
  }
}
`;
export const updateEvaluation = `mutation UpdateEvaluation($input: UpdateEvaluationInput!) {
  updateEvaluation(input: $input) {
    grade
    notes
    improvements
  }
}
`;
export const deleteEvaluation = `mutation DeleteEvaluation($input: DeleteEvaluationInput!) {
  deleteEvaluation(input: $input) {
    grade
    notes
    improvements
  }
}
`;
