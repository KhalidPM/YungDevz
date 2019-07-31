// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateTeacher = `subscription OnCreateTeacher {
  onCreateTeacher {
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
export const onUpdateTeacher = `subscription OnUpdateTeacher {
  onUpdateTeacher {
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
export const onDeleteTeacher = `subscription OnDeleteTeacher {
  onDeleteTeacher {
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
export const onCreateTeacherClass = `subscription OnCreateTeacherClass {
  onCreateTeacherClass {
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
export const onUpdateTeacherClass = `subscription OnUpdateTeacherClass {
  onUpdateTeacherClass {
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
export const onDeleteTeacherClass = `subscription OnDeleteTeacherClass {
  onDeleteTeacherClass {
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
export const onCreateClass = `subscription OnCreateClass {
  onCreateClass {
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
export const onUpdateClass = `subscription OnUpdateClass {
  onUpdateClass {
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
export const onDeleteClass = `subscription OnDeleteClass {
  onDeleteClass {
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
export const onCreateClassStudent = `subscription OnCreateClassStudent {
  onCreateClassStudent {
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
export const onUpdateClassStudent = `subscription OnUpdateClassStudent {
  onUpdateClassStudent {
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
export const onDeleteClassStudent = `subscription OnDeleteClassStudent {
  onDeleteClassStudent {
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
export const onCreateStudent = `subscription OnCreateStudent {
  onCreateStudent {
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
export const onUpdateStudent = `subscription OnUpdateStudent {
  onUpdateStudent {
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
export const onDeleteStudent = `subscription OnDeleteStudent {
  onDeleteStudent {
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
export const onCreateAttendance = `subscription OnCreateAttendance {
  onCreateAttendance {
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
export const onUpdateAttendance = `subscription OnUpdateAttendance {
  onUpdateAttendance {
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
export const onDeleteAttendance = `subscription OnDeleteAttendance {
  onDeleteAttendance {
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
export const onCreatePastAssignment = `subscription OnCreatePastAssignment {
  onCreatePastAssignment {
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
export const onUpdatePastAssignment = `subscription OnUpdatePastAssignment {
  onUpdatePastAssignment {
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
export const onDeletePastAssignment = `subscription OnDeletePastAssignment {
  onDeletePastAssignment {
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
export const onCreateCurrentAssignment = `subscription OnCreateCurrentAssignment {
  onCreateCurrentAssignment {
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
export const onUpdateCurrentAssignment = `subscription OnUpdateCurrentAssignment {
  onUpdateCurrentAssignment {
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
export const onDeleteCurrentAssignment = `subscription OnDeleteCurrentAssignment {
  onDeleteCurrentAssignment {
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
export const onCreateEvaluation = `subscription OnCreateEvaluation {
  onCreateEvaluation {
    grade
    notes
    improvements
  }
}
`;
export const onUpdateEvaluation = `subscription OnUpdateEvaluation {
  onUpdateEvaluation {
    grade
    notes
    improvements
  }
}
`;
export const onDeleteEvaluation = `subscription OnDeleteEvaluation {
  onDeleteEvaluation {
    grade
    notes
    improvements
  }
}
`;
