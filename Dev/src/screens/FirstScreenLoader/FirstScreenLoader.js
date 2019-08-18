import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import FirebaseFunctions from 'config/FirebaseFunctions';

class FirstScreenLoader extends Component {

  //Checks if a user has been logged in. If a user has, it navigates the correct screen depending if they
  //are a student or a teacher
  async componentDidMount() {

    await FirebaseFunctions.auth.onAuthStateChanged(async (user) => {
      if (!user) {
        this.props.navigation.push("FirstRun");
        return;
      }
      const student = await FirebaseFunctions.getStudentByID(user.uid);
      const classes = await FirebaseFunctions.getClassesByIDs(student.classes);
      if (student !== -1) {
        this.props.navigation.push("StudentScreens", {
          userID: user.uid,
          student,
          classes
        });
        return;
      }
      const teacher = await FirebaseFunctions.getTeacherByID(user.uid);
      const classes = await FirebaseFunctions.getClassesByIDs(teacher.classes);
      this.props.navigation.push("TeacherScreens", {
        userID: user.uid,
        teacher,
        classes
      });
      return;
    });

  }

  // Placeholder loading in case async fetch takes too long
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
          <StatusBar barStyle="default" />
        </View>
      </View>
    );
  }
}

export default FirstScreenLoader;