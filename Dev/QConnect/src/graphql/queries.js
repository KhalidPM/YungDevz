// eslint-disable
// this is an auto generated file. This will be overwritten

export const getTeacher = `query GetTeacher($id: String!) {
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
      }
      class {
        id
        name
        imageId
      }
      currentClass {
        id
        name
        phoneNumber
        emailAddress
        profileImageId
      }
    }
    classes {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const listTeachers = `query ListTeachers(
  $id: String
  $filter: ModelTeacherFilterInput
  $limit: Int
  $nextToken: String
) {
  listTeachers(id: $id, filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      phoneNumber
      emailAddress
      profileImageId
      currentClass {
        id
      }
      classes {
        nextToken
      }
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
      }
      classes {
        nextToken
      }
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
    }
    currentClass {
      id
      name
      phoneNumber
      emailAddress
      profileImageId
      currentClass {
        id
      }
      classes {
        nextToken
      }
    }
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
      }
      class {
        id
        name
        imageId
      }
      currentClass {
        id
        name
        phoneNumber
        emailAddress
        profileImageId
      }
    }
    nextToken
  }
}
`;
export const getClass = `query GetClass($id: String!) {
  getClass(id: $id) {
    id
    name
    imageId
    students {
      items {
        id
        grade
        totalAssignments
      }
      nextToken
    }
    teachers {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const listClasss = `query ListClasss(
  $id: String
  $filter: ModelClassFilterInput
  $limit: Int
  $nextToken: String
) {
  listClasss(id: $id, filter: $filter, limit: $limit, nextToken: $nextToken) {
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
    }
    student {
      id
      name
      imageId
      classes {
        nextToken
      }
    }
    currentAssignments {
      items {
        id
        name
        startDate
        completionDate
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
      }
      student {
        id
        name
        imageId
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
    }
    nextToken
  }
}
`;
export const getStudent = `query GetStudent($id: String!) {
  getStudent(id: $id) {
    id
    name
    imageId
    classes {
      items {
        id
        grade
        totalAssignments
      }
      nextToken
    }
  }
}
`;
export const listStudents = `query ListStudents(
  $id: String
  $filter: ModelStudentFilterInput
  $limit: Int
  $nextToken: String
) {
  listStudents(id: $id, filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      imageId
      classes {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getAttendance = `query GetAttendance($id: String!) {
  getAttendance(id: $id) {
    id
    classStudent {
      id
      class {
        id
        name
        imageId
      }
      student {
        id
        name
        imageId
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
    }
    date
    isPresent
  }
}
`;
export const listAttendances = `query ListAttendances(
  $id: String
  $filter: ModelAttendanceFilterInput
  $limit: Int
  $nextToken: String
) {
  listAttendances(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      classStudent {
        id
        grade
        totalAssignments
      }
      date
      isPresent
    }
    nextToken
  }
}
`;
export const getAssignment = `query GetAssignment($id: String!) {
  getAssignment(id: $id) {
    id
    name
    startDate
    classStudent {
      id
      class {
        id
        name
        imageId
      }
      student {
        id
        name
        imageId
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
export const listAssignments = `query ListAssignments(
  $id: String
  $filter: ModelAssignmentFilterInput
  $limit: Int
  $nextToken: String
) {
  listAssignments(
    id: $id
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
