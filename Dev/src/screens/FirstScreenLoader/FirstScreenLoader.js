import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import FirebaseFunctions from 'config/FirebaseFunctions';

class FirstScreenLoader extends Component {

  state = {
    alreadyCalled: false
  }

  //Checks if a user has been logged in. If a user has, it navigates the correct screen depending if they
  //are a student or a teacher
  async componentDidMount() {

    await FirebaseFunctions.auth.onAuthStateChanged(async (user) => {
      if (this.state.alreadyCalled === false) {
        this.setState({ alreadyCalled: true });
        if (!user) {
          this.props.navigation.push("FirstRunScreen");
          return;
        }
        const student = await FirebaseFunctions.getStudentByID(user.uid);
        if (student !== -1) {
          const classes = await FirebaseFunctions.getClassesByIDs(student.classes);
          this.props.navigation.push("StudentScreens", {
            userID: user.uid,
            student,
            classes
          });
          return;
        }
        const teacher = await FirebaseFunctions.getTeacherByID(user.uid);
        const classes = await FirebaseFunctions.getClassesByIDs(teacher.classes);
        this.props.navigation.push("TeacherCurrentClass", {
          userID: user.uid,
          teacher,
          classes
        });
        return;
      }

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