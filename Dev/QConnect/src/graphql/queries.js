// eslint-disable
// this is an auto generated file. This will be overwritten

export const getTeacher = `query GetTeacher($id: ID!) {
  getTeacher(id: $id) {
    id
    name
    phoneNumber
    emailAddress
    profileImageId
    currentClass {
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
      currentClass {
        id
        name
        phoneNumber
        emailAddress
        profileImageId
        createdAt
      }
      createdAt
    }
    classes {
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
export const listTeachers = `query ListTeachers(
  $filter: ModelTeacherFilterInput
  $limit: Int
  $nextToken: String
) {
  listTeachers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      phoneNumber
      emailAddress
      profileImageId
      currentClass {
        id
        createdAt
      }
      classes {
        nextToken
      }
      createdAt
    }
    nextToken
  }
}
`;
export const getTeacherClass = `query GetTeacherClass($id: ID!) {
  getTeacherClass(id: $id) {
    id
    teacher {
      id
      name
      phoneNumber
      emailAddress
      profileImageId
      currentClass {
        id
        createdAt
      }
      classes {
        nextToken
      }
      createdAt
    }
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
    currentClass {
      id
      name
      phoneNumber
      emailAddress
      profileImageId
      currentClass {
        id
        createdAt
      }
      classes {
        nextToken
      }
      createdAt
    }
    createdAt
  }
}
`;
export const listTeacherClasss = `query ListTeacherClasss(
  $filter: ModelTeacherClassFilterInput
  $limit: Int
  $nextToken: String
) {
  listTeacherClasss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
      currentClass {
        id
        name
        phoneNumber
        emailAddress
        profileImageId
        createdAt
      }
      createdAt
    }
    nextToken
  }
}
`;
export const getClass = `query GetClass($id: ID!) {
  getClass(id: $id) {
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
export const listClasss = `query ListClasss(
  $filter: ModelClassFilterInput
  $limit: Int
  $nextToken: String
) {
  listClasss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getClassStudent = `query GetClassStudent($id: ID!) {
  getClassStudent(id: $id) {
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
export const listClassStudents = `query ListClassStudents(
  $filter: ModelClassStudentFilterInput
  $limit: Int
  $nextToken: String
) {
  listClassStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getStudent = `query GetStudent($id: ID!) {
  getStudent(id: $id) {
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
export const listStudents = `query ListStudents(
  $filter: ModelStudentFilterInput
  $limit: Int
  $nextToken: String
) {
  listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      imageId
      classes {
        nextToken
      }
      createdAt
    }
    nextToken
  }
}
`;
export const getAttendance = `query GetAttendance($id: ID!) {
  getAttendance(id: $id) {
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
export const listAttendances = `query ListAttendances(
  $filter: ModelAttendanceFilterInput
  $limit: Int
  $nextToken: String
) {
  listAttendances(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      classStudent {
        id
        grade
        totalAssignments
        createdAt
      }
      date
      isPresent
    }
    nextToken
  }
}
`;
export const getPastAssignment = `query GetPastAssignment($id: ID!) {
  getPastAssignment(id: $id) {
    id
    name
    startDate
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
    completionDate
    evaluation {
      grade
      notes
      improvements
    }
  }
}
`;
export const listPastAssignments = `query ListPastAssignments(
  $filter: ModelPastAssignmentFilterInput
  $limit: Int
  $nextToken: String
) {
  listPastAssignments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      startDate
      classStudent {
        id
        grade
        totalAssignments
        createdAt
      }
      completionDate
      evaluation {
        grade
        notes
        improvements
      }
    }
    nextToken
  }
}
`;
export const getCurrentAssignment = `query GetCurrentAssignment($id: ID!) {
  getCurrentAssignment(id: $id) {
    id
    name
    startDate
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
  }
}
`;
export const listCurrentAssignments = `query ListCurrentAssignments(
  $filter: ModelCurrentAssignmentFilterInput
  $limit: Int
  $nextToken: String
) {
  listCurrentAssignments(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      startDate
      classStudent {
        id
        grade
        totalAssignments
        createdAt
      }
    }
    nextToken
  }
}
`;
export const getEvaluation = `query GetEvaluation($id: ID!) {
  getEvaluation(id: $id) {
    grade
    notes
    improvements
  }
}
`;
export const listEvaluations = `query ListEvaluations(
  $filter: ModelEvaluationFilterInput
  $limit: Int
  $nextToken: String
) {
  listEvaluations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      grade
      notes
      improvements
    }
    nextToken
  }
}
`;
