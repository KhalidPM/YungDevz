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
      }
      nextToken
    }
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
      }
      nextToken
    }
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
      }
      nextToken
    }
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
export const onUpdateAttendance = `subscription OnUpdateAttendance {
  onUpdateAttendance {
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
export const onDeleteAttendance = `subscription OnDeleteAttendance {
  onDeleteAttendance {
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
export const onCreateAssignment = `subscription OnCreateAssignment {
  onCreateAssignment {
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
export const onUpdateAssignment = `subscription OnUpdateAssignment {
  onUpdateAssignment {
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
export const onDeleteAssignment = `subscription OnDeleteAssignment {
  onDeleteAssignment {
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
